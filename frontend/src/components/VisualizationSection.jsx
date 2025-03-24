import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { FileSpreadsheet, PieChart, Filter, Download } from 'lucide-react';

const sampleData = {
  labels: ["Food", "Transport", "Entertainment", "Utilities", "Shopping"],
  datasets: [{
    label: "Monthly Expenses",
    data: [450, 300, 200, 350, 500],
    backgroundColor: [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ],
    borderWidth: 2,
  }]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

const steps = [
  { icon: FileSpreadsheet, text: "Upload your CSV financial data" },
  { icon: PieChart, text: "System processes and analyzes the data" },
  { icon: Filter, text: "Filter and explore interactive visualizations" },
  { icon: Download, text: "Export insights and reports" }
];

const VisualizationSection = () => {
  return (
    <div className="container mx-auto px-4 pb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold text-gray-800 mb-12 text-center"
      >
        Sample Visualizations
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold mb-6">Monthly Expenses</h3>
          <Bar data={sampleData} options={chartOptions} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 className="text-xl font-semibold mb-6">How It Works</h3>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="flex items-start group"
              >
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <step.icon className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-gray-700 text-lg pt-1">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisualizationSection;
