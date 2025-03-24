import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart as ChartBar, Upload } from 'lucide-react';

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
      >
        Financial Analytics Dashboard
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        Transform your financial data into actionable insights with beautiful visualizations and powerful analytics.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
      >
        <Link
          to="/csv-guide"
          className="group flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-xl shadow-lg hover:shadow-xl border border-blue-200 transition duration-300"
        >
          <ChartBar className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
          CSV Guide
        </Link>
        <Link
          to="/upload"
          className="group flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition duration-300"
        >
          <Upload className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
          Upload CSV Data
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
