import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Eye, Heart, Share2, Download } from 'lucide-react';

const GalleryCard = ({ 
  img, 
  title, 
  location, 
  photographer = "Adventure Club", 
  date,
  tags = [],
  onView,
  onLike,
  onShare 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike(!isLiked);
  };

  return (
    <motion.div 
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={onView}
                className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Eye size={20} />
              </motion.button>
              
              <motion.button
                onClick={handleLike}
                className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-colors ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white text-gray-800'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </motion.button>
              
              <motion.button
                onClick={onShare}
                className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Share2 size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tags */}
        <motion.div 
          className="absolute top-4 left-4 flex gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index}
              className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">
          📍 {location}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>by {photographer}</span>
          <span>{date}</span>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            right: `${5 + i * 20}%`,
            bottom: `${10 + (i % 2) * 10}%`,
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 1.5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default GalleryCard;
