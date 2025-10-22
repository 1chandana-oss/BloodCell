# 🩸 Blood Cell Classifier

An intelligent web application that classifies blood cell types from microscope images using a deep learning model built with **PyTorch** and served via a **Flask** backend.  
The frontend, built with **React + Vite + TailwindCSS**, provides an elegant and responsive interface for uploading images and visualizing AI predictions.

---

## 🚀 Tech Stack

### 🧠 Machine Learning
- **PyTorch** – model training and inference  
- **ResNet-18** – CNN architecture for image classification  
- **Grad-CAM** – for explainability (optional)

### ⚙️ Backend
- **Flask** – lightweight Python API for serving predictions  
- **Flask-CORS** – enables frontend-backend communication  
- **Pillow** – image preprocessing

### 💻 Frontend
- **React + Vite** – modern UI framework  
- **Tailwind CSS** – styling and responsive design  
- **Framer Motion** – animations and transitions  
- **React-tsparticles** – dynamic particle background

---

## 🧬 Model Details

The model was trained on a **blood cell dataset** containing five classes:

| Cell Type | Example Count |
|------------|----------------|
| Neutrophil | 172 |
| Eosinophil | 72 |
| Monocyte   | 16 |
| Basophil   | 2 |
| Lymphocyte | 27 |

Model: **ResNet-18** (fine-tuned on ImageNet weights)  
Loss: **Weighted Cross Entropy** (to handle imbalance)  
Optimizer: **Adam**  

---
## 🏗️ Project Structure 

bloodcell/
├── backend/
│ ├── app.py
│ ├── bloodcell_resnet18_best.pth
│ ├── class_indices.json
│ ├── venv/
│ └── requirements.txt
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
└── README.md

### 🧠 1. Clone Repository
```bash
git clone https://github.com/<1chandana-oss>/BloodCell.git
cd BloodCell

### Backend setup
cd backend
python -m venv venv
venv\Scripts\activate  
pip install -r requirements.txt
python app.py

### frontend setup
cd frontend
npm install
npm run dev

### UI Preview
Sleek React UI with animated background and responsive design

