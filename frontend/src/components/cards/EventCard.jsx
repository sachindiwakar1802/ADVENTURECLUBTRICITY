import { motion } from 'framer-motion';
import { FaHiking, FaRoad, FaUtensils, FaGlobe, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ 
  title, 
  date, 
  img, 
  activities = [], 
  location = "Tricity Region",
  spots = 20,
  spotsLeft = 8,
  onRegister 
}) => {
  const getActivityIcon = (activity) => {
    switch (activity.toLowerCase()) {
      case "trekking": return FaHiking;
      case "road trip": return FaRoad;
      case "food": return FaUtensils;
      case "explore": return FaGlobe;
      default: return FaGlobe;
    }
  };

  const getActivityColor = (activity) => {
    switch (activity.toLowerCase()) {
      case "trekking": return "text-green-600";
      case "road trip": return "text-blue-600";
      case "food": return "text-orange-600";
      case "explore": return "text-purple-600";
      default: return "text-gray-600";
    }
  };

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group relative"
      whileHover={{ scale: 1.03, rotateY: 3 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, rotateX: 45 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Event Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115" 
        />
        
        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/30 to-green-500/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Spots Left Badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {spotsLeft} spots left
        </motion.div>

        {/* Location Badge */}
        <motion.div 
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaMapMarkerAlt />
          {location}
        </motion.div>
      </div>

      {/* Event Info */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.div 
          className="flex items-center text-gray-600 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaCalendarAlt className="mr-2" />
          <span className="font-medium">{date}</span>
        </motion.div>

        {/* Activity Icons with Animation */}
        <motion.div 
          className="flex gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {activities.map((activity, idx) => {
            const Icon = getActivityIcon(activity);
            const colorClass = getActivityColor(activity);
            
            return (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.2, rotate: 5 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <Icon className={`${colorClass} text-2xl`} />
                <span className="text-xs text-gray-500 mt-1 capitalize">{activity}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress Bar for Spots */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Registration</span>
            <span>{spots - spotsLeft}/{spots} joined</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((spots - spotsLeft) / spots) * 100}%` }}
              transition={{ delay: 0.6, duration: 1 }}
            />
          </div>
        </div>

        {/* Register Button */}
        <motion.button
          onClick={onRegister}
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
          whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Register Now
        </motion.button>
      </div>

      {/* Floating Animation Elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-blue-400/30 rounded-full"
          style={{
            right: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>
  );
};

export default EventCard;
