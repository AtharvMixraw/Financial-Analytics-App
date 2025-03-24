import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="text-center flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative h-16 w-16 flex items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-300 border-t-blue-600 rounded-full"></div>
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl font-semibold text-gray-700"
        >
          Loading Financial Analytics...
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;