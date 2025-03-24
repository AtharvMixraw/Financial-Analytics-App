import { useState, useEffect } from "react";
import { AnimatePresence } from 'framer-motion';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import LoadingSpinner from "../components/LoadingSpinner";
import HeroSection from "../components/HomeSection";
import VisualizationSection from "../components/VisualizationSection";
// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingSpinner key="loader" />
      ) : (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <HeroSection />
          <VisualizationSection />
        </main>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;