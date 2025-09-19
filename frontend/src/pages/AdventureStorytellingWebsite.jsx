import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '../components/ui/LoadingScreen';
import WelcomeScreen from '../components/ui/WelcomeScreen';

// Stories Data (unchanged)
const stories = [
  {
    title: 'Mountain Adventure',
    description: 'Explore the majestic peaks and discover hidden trails that lead to breathtaking views.',
    backgroundImage: '/images/mountain.jpg',
    callToAction: 'Start Adventure',
    duration: 10
  },
  {
    title: 'Forest Expedition', 
    description: 'Journey through ancient woods and uncover the secrets of nature.',
    backgroundImage: '/images/forest.jpg',
    callToAction: 'Explore Forest',
    duration: 8
  },
  {
    title: 'River Rapids',
    description: 'Navigate thrilling white water rapids and experience the rush of adventure.',
    backgroundImage: '/images/river.jpg', 
    callToAction: 'Join Rapids',
    duration: 12
  },
  {
    title: 'Desert Safari',
    description: 'Cross vast sand dunes and witness stunning desert sunsets.',
    backgroundImage: '/images/desert.jpg',
    callToAction: 'Desert Adventure',
    duration: 15
  }
];

// Story Navigation Component
const StoryNavigation = ({ 
  stories, 
  currentStory, 
  onStoryChange, 
  storyProgress, 
  isAutoPlay = true,
  onExit
}) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (isAutoPlay && !isPaused && storyProgress >= 1) {
      const nextStoryIndex = (currentStory + 1) % stories.length;
      setTimeout(() => onStoryChange(nextStoryIndex), 1500);
    }
  }, [storyProgress, currentStory, stories.length, isAutoPlay, isPaused, onStoryChange]);

  // FIXED: Direct event handler with proper debugging
  const handleBackToHome = (event) => {
    console.log('🔴 RED BUTTON CLICKED!'); // Debug log
    console.log('Event:', event); // Debug event
    console.log('onExit function:', onExit); // Debug function
    
    // Prevent any event bubbling
    event.preventDefault();
    event.stopPropagation();
    
    // Call the exit function
    if (onExit && typeof onExit === 'function') {
      console.log('✅ Calling onExit function');
      onExit();
    } else {
      console.error('❌ onExit function not available or not a function');
    }
  };

  // Browser back button and keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed - exiting story mode');
        onExit && onExit();
      }
    };

    const handlePopState = (event) => {
      console.log('Browser back button pressed - exiting story mode');
      onExit && onExit();
      event.preventDefault();
      return false;
    };

    window.history.pushState({ storyMode: true }, '', window.location.pathname);
    
    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onExit]);

  const handlePauseToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsPaused(!isPaused);
    console.log('Pause toggled:', !isPaused);
  };

  // TESTING: Simple test button
  const testFunction = () => {
    console.log('🧪 TEST BUTTON WORKS!');
    alert('Test button clicked - this proves React events are working');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Background Image */}
      {stories[currentStory]?.backgroundImage && (
        <motion.div
          key={`bg-${currentStory}`}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={stories[currentStory].backgroundImage} 
            alt={stories[currentStory].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>
      )}

      {/* ADJUSTED Story Progress Bars - Now leaves space on LEFT */}
      <div className="absolute top-6 left-40 right-6 z-60 flex space-x-2">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: index === currentStory 
                  ? `${storyProgress * 100}%` 
                  : index < currentStory ? '100%' : '0%'
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* MOVED TO LEFT: All Top Controls */}
      <div className="absolute top-6 left-6 z-[100] flex flex-col space-y-3">
        {/* TEST BUTTON - Remove after confirming it works */}
        <button
          onClick={testFunction}
          className="bg-green-500 text-white px-4 py-2 rounded text-sm"
        >
          TEST
        </button>

        {/* RED BACK TO HOME BUTTON - Now on LEFT */}
        <button
          onClick={handleBackToHome}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer"
          style={{ 
            zIndex: 1000,
            pointerEvents: 'auto',
            position: 'relative'
          }}
          title="Back to Home (ESC)"
        >
          <span>←</span>
          <span>Home</span>
        </button>

        {/* Pause/Play Button - Now on LEFT */}
        <button
          onClick={handlePauseToggle}
          className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          title={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>

        {/* Menu Button - Now on LEFT */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowNavigation(!showNavigation);
            console.log('Menu toggled:', !showNavigation);
          }}
          className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          ⋯
        </button>
      </div>

      {/* Navigation Dots - KEPT on RIGHT for balance */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-60 space-y-3">
        {stories.map((story, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onStoryChange(index);
              console.log('Story changed to:', index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 border cursor-pointer ${
              currentStory === index 
                ? 'bg-white scale-125 border-white shadow-lg'
                : 'bg-transparent border-white/60 hover:bg-white/40 hover:scale-110'
            }`}
            style={{ pointerEvents: 'auto' }}
            title={story.title}
          />
        ))}
      </div>

      {/* LEFT SIDE VERTICAL BUTTON STRIP - Alternative Layout */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-60 flex flex-col space-y-4">
        {/* Additional left-side shortcuts */}
        <motion.button
          onClick={() => {
            const prevIndex = currentStory === 0 ? stories.length - 1 : currentStory - 1;
            onStoryChange(prevIndex);
          }}
          className="bg-black/50 backdrop-blur-sm text-white w-12 h-12 rounded-full hover:bg-black/70 transition-all duration-300 cursor-pointer flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Previous Story"
        >
          ←
        </motion.button>

        <motion.button
          onClick={() => {
            const nextIndex = (currentStory + 1) % stories.length;
            onStoryChange(nextIndex);
          }}
          className="bg-black/50 backdrop-blur-sm text-white w-12 h-12 rounded-full hover:bg-black/70 transition-all duration-300 cursor-pointer flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Next Story"
        >
          →
        </motion.button>
      </div>

      {/* Main Story Content */}
      <div className="absolute inset-0 z-50 flex flex-col justify-between p-6 pt-20 pb-32">
        <div className="flex-1 flex items-end">
          <motion.div 
            className="max-w-4xl ml-40" // Added left margin to avoid button overlap
            key={`content-${currentStory}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {stories[currentStory]?.title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {stories[currentStory]?.description}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-6 left-40 right-6 z-60"> {/* Adjusted to avoid left buttons */}
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-white/80 text-sm">
              {currentStory + 1} of {stories.length}
            </div>
            
            {/* Additional Back Button at Bottom */}
            <button
              onClick={handleBackToHome}
              className="text-white/60 hover:text-white text-sm flex items-center space-x-1 transition-colors duration-200 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              <span>←</span>
              <span>Back to Stories</span>
            </button>
          </motion.div>

          {stories[currentStory]?.callToAction && (
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('CTA clicked:', stories[currentStory].callToAction);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ pointerEvents: 'auto' }}
            >
              {stories[currentStory].callToAction}
            </motion.button>
          )}
        </div>
      </div>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {showNavigation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowNavigation(false);
              }}
              className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
              {stories.map((story, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onStoryChange(index);
                    setShowNavigation(false);
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  <h3 className="text-white font-bold text-lg mb-2">{story.title}</h3>
                  <p className="text-gray-300 text-sm">{story.description}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Navigation Areas - LOWER Z-INDEX */}
      <div className="absolute inset-0 z-30 flex">
        <div 
          className="w-1/3 h-full cursor-pointer"
          onClick={() => {
            const prevIndex = currentStory === 0 ? stories.length - 1 : currentStory - 1;
            onStoryChange(prevIndex);
          }}
        />
        <div 
          className="w-1/3 h-full ml-auto cursor-pointer"
          onClick={() => {
            const nextIndex = (currentStory + 1) % stories.length;
            onStoryChange(nextIndex);
          }}
        />
      </div>

      {/* LEFT-ALIGNED Debug Info */}
      <div className="absolute top-20 left-40 z-60 text-white/60 text-xs">
        <p>Debug: Story {currentStory + 1}, Progress: {Math.round(storyProgress * 100)}%</p>
        <p>onExit function: {onExit ? '✅ Available' : '❌ Missing'}</p>
        <p>Buttons: LEFT SIDE</p>
      </div>
    </div>
  );
};

// Progress Hook (unchanged)
const useStoryProgress = (duration, hasStarted) => {
  const [progress, setProgress] = useState(0);
  const resetProgress = () => setProgress(0);

  useEffect(() => {
    if (!hasStarted) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = 50;
    const increment = interval / (duration * 1000);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        return newProgress >= 1 ? 1 : newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, hasStarted]);

  return { progress, resetProgress };
};

// Main Component (unchanged)
const AdventureStorytellingWebsite = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const { progress, resetProgress } = useStoryProgress(
    stories[currentStory]?.duration || 10, 
    hasStarted
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStoryChange = (newIndex) => {
    console.log('Story changing from', currentStory, 'to', newIndex);
    setCurrentStory(newIndex);
    resetProgress();
  };

  const startExperience = () => {
    console.log('Starting experience...');
    setHasStarted(true);
  };

  const exitStoryMode = () => {
    console.log('🚀 EXIT STORY MODE CALLED!');
    console.log('Current hasStarted state:', hasStarted);
    
    setHasStarted(false);
    setCurrentStory(0);
    resetProgress();
    
    console.log('✅ Story mode should be exited now');
  };

  console.log('🔍 Current State:', { hasStarted, currentStory, isLoading });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!hasStarted) {
    return <WelcomeScreen onStart={startExperience} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <StoryNavigation 
        stories={stories}
        currentStory={currentStory}
        onStoryChange={handleStoryChange}
        storyProgress={progress}
        isAutoPlay={true}
        onExit={exitStoryMode}
      />
    </div>
  );
};

export default AdventureStorytellingWebsite;
