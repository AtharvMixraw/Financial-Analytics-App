import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';

const UploadForm = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setSelectedFile(file);
      setMessage("");
    } else {
      setSelectedFile(null);
      setMessage("Please select a valid CSV file. Check the CSV guide for more information.");   
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        setSelectedFile(file);
        setMessage("");
      } else {
        setMessage("Please select a valid CSV file.");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 150);
    return interval;
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    const progressInterval = simulateProgress();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("File uploaded successfully!");
        setSelectedFile(null);
        setTimeout(() => {
          onUploadSuccess();
        }, 1000);
      } else {
        setMessage(data.error || "Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error connecting to the server. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm backdrop-filter">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upload CSV File</h2>
          {selectedFile && !isUploading && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFile(null)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>
        
        <motion.div 
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
            dragActive 
              ? "border-blue-500 bg-blue-50" 
              : selectedFile 
                ? "border-green-500 bg-green-50" 
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
                  <FileSpreadsheet className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-lg font-medium text-gray-800 mb-1">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-lg font-medium text-gray-800 mb-1">
                  Drag & drop your CSV file here
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse your files
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {isUploading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
              Uploading... {uploadProgress}%
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className={`w-full mt-6 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
            !selectedFile || isUploading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg"
          }`}
          whileHover={selectedFile && !isUploading ? { scale: 1.02 } : {}}
          whileTap={selectedFile && !isUploading ? { scale: 0.98 } : {}}
        >
          {isUploading ? "Uploading..." : "Upload File"}
        </motion.button>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-xl flex items-center ${
                message.includes("success")
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.includes("success") ? (
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              )}
              <p className="text-sm">{message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UploadForm;