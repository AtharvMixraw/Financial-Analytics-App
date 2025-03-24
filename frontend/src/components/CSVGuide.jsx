import React from "react";
import { Link } from "react-router-dom";

const CSVGuide = () => {
  // Sample CSV data
  const sampleCSV = `Date,Category,Amount
2023-01-15,Food,45.99
2023-01-18,Transport,32.50
2023-01-20,Entertainment,65.75
2023-01-25,Utilities,120.00
2023-01-28,Shopping,89.99`;

  // Function to download sample CSV
  const downloadSampleCSV = () => {
    const element = document.createElement("a");
    const file = new Blob([sampleCSV], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "sample_financial_data.csv";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">CSV Format Guide</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Required CSV Structure</h2>
          <p className="text-gray-600 mb-6">
            To ensure your data is processed correctly, please format your CSV file according to the following structure:
          </p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Column</th>
                  <th className="py-2 px-4 border-b text-left">Description</th>
                  <th className="py-2 px-4 border-b text-left">Format</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b font-medium">Date</td>
                  <td className="py-2 px-4 border-b">The date of the transaction</td>
                  <td className="py-2 px-4 border-b">DD-MM-YYYY</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-medium">Category</td>
                  <td className="py-2 px-4 border-b">Type of expense or income</td>
                  <td className="py-2 px-4 border-b">Text (e.g., Food, Transport)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b font-medium">Amount</td>
                  <td className="py-2 px-4 border-b">Transaction amount</td>
                  <td className="py-2 px-4 border-b">Numeric (e.g., 45.99)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-lg font-medium text-gray-800 mb-2">Sample CSV Data</h3>
          <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
            <pre className="text-sm">{sampleCSV}</pre>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={downloadSampleCSV}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200"
            >
              Download Template
            </button>
            <Link 
              to="/upload"
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-200 text-center"
            >
              Proceed to Upload
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips for Best Results</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Ensure your CSV file has the correct headers: Date, Category, Amount</li>
            <li>Use consistent date format (DD-MM-YYYY) for accurate time-series analysis</li>
            <li>Categories should be consistent to enable meaningful grouping</li>
            <li>Amount should only contain numbers (and decimal points if needed)</li>
            <li>Don't include currency symbols in the Amount column</li>
            <li>Make sure there are no empty rows or cells in your data</li>
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CSVGuide;