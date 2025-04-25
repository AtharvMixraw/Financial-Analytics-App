import React, { useEffect, useState } from "react";
import { 
  Chart, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler,
  BubbleController
} from "chart.js";
import { Bar, Pie, Line, Radar, Bubble } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, PieChart, LineChart, Circle, BarChart as RadarChart, Download, RefreshCw, Filter } from 'lucide-react';

// Register Chart.js components
Chart.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler,
  BubbleController
);

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("bar");
  const [originalData, setOriginalData] = useState(null);
  const [timeRange, setTimeRange] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (originalData) {
      processData(filterData(originalData));
    }
  }, [timeRange, categoryFilter]);

  const filterData = (data) => {
    if (!data) return [];

    let filteredData = [...data];

    // Time range filter
    if (timeRange !== "all") {
      const now = new Date();
      const timeRanges = {
        "week": 7,
        "month": 30,
        "quarter": 90,
        "year": 365
      };
      
      const cutoffDate = new Date(now.setDate(now.getDate() - timeRanges[timeRange]));
      filteredData = filteredData.filter(item => new Date(item.Date) >= cutoffDate);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filteredData = filteredData.filter(item => item.Category === categoryFilter);
    }

    return filteredData;
  };

  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching data:", data.error);
          setLoading(false);
          return;
        }

        setOriginalData(data.data);
        processData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const processData = (data) => {
    if (!data || data.length === 0) return;

    const categories = [...new Set(data.map((item) => item.Category))];
    const amounts = categories.map((category) => {
      return data
        .filter((item) => item.Category === category)
        .reduce((sum, item) => sum + parseFloat(item.Amount), 0);
    });

    const backgroundColors = categories.map(() => 
      `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 0.6)`
    );

    let monthlyData = {};
    if (data.some(item => item.Date)) {
      data.forEach(item => {
        if (!item.Date) return;
        
        const date = new Date(item.Date);
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = 0;
        }
        
        monthlyData[monthYear] += parseFloat(item.Amount);
      });
    }

    const sortedMonths = Object.keys(monthlyData).sort();

    // Calculate average spending per category
    const categoryAverages = categories.map(category => {
      const categoryItems = data.filter(item => item.Category === category);
      return categoryItems.reduce((sum, item) => sum + parseFloat(item.Amount), 0) / categoryItems.length;
    });

    // Process data for bubble chart
    const bubbleData = categories.map((category, index) => {
      const categoryItems = data.filter(item => item.Category === category);
      const totalAmount = amounts[index];
      const count = categoryItems.length;
      
      return {
        x: index,
        y: totalAmount,
        r: Math.max(5, Math.min(20, Math.sqrt(count) * 2))  // Size based on transaction count
      };
    });

    setChartData({
      bar: {
        labels: categories,
        datasets: [
          {
            label: "Total Spending by Category",
            data: amounts,
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      },
      pie: {
        labels: categories,
        datasets: [
          {
            data: amounts,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace("0.6", "1")),
            borderWidth: 1,
          },
        ],
      },
      bubble: {
        labels: categories,
        datasets: [
          {
            label: "Spending Amount vs. Transaction Count",
            data: bubbleData,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors.map(color => color.replace("0.6", "1")),
            borderWidth: 1,
          },
        ],
      },
      line: {
        labels: sortedMonths,
        datasets: [
          {
            label: "Monthly Spending Trend",
            data: sortedMonths.map(month => monthlyData[month]),
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      radar: {
        labels: categories,
        datasets: [
          {
            label: "Total Spending",
            data: amounts,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          },
          {
            label: "Average Spending",
            data: categoryAverages,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      },
    });
  };

  const chartButtons = [
    { type: "bar", label: "Bar", icon: BarChart },
    { type: "line", label: "Line", icon: LineChart },
    { type: "pie", label: "Pie", icon: PieChart },
    { type: "bubble", label: "Bubble", icon: Circle },
    { type: "radar", label: "Radar", icon: RadarChart },
  ];

  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "week", label: "Last Week" },
    { value: "month", label: "Last Month" },
    { value: "quarter", label: "Last Quarter" },
    { value: "year", label: "Last Year" },
  ];

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const exportChart = () => {
    const chartElement = document.querySelector("canvas");
    if (!chartElement) return;
    
    const url = chartElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `financial-chart-${chartType}-${new Date().toISOString().split("T")[0]}.png`;
    link.href = url;
    link.click();
  };

  const renderChart = () => {
    if (!chartData) return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No data available</p>
      </div>
    );

    const options = {
      responsive: true,
      maintainAspectRatio: false, // Change this to false
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        }
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Financial Analysis - ${timeRangeOptions.find(opt => opt.value === timeRange).label}`,
        },
      },
    };

    // Special options for bubble chart
    if (chartType === "bubble") {
      options.scales = {
        x: {
          type: 'linear',
          position: 'bottom',
          ticks: {
            callback: function(value) {
              return chartData.bubble.labels[value] || '';
            }
          },
          title: {
            display: true,
            text: 'Categories'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Total Amount'
          }
        }
      };
    }

    const charts = {
      bar: Bar,
      pie: Pie,
      bubble: Bubble,
      line: Line,
      radar: Radar,
    };

    const ChartComponent = charts[chartType];
    return (
      <div className="w-full h-[400px]"> {/* Add a fixed height container */}
        <ChartComponent data={chartData[chartType]} options={options} />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Financial Analysis</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchData}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Time Range</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category Filter</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {originalData && [...new Set(originalData.map(item => item.Category))].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {chartButtons.map(({ type, label, icon: Icon }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChartTypeChange(type)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              chartType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </motion.button>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-xl min-h-[400px] mb-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-64"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </motion.div>
          ) : (
            <motion.div
              key={chartType}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full" // Ensure full height
            >
              {renderChart()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={exportChart}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Chart
      </motion.button>
    </motion.div>
  );
};

export default ChartComponent;