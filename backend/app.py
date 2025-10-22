from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io, json

app = Flask(__name__)
CORS(app)  # allow requests from React

# Load label mapping
with open("class_indices.json") as f:
    class_map = json.load(f)
idx_to_class = {v: k for k, v in class_map.items()}

# Load model
model = models.resnet18(pretrained=False)
model.fc = nn.Linear(model.fc.in_features, len(class_map))
model.load_state_dict(torch.load("bloodcell_resnet18_best.pth", map_location="cpu"))
model.eval()

# Transformations
tfms = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['file']
    img = Image.open(io.BytesIO(file.read())).convert('RGB')
    x = tfms(img).unsqueeze(0)
    
    with torch.no_grad():
        preds = model(x)
        probs = torch.nn.functional.softmax(preds, dim=1)[0]
    
    top_idx = probs.argmax().item()
    label = idx_to_class[top_idx]
    confidence = float(probs[top_idx])
    return jsonify({'prediction': label, 'confidence': confidence})

if __name__ == "__main__":
    app.run(debug=True)
