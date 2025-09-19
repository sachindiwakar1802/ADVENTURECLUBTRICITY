import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adventure: '',
    message: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const adventureTypes = [
    'Himalayan Trekking',
    'Wildlife Safari',
    'Beach Adventure',
    'Cultural Tour',
    'Desert Safari',
    'Backwater Cruise',
    'Mountain Biking',
    'Rock Climbing',
    'Custom Package'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        adventure: '',
        message: '',
        newsletter: false
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <motion.div
        className="bg-green-500/20 border-2 border-green-500/30 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-green-200">
          Thank you for your interest! We'll get back to you within 24 hours to plan your adventure.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-green-500/20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label className="block text-green-200 text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-green-200 text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-green-200 text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        {/* Adventure Type */}
        <div>
          <label className="block text-green-200 text-sm font-medium mb-2">
            Interested Adventure
          </label>
          <select
            name="adventure"
            value={formData.adventure}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300"
          >
            <option value="" className="bg-green-800">Select an adventure</option>
            {adventureTypes.map(adventure => (
              <option key={adventure} value={adventure} className="bg-green-800">
                {adventure}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field - Full Width */}
        <div className="md:col-span-2">
          <label className="block text-green-200 text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-green-500/30 rounded-xl text-white placeholder-green-300/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-300 resize-none"
            placeholder="Tell us about your dream adventure, preferred dates, group size, or any special requirements..."
          />
        </div>

        {/* Newsletter Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="w-5 h-5 bg-white/5 border-2 border-green-500/30 rounded focus:ring-green-500 focus:ring-offset-0 text-green-500"
            />
            <span className="text-green-200 text-sm">
              Subscribe to our newsletter for adventure updates and exclusive offers
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full md:w-auto px-12"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          }
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
        
        <p className="text-green-300/60 text-sm mt-4">
          We'll respond within 24 hours to help plan your perfect adventure
        </p>
      </div>
    </motion.form>
  );
};

export default ContactForm;
