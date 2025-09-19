import React from 'react';
import { motion } from 'framer-motion';

const NavigationDots = ({ 
  total, 
  current, 
  onChange, 
  className = "",
  dotClassName = "",
  activeDotClassName = "",
  size = "medium" 
}) => {
  const sizes = {
    small: "w-2 h-2",
    medium: "w-3 h-3", 
    large: "w-4 h-4"
  };

  const spacing = {
    small: "space-x-1",
    medium: "space-x-2",
    large: "space-x-3"
  };

  return (
    <div className={`flex items-center justify-center ${spacing[size]} ${className}`}>
      {Array.from({ length: total }, (_, index) => (
        <motion.button
          key={index}
          onClick={() => onChange(index)}
          className={`
            ${sizes[size]} 
            rounded-full 
            transition-all 
            duration-300 
            focus:outline-none 
            focus:ring-2 
            focus:ring-green-400 
            focus:ring-offset-2 
            focus:ring-offset-transparent
            ${
              index === current
                ? `bg-white scale-125 shadow-lg ${activeDotClassName}`
                : `bg-white/30 hover:bg-white/60 ${dotClassName}`
            }
          `}
          whileHover={{ scale: index === current ? 1.25 : 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: index === current ? 1.25 : 1 }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          aria-label={`Go to slide ${index + 1}`}
        >
          {/* Inner dot for active state */}
          {index === current && (
            <motion.div
              className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default NavigationDots;
