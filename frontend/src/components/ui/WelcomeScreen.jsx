import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-amber-900 flex items-center justify-center overflow-hidden px-4">
      {/* Mountain Silhouettes Background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent w-full"></div>
      <svg className="absolute bottom-0 left-0 right-0 h-1/3 w-full text-black/20" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <path d="M0,400 L200,100 L400,200 L600,50 L800,150 L1000,80 L1200,180 L1200,400 Z" fill="currentColor"/>
      </svg>
      <svg className="absolute bottom-0 left-0 right-0 h-1/4 w-full text-black/30" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M0,300 L150,120 L350,180 L550,80 L750,140 L950,60 L1200,160 L1200,300 Z" fill="currentColor"/>
      </svg>

      <motion.div 
        className="text-center text-white relative z-10 mx-auto max-w-md sm:max-w-lg md:max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Adventure Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-400/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-amber-400 text-lg">🏔️</span>
          <span className="text-amber-200 text-sm font-semibold tracking-wider">EST. 2024</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 
          className="text-4xl sm:text-6xl md:text-5xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          ADVENTURE CLUB TRICITY 
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className="text-lg sm:text-xl text-emerald-100/80 mb-12 leading-relaxed px-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Immerse yourself in and discover stories of adventure, 
          courage, and the unbreakable bonds formed in the wild.
        </motion.p>
        
        {/* Start Button */}
        <motion.button
  onClick={onStart}
  className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl transform transition-all duration-300 border border-emerald-400/20 backdrop-blur-sm"
  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, y: 10 }}      // shifted downward on init only 10 px
  animate={{ opacity: 1, y: -10 }}      // animate upward 10 px
  transition={{ duration: 1, delay: 2 }}
>
  <span className="flex items-center gap-2">
    Enter the Adventure
    <span className="text-lg">🚀</span>
  </span>
</motion.button>
        
        {/* Instructions */}
        <motion.div 
          className="mt-8 text-sm text-emerald-200/60 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span className="flex items-center gap-1">
            {/* Place for any instructions or icons */}
          </span>
          <span className="text-emerald-300/40 hidden sm:block">•</span>
          <span className="flex items-center gap-1">
            {/* Place for any instructions or icons */}
          </span>
        </motion.div>
      </motion.div>

      {/* Big Floating Adventure Elements */}
      {['🎒', '⛺', '🚶', '🔥', '🥾'].map((icon, i) => (
        <motion.div
          key={`big-adventure-${i}`}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            fontSize: '3rem',
            zIndex: 5,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Floating Adventure Elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`adventure-${i}`}
          className="absolute text-xl sm:text-2xl select-none pointer-events-none"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {['⛰️', '🏕️', '🌲', '🗻', '🌊', '🦅', '🎒', '🧭'][i]}
        </motion.div>
      ))}

      {/* 3D Style Floating Items */}
      {['🧗‍♂️', '🗺️', '🛶', '🥾', '🌄'].map((icon, i) => (
        <motion.div
          key={`floating-3d-${i}`}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${20 + i * 15}%`,
            top: `${12 + i * 15}%`,
            fontSize: '2.5rem',
            zIndex: 10,
            perspective: '600px',
          }}
          animate={{
            rotateY: [0, 10, -10, 0],
            rotateX: [0, 5, -5, 0],
            scale: [1, 1.1, 1, 1.1],
            opacity: [0.7, 1, 0.7],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Animated Stars/Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-amber-300/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-2 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
          }}
          animate={{
            x: [-100, typeof window !== 'undefined' ? window.innerWidth : 1200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 4 + Math.random() * 3,
            repeatDelay: 8,
          }}
        />
      ))}

      {/* Compass Rose */}
      <motion.div 
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-amber-400">
          <path d="M32 8 L36 28 L32 32 L28 28 Z" fill="currentColor"/>
          <path d="M32 56 L28 36 L32 32 L36 36 Z" fill="currentColor"/>
          <path d="M8 32 L28 28 L32 32 L28 36 Z" fill="currentColor"/>
          <path d="M56 32 L36 36 L32 32 L36 28 Z" fill="currentColor"/>
          <circle cx="32" cy="32" r="3" fill="currentColor"/>
        </svg>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
