import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: ''
  });
  const location = useLocation();

  // Default admin credentials (in production, this should be handled by backend authentication)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Activities', path: '/activities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Add admin-only nav items
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Users', path: '/admin/users' },
    { name: 'Bookings', path: '/admin/bookings' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Check if user is already logged in (localStorage persistence)
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminCredentials.username === ADMIN_CREDENTIALS.username &&
      adminCredentials.password === ADMIN_CREDENTIALS.password
    ) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowAdminLogin(false);
      setAdminCredentials({ username: '', password: '' });
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const displayNavItems = isAdmin ? [...navItems, ...adminNavItems] : navItems;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? 'bg-green-900/95 backdrop-blur-md shadow-lg border-b border-green-500/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-white">Adventure India</h1>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {displayNavItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`relative text-lg font-medium transition-all duration-300 group ${
                      location.pathname === item.path
                        ? 'text-green-300'
                        : 'text-white hover:text-green-300'
                    } ${item.path.includes('/admin') ? 'text-yellow-300' : ''}`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'w-full'
                          : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </motion.div>
              ))}
              
              {/* Admin Auth Button */}
              {isAdmin ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center space-x-4"
                >
                  <span className="text-yellow-300 font-medium">Admin</span>
                  <button
                    onClick={handleAdminLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Logout
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    onClick={() => setShowAdminLogin(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mr-4"
                  >
                    Admin
                  </button>
                </motion.div>
              )}
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Plan Adventure
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden pb-6 border-t border-green-500/20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="pt-4 space-y-2">
                  {displayNavItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                          location.pathname === item.path
                            ? 'text-green-300 bg-green-500/20'
                            : 'text-white hover:text-green-300 hover:bg-green-500/10'
                        } ${item.path.includes('/admin') ? 'text-yellow-300 bg-yellow-500/10' : ''}`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Admin Auth */}
                  {isAdmin ? (
                    <motion.div
                      className="pt-4 space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <div className="text-yellow-300 text-center font-medium">Logged in as Admin</div>
                      <button
                        onClick={handleAdminLogout}
                        className="block w-full text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                      >
                        Admin Logout
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <button
                        onClick={() => setShowAdminLogin(true)}
                        className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-semibold transition-all duration-300"
                      >
                        Admin Login
                      </button>
                    </motion.div>
                  )}
                  
                  {/* Mobile CTA */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Link
                      to="/contact"
                      className="block w-full text-center bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300"
                    >
                      Plan Adventure
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdminLogin(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
                <button
                  onClick={() => setShowAdminLogin(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({
                      ...adminCredentials,
                      username: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({
                      ...adminCredentials,
                      password: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Login as Admin
                  </button>
                </div>
              </form>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                Demo credentials: admin / admin123
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
