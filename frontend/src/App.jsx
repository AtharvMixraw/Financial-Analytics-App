import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSpreadsheet } from "lucide-react";
import LandingPage from "./pages/LandingPage";
import UploadForm from "./components/UploadForm";
import ChartComponent from "./components/ChartComponent";
import CSVGuide from "./components/CsvGuide";

// Upload Page Component
const UploadPage = () => {
  const [updateChart, setUpdateChart] = useState(false);

  const handleUploadSuccess = () => {
    setUpdateChart((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
        >
          Upload Your Financial Data
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <FileSpreadsheet className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Upload Form */}
          <UploadForm onUploadSuccess={handleUploadSuccess} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Chart Component */}
          <ChartComponent key={updateChart} />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/csv-guide" element={<CSVGuide />} />
      </Routes>
    </Router>
  );
};

export default App;
