import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Star } from 'lucide-react';

const ActivityCard = ({ 
  title, 
  img, 
  description, 
  difficulty = "Medium", 
  duration = "4-6 hours",
  participants = "8-12",
  rating = 4.8
}) => {
  const getDifficultyColor = (level) => {
    switch(level.toLowerCase()) {
      case 'easy': return 'text-green-500 bg-green-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'hard': return 'text-red-500 bg-red-100';
      default: return 'text-blue-500 bg-blue-100';
    }
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group cursor-pointer flex flex-col"
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Difficulty Badge */}
        <motion.div 
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {difficulty}
        </motion.div>

        {/* Animated Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {description}
        </motion.p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{participants}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
