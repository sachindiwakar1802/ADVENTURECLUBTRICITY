import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';

// Embedded ContactForm Component (to avoid import issues)
const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-vertical"
            placeholder="Tell us about your adventure plans or questions..."
          />
        </div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-800 transition duration-300 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
};

// Main Contact Component
const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['Chandigarh, Mohali, Panchkula', 'Tricity Region, India'],
      color: 'text-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 87654 32109'],
      color: 'text-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@adventureclubtricity.com', 'adventures@gmail.com'],
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Monday - Saturday: 9AM - 6PM', 'Sunday: 10AM - 4PM'],
      color: 'text-orange-500'
    }
  ];

  const faqs = [
    {
      question: 'What should I bring for a trek?',
      answer: 'We provide a detailed packing list for each adventure. Generally, you\'ll need comfortable trekking shoes, weather-appropriate clothing, water bottles, and a backpack. We provide safety equipment.'
    },
    {
      question: 'Are your adventures suitable for beginners?',
      answer: 'Absolutely! We offer adventures for all skill levels, from easy nature walks to challenging mountain treks. Each activity is clearly marked with difficulty levels.'
    },
    {
      question: 'What safety measures do you have in place?',
      answer: 'Safety is our top priority. All guides are certified, we carry first aid equipment, maintain small group sizes, and have emergency communication systems on all trips.'
    },
    {
      question: 'Do you provide transportation?',
      answer: 'Yes, we arrange comfortable transportation from designated pickup points in the Tricity area. Transportation costs are included in most packages.'
    }
  ];

  const handleFormSubmit = async (formData) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 text-white py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold text-center mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Get In Touch
          </motion.h1>
          
          <motion.p 
            className="text-xl text-center max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ready to embark on your next adventure? We're here to help you plan 
            the perfect outdoor experience tailored just for you.
          </motion.p>
        </div>

        {/* Floating Elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.section>

      <div className="container mx-auto px-6 py-12">
        {/* Contact Information Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {contactInfo.map(({ icon: Icon, title, details, color }, index) => (
            <motion.div
              key={title}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <Icon className={`${color} w-12 h-12 mx-auto mb-4`} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
              {details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm mb-1">{detail}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form and Map Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <ContactForm onSubmit={handleFormSubmit} />
            
            {/* Success Message */}
            {formSubmitted && (
              <motion.div
                className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center">
                  <Send className="mr-2" size={20} />
                  <span>Message sent successfully! We'll get back to you soon.</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Map and Additional Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            {/* Embedded Map */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109737.76043524858!2d76.69348873125001!3d30.73629540000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Adventure Club Tricity Location"
              ></iframe>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MessageSquare className="mr-2" />
                Quick Response
              </h3>
              <p className="mb-4 opacity-90">
                Need immediate assistance? WhatsApp us for instant support and quick answers 
                to your adventure queries.
              </p>
              <motion.button
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                WhatsApp Us
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map(({ question, answer }, index) => (
              <motion.div
                key={index}
                className="border-l-4 border-blue-500 pl-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{question}</h4>
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Emergency Contact */}
        <motion.div 
          className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center">
            <Phone className="mr-2 text-red-600" />
            Emergency Contact
          </h3>
          <p className="text-red-700">
            For emergencies during adventures, call our 24/7 helpline: 
            <strong className="ml-2">+91 99999 88888</strong>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
