import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const UploadCard = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => setImage(e.target.files[0]);

  const handlePredict = async () => {
    if (!image) return alert("Please upload an image first!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white shadow-2xl rounded-2xl p-8 w-[400px] mx-auto text-center"
    >
      <h2 className="text-8xl md:text-6xl font-semibold text-black-800 mb-3">
        🩸 Blood Cell Classifier
      </h2>
      <p className="text-6xl md:text-6xl text-gray-600 mb-6">
        Upload a microscope image to identify the cell type.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4 block mx-auto text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-red-100 file:text-red-700 hover:file:bg-red-200 cursor-pointer"
      />

      <button
        onClick={handlePredict}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
      >
        {loading ? "Analyzing..." : "Predict"}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-700">
            Prediction:{" "}
            <span className="text-red-600">{result.prediction}</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </p>
          <img
            src={URL.createObjectURL(image)}
            alt="uploaded"
            className="w-40 h-40 object-cover mx-auto mt-3 rounded-lg border"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadCard;
