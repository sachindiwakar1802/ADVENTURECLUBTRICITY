import React from 'react';
import { motion } from 'framer-motion';
import ForestParticles from '../components/shared/ForestParticles';

const About = () => {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Adventure Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      fallbackImage: "https://via.placeholder.com/300x400/4ade80/ffffff?text=Rajesh+Kumar",
      experience: "15+ years",
      speciality: "Himalayan Expeditions",
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Priya Sharma",
      role: "Wildlife Expert",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b742?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      fallbackImage: "https://via.placeholder.com/300x400/059669/ffffff?text=Priya+Sharma",
      experience: "12+ years",
      speciality: "Safari & Wildlife Photography",
      color: "from-purple-400 to-pink-500"
    },
    {
      name: "Arjun Singh",
      role: "Adventure Sports Coordinator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      fallbackImage: "https://via.placeholder.com/300x400/f59e0b/ffffff?text=Arjun+Singh",
      experience: "10+ years",
      speciality: "Water Sports & Rock Climbing",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const achievements = [
    { number: "5000+", label: "Happy Adventurers", color: "text-yellow-400", icon: "😊" },
    { number: "150+", label: "Destinations Covered", color: "text-blue-400", icon: "🏔️" },
    { number: "15+", label: "Years Experience", color: "text-green-400", icon: "⭐" },
    { number: "98%", label: "Customer Satisfaction", color: "text-pink-400", icon: "💖" }
  ];

  // Enhanced image error handler function
  const handleImageError = (e, fallbackSrc) => {
    if (e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  // Letter animation variants
  const letterVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -90 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  };

  // Word animation for colorful title
  const titleWords = "ABOUT ADVENTURE CLUB TRICITY".split(" ");
  const wordColors = [
    "text-yellow-400",
    "text-green-400", 
    "text-blue-400",
    "text-purple-400"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 relative overflow-hidden">
      <ForestParticles />
      
      <div className="relative z-10">
        {/* Enhanced Hero Section with Animated Title */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            {/* Colorful Animated Title */}
            <div className="mb-6 flex flex-wrap justify-center items-center gap-2 md:gap-4">
              {titleWords.map((word, wordIndex) => (
                <motion.h1
                  key={wordIndex}
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold ${wordColors[wordIndex % wordColors.length]} drop-shadow-lg`}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    delay: wordIndex * 0.3,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      custom={letterIndex}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{
                        scale: 1.2,
                        color: "#ff6b6b",
                        textShadow: "0 0 20px rgba(255, 107, 107, 0.8)"
                      }}
                      className="inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.h1>
              ))}
            </div>
            
            <motion.p
              className="text-xl text-green-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              We're passionate explorers dedicated to showcasing India's incredible natural beauty 
              and rich cultural heritage through authentic adventure experiences. Since 2024, we've 
              been crafting unforgettable journeys that connect travelers with nature and local communities.
            </motion.p>

            {/* Floating Action Buttons */}
            <motion.div
              className="flex justify-center space-x-4 mt-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full shadow-lg hover:shadow-2xl"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 25px rgba(255, 193, 7, 0.6)",
                  rotate: [0, -2, 2, 0]
                }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Join Adventure
              </motion.button>
              
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)",
                  rotate: [0, 2, -2, 0]
                }}
                whileTap={{ scale: 0.95 }}
              >
                💬 Contact Us
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Mission & Vision with Floating Cards */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30 relative overflow-hidden"
                initial={{ opacity: 0, x: -100, rotateY: -45 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 50 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)"
                }}
                viewport={{ once: true }}
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                />
                
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2,
                    boxShadow: "0 0 30px rgba(255, 193, 7, 0.6)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </motion.svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                  Our Mission
                </h3>
                <p className="text-green-200 leading-relaxed">
                  To provide safe, sustainable, and transformative adventure experiences that foster 
                  deep connections with nature while supporting local communities and promoting 
                  environmental conservation across India's diverse landscapes.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 relative overflow-hidden"
                initial={{ opacity: 0, x: 100, rotateY: 45 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
                }}
                viewport={{ once: true }}
              >
                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{
                    backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                    backgroundSize: "25px 25px"
                  }}
                />
                
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ 
                    rotate: -360,
                    scale: 1.2,
                    boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </motion.svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  Our Vision
                </h3>
                <p className="text-green-200 leading-relaxed">
                  To become India's leading adventure tourism company, recognized for our commitment 
                  to responsible travel, exceptional customer experiences, and our role in preserving 
                  India's natural and cultural heritage for future generations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Achievements with Animated Counters */}
        <section className="py-20 px-6 bg-black/20 relative overflow-hidden">
          {/* Floating Orbs Background */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 rounded-full opacity-10"
                style={{
                  background: `linear-gradient(45deg, ${['#fbbf24', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i]}, transparent)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 30, -30, 0],
                  y: [0, -30, 30, 0],
                  scale: [1, 1.2, 0.8, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Our Impact
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 50, scale: 0 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -10
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="relative mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`text-4xl md:text-5xl font-bold ${achievement.color} mb-2 relative z-10`}>
                      {achievement.number}
                    </div>
                    <motion.div
                      className="text-3xl absolute top-0 right-0 transform translate-x-2 -translate-y-2"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {achievement.icon}
                    </motion.div>
                    
                    {/* Glowing Effect */}
                    <motion.div
                      className={`absolute inset-0 ${achievement.color} opacity-20 blur-xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>
                  
                  <div className="text-green-200 font-medium group-hover:text-white transition-colors">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Team Section with 3D Cards */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group perspective-1000"
                  initial={{ opacity: 0, y: 100, rotateX: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.3,
                    type: "spring",
                    stiffness: 60
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-green-500/20 relative transform-gpu"
                    whileHover={{ 
                      rotateY: 10,
                      rotateX: 10,
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Animated Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20`}
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 1
                      }}
                    />
                    
                    <div className="h-64 overflow-hidden relative">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                        onError={(e) => handleImageError(e, member.fallbackImage)}
                        onLoad={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                        style={{
                          opacity: '0',
                          transition: 'opacity 0.3s ease-in-out'
                        }}
                        whileHover={{ scale: 1.2, rotate: 2 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Loading placeholder with animation */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg`}
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        {member.name}
                      </motion.div>
                      
                      {/* Floating Particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            top: `${20 + i * 30}%`,
                            left: `${10 + i * 20}%`
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5 + index * 0.2
                          }}
                        />
                      ))}
                    </div>
                    
                    <motion.div 
                      className="p-6 relative z-10"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 
                        className="text-xl font-bold mb-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className={`bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                          {member.name}
                        </span>
                      </motion.h3>
                      
                      <motion.p 
                        className="text-green-300 font-medium mb-2"
                        whileHover={{ x: 5 }}
                      >
                        {member.role}
                      </motion.p>
                      
                      <motion.p 
                        className="text-green-200 text-sm mb-3"
                        whileHover={{ x: 5 }}
                      >
                        {member.experience}
                      </motion.p>
                      
                      <motion.p 
                        className="text-white/80 text-sm"
                        whileHover={{ x: 5 }}
                      >
                        {member.speciality}
                      </motion.p>
                      
                      {/* Hover Effect Indicator */}
                      <motion.div
                        className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-green-400"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="py-20 px-6 bg-black/20 relative overflow-hidden">
          {/* Dynamic Background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundImage: [
                "radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, #10b981 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, #f59e0b 0%, transparent 50%)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.h2
              className="text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </motion.h2>
            
            <div className="space-y-8">
              {[
                {
                  title: "Safety First",
                  description: "Every adventure is planned with meticulous attention to safety protocols and emergency procedures.",
                  color: "from-red-400 to-pink-500",
                  icon: "🛡️"
                },
                {
                  title: "Sustainable Tourism",
                  description: "We promote eco-friendly practices and work with local communities to ensure minimal environmental impact.",
                  color: "from-green-400 to-emerald-500",
                  icon: "🌱"
                },
                {
                  title: "Authentic Experiences",
                  description: "We create genuine connections with local cultures and pristine natural environments.",
                  color: "from-yellow-400 to-orange-500",
                  icon: "✨"
                },
                {
                  title: "Expert Guidance",
                  description: "Our experienced guides ensure you get the most out of every adventure while staying safe.",
                  color: "from-blue-400 to-purple-500",
                  icon: "🧭"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-start space-x-6 group"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 80
                  }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2,
                      boxShadow: "0 0 30px rgba(255, 255, 255, 0.3)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {value.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold mb-2 group-hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span className={`bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                        {value.title}
                      </span>
                    </motion.h3>
                    
                    <motion.p 
                      className="text-green-200 leading-relaxed group-hover:text-gray-100 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {value.description}
                    </motion.p>
                  </div>
                  
                  {/* Animated Indicator */}
                  <motion.div
                    className={`w-1 h-full bg-gradient-to-b ${value.color} rounded-full opacity-0 group-hover:opacity-100`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
