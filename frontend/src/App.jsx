import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react'; // Add this import
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdventureStorytellingWebsite from './pages/AdventureStorytellingWebsite';
import Activities from './pages/Activities';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  const location = useLocation();
  const [layoutReady, setLayoutReady] = useState(false); // Add loading state
  
  const showNavigation = true;

  // ✅ FIXED: Ensure layout is ready before showing content
  useEffect(() => {
    const timer = setTimeout(() => {
      setLayoutReady(true);
    }, 100); // Small delay to ensure CSS is applied
    
    return () => clearTimeout(timer);
  }, []);

  // Show minimal loading while layout settles
  if (!layoutReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-amber-900">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Navigation */}
      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-50 flex-shrink-0"
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main 
          key={location.pathname}
          className={`flex-grow relative z-10 ${showNavigation ? 'pt-20' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AdventureStorytellingWebsite />} />
            <Route path="/story" element={<AdventureStorytellingWebsite />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/panel" element={<AdminPanel />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      
      {/* Footer */}
      <AnimatePresence>
        {showNavigation && (
          <motion.footer
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-50 flex-shrink-0"
          >
            <Footer />
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
