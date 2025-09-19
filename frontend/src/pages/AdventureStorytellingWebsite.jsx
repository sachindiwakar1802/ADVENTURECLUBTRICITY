import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import LoadingScreen from '../components/ui/LoadingScreen';
import WelcomeScreen from '../components/ui/WelcomeScreen';

// Stories Data
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

// Progress Hook
const useStoryProgress = (duration, hasStarted, isPaused = false) => {
  const [progress, setProgress] = useState(0);
  const resetProgress = () => setProgress(0);

  useEffect(() => {
    console.log('📊 Progress Hook - hasStarted:', hasStarted, 'isPaused:', isPaused);
    
    if (!hasStarted || isPaused) {
      console.log('⏸️ Progress STOPPED - hasStarted:', hasStarted, 'isPaused:', isPaused);
      return;
    }

    setProgress(0);
    const interval = 50;
    const increment = interval / (duration * 1000);

    console.log('▶️ Starting progress with duration:', duration, 'increment:', increment);

    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;        
        if (newProgress >= 1) {
          console.log('✅ Progress complete!');
          clearInterval(timer);
          return 1;
        }
        return newProgress;
      });
    }, interval);

    return () => {
      console.log('🛑 Cleaning up progress timer');
      clearInterval(timer);
    };
  }, [duration, hasStarted, isPaused]);

  return { progress, resetProgress };
};

