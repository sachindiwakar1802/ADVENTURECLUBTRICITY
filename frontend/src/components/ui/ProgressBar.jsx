import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress = 0, 
  showLabel = true,
  label = "",
  className = "",
  barClassName = "",
  size = "medium",
  color = "green",
  animated = true
}) => {
  const sizes = {
    small: "h-2",
    medium: "h-3",
    large: "h-4"
  };

  const colors = {
    green: "from-green-400 to-emerald-500",
    blue: "from-blue-400 to-blue-600", 
    orange: "from-orange-400 to-red-500",
    purple: "from-purple-400 to-purple-600"
  };

  const textSizes = {
    small: "text-xs",
    medium: "text-sm", 
    large: "text-base"
  };

  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className={`text-white font-medium ${textSizes[size]}`}>
            {label || "Progress"}
          </span>
          <span className={`text-green-300 font-semibold ${textSizes[size]}`}>
            {Math.round(normalizedProgress)}%
          </span>
        </div>
      )}

      {/* Progress Bar Container */}
      <div className={`
        w-full 
        bg-green-800/30 
        rounded-full 
        overflow-hidden
        backdrop-blur-sm
        border 
        border-green-500/20
        ${sizes[size]}
      `}>
        {/* Progress Bar Fill */}
        <motion.div
          className={`
            h-full 
            bg-gradient-to-r 
            ${colors[color]}
            rounded-full 
            relative
            ${barClassName}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${normalizedProgress}%` }}
          transition={{ 
            duration: animated ? 1 : 0,
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
        >
          {/* Animated shimmer effect */}
          {animated && normalizedProgress > 0 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Progress Steps (optional) */}
      {normalizedProgress > 0 && (
        <div className="flex justify-between mt-2 text-xs text-green-300/60">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
