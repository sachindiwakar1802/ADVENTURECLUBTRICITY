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
      speciality: "Himalayan Expeditions"
    },
    {
      name: "Priya Sharma",
      role: "Wildlife Expert",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b742?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      fallbackImage: "https://via.placeholder.com/300x400/059669/ffffff?text=Priya+Sharma",
      experience: "12+ years",
      speciality: "Safari & Wildlife Photography"
    },
    {
      name: "Arjun Singh",
      role: "Adventure Sports Coordinator",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      fallbackImage: "https://via.placeholder.com/300x400/f59e0b/ffffff?text=Arjun+Singh",
      experience: "10+ years",
      speciality: "Water Sports & Rock Climbing"
    }
  ];

  const achievements = [
    { number: "5000+", label: "Happy Adventurers" },
    { number: "150+", label: "Destinations Covered" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  // Image error handler function
  const handleImageError = (e, fallbackSrc) => {
    if (e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 relative">
      <ForestParticles />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Adventure India
            </motion.h1>
            
            <motion.p
              className="text-xl text-green-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're passionate explorers dedicated to showcasing India's incredible natural beauty 
              and rich cultural heritage through authentic adventure experiences. Since 2024, we've 
              been crafting unforgettable journeys that connect travelers with nature and local communities.
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-green-500/20"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-green-200 leading-relaxed">
                  To provide safe, sustainable, and transformative adventure experiences that foster 
                  deep connections with nature while supporting local communities and promoting 
                  environmental conservation across India's diverse landscapes.
                </p>
              </motion.div>

              <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-green-500/20"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-green-200 leading-relaxed">
                  To become India's leading adventure tourism company, recognized for our commitment 
                  to responsible travel, exceptional customer experiences, and our role in preserving 
                  India's natural and cultural heritage for future generations.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 px-6 bg-black/20">
          <div className="container mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Impact
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-green-200 font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Meet Our Team
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-green-500/20 group hover:bg-white/15 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    />
                    {/* Loading placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {member.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-green-300 font-medium mb-2">{member.role}</p>
                    <p className="text-green-200 text-sm mb-3">{member.experience}</p>
                    <p className="text-white/80 text-sm">{member.speciality}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6 bg-black/20">
          <div className="container mx-auto max-w-4xl">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our Core Values
            </motion.h2>
            
            <div className="space-y-8">
              {[
                {
                  title: "Safety First",
                  description: "Every adventure is planned with meticulous attention to safety protocols and emergency procedures."
                },
                {
                  title: "Sustainable Tourism",
                  description: "We promote eco-friendly practices and work with local communities to ensure minimal environmental impact."
                },
                {
                  title: "Authentic Experiences",
                  description: "We create genuine connections with local cultures and pristine natural environments."
                },
                {
                  title: "Expert Guidance",
                  description: "Our experienced guides ensure you get the most out of every adventure while staying safe."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-green-200 leading-relaxed">{value.description}</p>
                  </div>
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