// BULLETPROOF Close Button Component using React Portal
const CloseButton = ({ onClose, show }) => {
  useEffect(() => {
    if (!show) return;

    // Create a native DOM button with direct event listener
    const createNativeButton = () => {
      const button = document.createElement('button');
      button.innerHTML = '✕';
      button.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        width: 80px !important;
        height: 80px !important;
        background: linear-gradient(135deg, #dc3545, #c82333) !important;
        border: 4px solid white !important;
        border-radius: 50% !important;
        color: white !important;
        font-size: 32px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        z-index: 999999 !important;
        box-shadow: 0 4px 20px rgba(220, 53, 69, 0.6) !important;
        transition: all 0.2s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        pointer-events: auto !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      `;
      
      button.id = 'story-close-button-native';
      button.title = 'Close Story Menu';
      button.type = 'button';

      // Add hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 25px rgba(220, 53, 69, 0.8)';
        button.style.background = 'linear-gradient(135deg, #c82333, #a71e2a)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 20px rgba(220, 53, 69, 0.6)';
        button.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
      });

      // DIRECT click event listener
      button.addEventListener('click', (e) => {
        console.log('🔥 NATIVE BUTTON CLICKED!');
        console.log('Event:', e);
        e.preventDefault();
        e.stopPropagation();
        onClose();
      });

      // Prevent all other events from interfering
      button.addEventListener('mousedown', (e) => {
        console.log('🔥 NATIVE BUTTON MOUSEDOWN!');
        e.stopPropagation();
      });

      button.addEventListener('mouseup', (e) => {
        console.log('🔥 NATIVE BUTTON MOUSEUP!');
        e.stopPropagation();
      });

      return button;
    };

    const nativeButton = createNativeButton();
    document.body.appendChild(nativeButton);

    console.log('🚀 Native close button created and added to DOM');

    return () => {
      const existingButton = document.getElementById('story-close-button-native');
      if (existingButton) {
        existingButton.remove();
        console.log('🗑️ Native close button removed from DOM');
      }
    };
  }, [show, onClose]);

  // Also render a React portal version as backup
  if (!show) return null;

  return createPortal(
    <button
      onClick={(e) => {
        console.log('🌟 PORTAL BUTTON CLICKED!');
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      className="fixed top-4 left-4 w-20 h-20 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl transition-all duration-300 border-4 border-black hover:scale-110 z-[999999]"
      style={{
        pointerEvents: 'auto',
        isolation: 'isolate',
        position: 'fixed',
        zIndex: 999999
      }}
      title="Portal Close Button (Backup)"
    >
      ✕
    </button>,
    document.body
  );
};

// Story Navigation Component
const StoryNavigation = ({ 
  stories, 
  currentStory, 
  onStoryChange, 
  storyProgress, 
  isAutoPlay = true,
  onExit,
  isPaused,
  onPauseToggle
}) => {
  const [showNavigation, setShowNavigation] = useState(false);
  
  useEffect(() => {
    console.log('🔄 Auto-play check - isAutoPlay:', isAutoPlay, 'isPaused:', isPaused, 'progress:', storyProgress);
    
    if (isAutoPlay && !isPaused && storyProgress >= 1) {
      console.log('⏭️ Auto-advancing to next story');
      const nextStoryIndex = (currentStory + 1) % stories.length;
      const timeout = setTimeout(() => {
        onStoryChange(nextStoryIndex);
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [storyProgress, currentStory, stories.length, isAutoPlay, isPaused, onStoryChange]);

  // Event handlers
  const handlePreviousStory = useCallback((event) => {
    console.log('⬅️ PREVIOUS BUTTON CLICKED!');
    const prevIndex = currentStory === 0 ? stories.length - 1 : currentStory - 1;
    console.log(`Going from story ${currentStory} to ${prevIndex}`);
    onStoryChange(prevIndex);
  }, [currentStory, stories.length, onStoryChange]);

  const handleNextStory = useCallback((event) => {
    console.log('➡️ NEXT BUTTON CLICKED!');
    const nextIndex = (currentStory + 1) % stories.length;
    console.log(`Going from story ${currentStory} to ${nextIndex}`);
    onStoryChange(nextIndex);
  }, [currentStory, stories.length, onStoryChange]);

  const handleBackToHome = useCallback((event) => {
    console.log('🔴 HOME BUTTON CLICKED!');
    onExit();
  }, [onExit]);

  const handlePauseToggle = useCallback((event) => {
    console.log('⏸️ PAUSE/PLAY BUTTON CLICKED!');
    console.log('Current isPaused state:', isPaused);
    onPauseToggle();
  }, [isPaused, onPauseToggle]);

  const handleMenuToggle = useCallback((event) => {
    console.log('📋 MENU BUTTON CLICKED!');
    console.log('Current showNavigation state:', showNavigation);
    setShowNavigation(prev => !prev);
  }, [showNavigation]);

  // BULLETPROOF close handler
  const handleCloseMenu = useCallback(() => {
    console.log('❌ CLOSE MENU CALLED - NATIVE + PORTAL!');
    console.log('Current showNavigation state:', showNavigation);
    
    setShowNavigation(false);
    console.log('✅ Menu should be closed now');
    
    // Force update document to ensure menu is closed
    setTimeout(() => {
      const modalElements = document.querySelectorAll('[data-story-modal="true"]');
      modalElements.forEach(el => {
        el.style.display = 'none';
      });
    }, 100);
  }, [showNavigation]);

  const handleStorySelect = useCallback((index) => {
    console.log(`📖 STORY ${index} SELECTED!`);
    onStoryChange(index);
    setShowNavigation(false);
  }, [onStoryChange]);

  // Browser controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        if (showNavigation) {
          console.log('ESC - closing menu');
          handleCloseMenu();
        } else {
          console.log('ESC - exiting story mode');
          onExit();
        }
      }
      if (event.key === 'ArrowLeft' && !showNavigation) {
        handlePreviousStory(event);
      }
      if (event.key === 'ArrowRight' && !showNavigation) {
        handleNextStory(event);
      }
      if (event.key === ' ' && !showNavigation) {
        event.preventDefault();
        handlePauseToggle(event);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showNavigation, handlePreviousStory, handleNextStory, handlePauseToggle, onExit, handleCloseMenu]);

  const testFunction = () => {
    console.log('🧪 TEST BUTTON WORKS!');
    alert(`Test - isPaused: ${isPaused}, showNavigation: ${showNavigation}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Background Image */}
      {stories[currentStory]?.backgroundImage && (
        <motion.div
          key={`bg-${currentStory}`}
          className="absolute inset-0 z-10"
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

      {/* Story Progress Bars */}
      <div className="absolute top-6 left-40 right-6 z-[200] flex space-x-2">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full transition-all duration-200 ${
                isPaused ? 'bg-yellow-400' : 'bg-white'
              }`}
              initial={{ width: 0 }}
              animate={{ 
                width: index === currentStory 
                  ? `${storyProgress * 100}%` 
                  : index < currentStory ? '100%' : '0%'
              }}
              transition={{ 
                duration: isPaused ? 0 : 0.3,
                ease: "linear"
              }}
            />
          </div>
        ))}
      </div>

      {/* All Top Controls */}
      <div className="absolute top-6 left-6 z-[300] flex flex-col space-y-3">
        <button
          onClick={testFunction}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          TEST
        </button>

        <button
          onClick={handleBackToHome}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center space-x-2"
          title="Back to Home (ESC)"
        >
          <span>←</span>
          <span>Home</span>
        </button>

        <button
          onClick={handlePauseToggle}
          className={`backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border-2 font-bold text-sm ${
            isPaused 
              ? 'bg-green-600 border-green-400 hover:bg-green-500 shadow-lg shadow-green-500/50' 
              : 'bg-red-600 border-red-400 hover:bg-red-500 shadow-lg shadow-red-500/50'
          }`}
          title={isPaused ? "Resume (Spacebar)" : "Pause (Spacebar)"}
        >
          <div className="flex items-center space-x-1">
            <span>{isPaused ? '▶️' : '⏸️'}</span>
            <span>{isPaused ? 'PLAY' : 'PAUSE'}</span>
          </div>
        </button>

        <button
          onClick={handleMenuToggle}
          className={`backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 border-2 ${
            showNavigation 
              ? 'bg-blue-600 border-blue-400 hover:bg-blue-500' 
              : 'bg-black/70 border-white/20 hover:bg-black/90'
          }`}
          title="Menu"
        >
          {showNavigation ? '📖' : '⋯'}
        </button>
      </div>

      {/* Left Side Navigation Arrows */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[400] flex flex-col space-y-4">
        <button
          onClick={handlePreviousStory}
          disabled={stories.length <= 1 || showNavigation}
          className={`w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center text-xl font-bold border-2 ${
            stories.length <= 1 || showNavigation
              ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed border-gray-400/20' 
              : 'bg-black/80 hover:bg-blue-600 text-white border-white/40 hover:border-blue-400 shadow-lg hover:shadow-xl transform hover:scale-110'
          }`}
          title="Previous Story (Left Arrow)"
        >
          ⬅️
        </button>

        <button
          onClick={handleNextStory}
          disabled={stories.length <= 1 || showNavigation}
          className={`w-16 h-16 rounded-full transition-all duration-300 flex items-center justify-center text-xl font-bold border-2 ${
            stories.length <= 1 || showNavigation
              ? 'bg-gray-500/50 text-gray-400 cursor-not-allowed border-gray-400/20' 
              : 'bg-black/80 hover:bg-blue-600 text-white border-white/40 hover:border-blue-400 shadow-lg hover:shadow-xl transform hover:scale-110'
          }`}
          title="Next Story (Right Arrow)"
        >
          ➡️
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-[200] space-y-3">
        {stories.map((story, index) => (
          <button
            key={index}
            onClick={() => {
              if (!showNavigation) {
                console.log(`📍 DOT ${index} CLICKED!`);
                onStoryChange(index);
              }
            }}
            disabled={showNavigation}
            className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
              showNavigation
                ? 'opacity-50 cursor-not-allowed'
                : currentStory === index 
                  ? 'bg-white scale-125 border-white shadow-lg'
                  : 'bg-transparent border-white/60 hover:bg-white/40 hover:scale-110'
            }`}
            title={story.title}
          />
        ))}
      </div>

      {/* Main Story Content */}
      <div className="absolute inset-0 z-50 flex flex-col justify-between p-6 pt-20 pb-32">
        <div className="flex-1 flex items-end">
          <motion.div 
            className="max-w-4xl ml-48"
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
      <div className="absolute bottom-6 left-48 right-6 z-[150]">
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
            
            <div className={`text-sm px-3 py-2 rounded-full font-bold border-2 ${
              isPaused 
                ? 'bg-yellow-500/90 text-black border-yellow-400' 
                : 'bg-green-500/90 text-white border-green-400'
            }`}>
              {isPaused ? '⏸️ PAUSED' : '▶️ PLAYING'}
            </div>

            <div className="text-white/60 text-xs">
              Progress: {Math.round(storyProgress * 100)}%
            </div>
            
            <button
              onClick={handleBackToHome}
              className="text-white/60 hover:text-white text-sm flex items-center space-x-1 transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Stories</span>
            </button>
          </motion.div>

          {stories[currentStory]?.callToAction && (
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                console.log('🎯 CTA clicked:', stories[currentStory].callToAction);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {stories[currentStory].callToAction}
            </motion.button>
          )}
        </div>
      </div>

      {/* BULLETPROOF Navigation Menu with Native Close Button */}
      <AnimatePresence>
        {showNavigation && (
          <>
            {/* Main Modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[8000]"
              data-story-modal="true"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="absolute inset-0 z-[8100] flex items-center justify-center p-8">
                <div className="w-full max-w-6xl">
                  <h2 className="text-white text-4xl font-bold text-center mb-12">
                    📚 Story Menu
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                      <button
                        key={index}
                        onClick={() => handleStorySelect(index)}
                        className={`group bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left hover:bg-white/20 transition-all duration-300 border-2 hover:border-white/40 transform hover:scale-105 hover:shadow-2xl ${
                          currentStory === index ? 'border-blue-400 bg-blue-500/20' : 'border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white font-bold text-xl mb-2 flex items-center group-hover:text-blue-200 transition-colors">
                            {currentStory === index && <span className="mr-2">▶️</span>}
                            {story.title}
                          </h3>
                          {currentStory === index && (
                            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              Current
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
                          {story.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                            <span className="block">⏱️ Duration: {story.duration}s</span>
                            <span className="block">🎯 {story.callToAction}</span>
                          </div>
                          <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                            ▶️
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-center mt-8 text-gray-400 text-sm">
                    <p>Click any story to start • Press ESC to close • RED button in corner to close</p>
                    <p className="text-yellow-300 mt-2">🔥 If RED button doesn't work, try YELLOW backup button (top-left)</p>
                  </div>
                </div>
              </div>

              {/* Background Click to Close */}
              <div 
                className="absolute inset-0 z-[7900]"
                onClick={handleCloseMenu}
                style={{ pointerEvents: 'auto' }}
              />
            </motion.div>

            {/* BULLETPROOF CLOSE BUTTON - Native + Portal */}
            <CloseButton onClose={handleCloseMenu} show={showNavigation} />
          </>
        )}
      </AnimatePresence>

      {/* Click Navigation Areas */}
      {!showNavigation && (
        <div className="absolute inset-0 z-20 flex">
          <div 
            className="w-1/4 h-full cursor-pointer"
            onClick={handlePreviousStory}
          />
          <div className="w-2/4 h-full" />
          <div 
            className="w-1/4 h-full cursor-pointer"
            onClick={handleNextStory}
          />
        </div>
      )}

      {/* Enhanced DEBUG INFO */}
      <div className="absolute top-32 left-48 z-[100] text-white/70 text-xs bg-black/70 p-3 rounded">
        <p>🔍 <strong>DEBUG:</strong></p>
        <p>Story: {currentStory + 1}/{stories.length}</p>
        <p>Progress: {Math.round(storyProgress * 100)}%</p>
        <p>Paused: <span className={isPaused ? 'text-red-400' : 'text-green-400'}>
          {isPaused ? '⏸️ YES' : '▶️ NO'}
        </span></p>
        <p>Menu: <span className={showNavigation ? 'text-blue-400' : 'text-gray-400'}>
          {showNavigation ? '📖 OPEN' : '❌ CLOSED'}
        </span></p>
        <p>Close Btn: <span className="text-red-400">🔥 Native DOM + Portal</span></p>
        <p><em>RED=Native, YELLOW=Portal backup</em></p>
      </div>
    </div>
  );
};

