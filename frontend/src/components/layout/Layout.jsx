import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, showNavigation = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
      {/* Navigation */}
      {showNavigation && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-50 flex-shrink-0"
        >
          <Navbar />
        </motion.header>
      )}

      {/* Main Content */}
      <motion.main
        className={`flex-grow relative z-10 ${showNavigation ? 'pt-20' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.main>

      {/* Footer */}
      {showNavigation && (
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-50 flex-shrink-0"
        >
          <Footer />
        </motion.footer>
      )}
    </div>
  );
};

export default Layout;