// Main Component (unchanged)
const AdventureStorytellingWebsite = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const { progress, resetProgress } = useStoryProgress(
    stories[currentStory]?.duration || 10, 
    hasStarted,
    isPaused
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStoryChange = useCallback((newIndex) => {
    console.log('📚 Story changing from', currentStory, 'to', newIndex);
    setCurrentStory(newIndex);
    resetProgress();
  }, [currentStory, resetProgress]);

  const startExperience = useCallback(() => {
    console.log('🚀 Starting experience...');
    setHasStarted(true);
    setIsPaused(false);
  }, []);

  const exitStoryMode = useCallback(() => {
    console.log('🏠 EXIT STORY MODE CALLED!');
    setHasStarted(false);
    setCurrentStory(0);
    setIsPaused(false);
    resetProgress();
    console.log('✅ Story mode exited');
  }, [resetProgress]);

  const handlePauseToggle = useCallback(() => {
    console.log('⏯️ PAUSE TOGGLE CALLED! Current state:', isPaused);
    setIsPaused(prev => {
      const newState = !prev;
      console.log('New pause state:', newState);
      return newState;
    });
  }, [isPaused]);

  console.log('🔍 App State:', { hasStarted, currentStory, isLoading, isPaused, progress: Math.round(progress * 100) + '%' });

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
        isPaused={isPaused}
        onPauseToggle={handlePauseToggle}
      />
    </div>
  );
};

export default AdventureStorytellingWebsite;
