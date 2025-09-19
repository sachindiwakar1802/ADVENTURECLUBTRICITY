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

    // Create a native 3D button with direct event listener
    const createNativeButton = () => {
      const button = document.createElement('button');
      button.innerHTML = '✕';
      button.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        width: 80px !important;
        height: 80px !important;
        background: linear-gradient(135deg, #dc3545, #b02a37, #8b1538) !important;
        border: none !important;
        border-radius: 16px !important;
        color: white !important;
        font-size: 32px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        z-index: 999999 !important;
        box-shadow: 
          0 8px 15px rgba(220, 53, 69, 0.4),
          0 4px 6px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        transition: all 0.2s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        pointer-events: auto !important;
        user-select: none !important;
        transform: translateY(0px) !important;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
      `;
      
      button.id = 'story-close-button-native';
      button.title = 'Close Story Menu';
      button.type = 'button';

      // Add 3D hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.05)';
        button.style.boxShadow = `
          0 12px 25px rgba(220, 53, 69, 0.6),
          0 8px 10px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `;
        button.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b, #a93226)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0px) scale(1)';
        button.style.boxShadow = `
          0 8px 15px rgba(220, 53, 69, 0.4),
          0 4px 6px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `;
        button.style.background = 'linear-gradient(135deg, #dc3545, #b02a37, #8b1538)';
      });

      // Active (pressed) state
      button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(2px) scale(0.98)';
        button.style.boxShadow = `
          0 4px 8px rgba(220, 53, 69, 0.6),
          0 2px 4px rgba(0, 0, 0, 0.2),
          inset 0 2px 4px rgba(0, 0, 0, 0.1)
        `;
      });

      button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-2px) scale(1.05)';
      });

      // DIRECT click event listener
      button.addEventListener('click', (e) => {
        console.log('🔥 NATIVE 3D BUTTON CLICKED!');
        console.log('Event:', e);
        e.preventDefault();
        e.stopPropagation();
        onClose();
      });

      return button;
    };

    const nativeButton = createNativeButton();
    document.body.appendChild(nativeButton);

    console.log('🚀 Native 3D close button created and added to DOM');

    return () => {
      const existingButton = document.getElementById('story-close-button-native');
      if (existingButton) {
        existingButton.remove();
        console.log('🗑️ Native 3D close button removed from DOM');
      }
    };
  }, [show, onClose]);

  // Portal version with 3D effects as backup
  if (!show) return null;

  return createPortal(
    <button
      onClick={(e) => {
        console.log('🌟 PORTAL 3D BUTTON CLICKED!');
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
      className="fixed top-4 left-4 w-20 h-20 rounded-2xl font-bold shadow-2xl transition-all duration-200 border-0 z-[999999] transform hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1"
      style={{
        background: 'linear-gradient(135deg, #f39c12, #e67e22, #d35400)',
        boxShadow: `
          0 8px 15px rgba(243, 156, 18, 0.4),
          0 4px 6px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
        color: 'white',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'auto',
        isolation: 'isolate',
        position: 'fixed'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'linear-gradient(135deg, #f4d03f, #f39c12, #e67e22)';
        e.target.style.boxShadow = `
          0 12px 25px rgba(243, 156, 18, 0.6),
          0 8px 10px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `;
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'linear-gradient(135deg, #f39c12, #e67e22, #d35400)';
        e.target.style.boxShadow = `
          0 8px 15px rgba(243, 156, 18, 0.4),
          0 4px 6px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `;
      }}
      title="Portal Close Button (Backup)"
    >
      <span style={{ fontSize: '24px' }}>✕</span>
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

  // FIXED: Enhanced Back to Home handler with better debugging
  const handleBackToHome = useCallback((event) => {
    console.log('🌲 FOREST TIGER BACK BUTTON CLICKED!');
    console.log('Event received:', event);
    console.log('onExit function:', onExit);
    console.log('onExit type:', typeof onExit);
    
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (onExit && typeof onExit === 'function') {
      console.log('✅ Calling onExit function');
      onExit();
      console.log('✅ onExit function called successfully');
    } else {
      console.error('❌ onExit function not available or not a function');
    }
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

  const handleCloseMenu = useCallback(() => {
    console.log('❌ CLOSE MENU CALLED - 3D BUTTONS!');
    console.log('Current showNavigation state:', showNavigation);
    
    setShowNavigation(false);
    console.log('✅ Menu should be closed now');
    
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
          handleBackToHome();
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
  }, [showNavigation, handlePreviousStory, handleNextStory, handlePauseToggle, handleBackToHome, handleCloseMenu]);

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

      {/* HUGE FOREST TIGER BACK BUTTON - TOP CENTER */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[500]">
        <button
          onClick={handleBackToHome}
          className="relative overflow-hidden transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-green-400/50"
          style={{
            width: '200px',
            height: '80px',
            background: `
              linear-gradient(45deg, #228B22 0%, #32CD32 25%, #228B22 50%, #32CD32 75%, #228B22 100%),
              repeating-linear-gradient(
                45deg,
                #228B22,
                #228B22 8px,
                #2F5233 8px,
                #2F5233 16px,
                #1F4A1F 16px,
                #1F4A1F 24px,
                #2F5233 24px,
                #2F5233 32px
              )
            `,
            backgroundSize: '100% 100%, 40px 40px',
            border: '4px solid #2F5233',
            borderRadius: '20px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: `
              0 12px 25px rgba(34, 139, 34, 0.4),
              0 8px 10px rgba(0, 0, 0, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.2),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2)
            `,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            pointerEvents: 'auto',
            isolation: 'isolate',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `
              linear-gradient(45deg, #32CD32 0%, #00FF00 25%, #32CD32 50%, #00FF00 75%, #32CD32 100%),
              repeating-linear-gradient(
                45deg,
                #32CD32,
                #32CD32 8px,
                #3F6B3F 8px,
                #3F6B3F 16px,
                #2F5A2F 16px,
                #2F5A2F 24px,
                #3F6B3F 24px,
                #3F6B3F 32px
              )
            `;
            e.target.style.boxShadow = `
              0 16px 35px rgba(50, 205, 50, 0.6),
              0 12px 15px rgba(0, 0, 0, 0.4),
              inset 0 2px 4px rgba(255, 255, 255, 0.3),
              inset 0 -2px 4px rgba(0, 0, 0, 0.3)
            `;
            e.target.style.borderColor = '#3F6B3F';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `
              linear-gradient(45deg, #228B22 0%, #32CD32 25%, #228B22 50%, #32CD32 75%, #228B22 100%),
              repeating-linear-gradient(
                45deg,
                #228B22,
                #228B22 8px,
                #2F5233 8px,
                #2F5233 16px,
                #1F4A1F 16px,
                #1F4A1F 24px,
                #2F5233 24px,
                #2F5233 32px
              )
            `;
            e.target.style.boxShadow = `
              0 12px 25px rgba(34, 139, 34, 0.4),
              0 8px 10px rgba(0, 0, 0, 0.3),
              inset 0 2px 4px rgba(255, 255, 255, 0.2),
              inset 0 -2px 4px rgba(0, 0, 0, 0.2)
            `;
            e.target.style.borderColor = '#2F5233';
          }}
          title="🌲 Back to Home - Forest Tiger Style!"
        >
          {/* Animated Tiger Stripes Overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 4px,
                  rgba(255, 140, 0, 0.3) 4px,
                  rgba(255, 140, 0, 0.3) 8px,
                  transparent 8px,
                  transparent 12px,
                  rgba(255, 69, 0, 0.3) 12px,
                  rgba(255, 69, 0, 0.3) 16px
                )
              `,
              backgroundSize: '32px 32px',
              animation: 'tigerStripes 2s linear infinite',
              borderRadius: '16px'
            }}
          />
          
          {/* Button Content */}
          <div className="relative z-10 flex items-center justify-center space-x-3">
            <span style={{ fontSize: '24px' }}>🏠</span>
            <span>BACK TO HOME</span>
            <span style={{ fontSize: '20px' }}>🐅</span>
          </div>
        </button>
      </div>

      {/* 3D TOP CONTROLS - SMALLER NOW */}
      <div className="absolute top-6 left-6 z-[300] flex flex-col space-y-3">
        {/* 3D PAUSE/PLAY BUTTON */}
        <button
          onClick={handlePauseToggle}
          className="relative transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1"
          style={{
            background: isPaused 
              ? 'linear-gradient(135deg, #2ecc71, #27ae60, #229954)'
              : 'linear-gradient(135deg, #f39c12, #e67e22, #d35400)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: isPaused 
              ? `
                  0 8px 15px rgba(46, 204, 113, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              : `
                  0 8px 15px rgba(243, 156, 18, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            minWidth: '100px',
            justifyContent: 'center'
          }}
          title={isPaused ? "Resume (Spacebar)" : "Pause (Spacebar)"}
        >
          <span>{isPaused ? '▶️' : '⏸️'}</span>
          <span>{isPaused ? 'PLAY' : 'PAUSE'}</span>
        </button>

        {/* 3D MENU BUTTON */}
        <button
          onClick={handleMenuToggle}
          className="relative transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1"
          style={{
            background: showNavigation 
              ? 'linear-gradient(135deg, #3498db, #2980b9, #1f618d)'
              : 'linear-gradient(135deg, #34495e, #2c3e50, #1b2631)',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: showNavigation 
              ? `
                  0 8px 15px rgba(52, 152, 219, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `
              : `
                  0 8px 15px rgba(52, 73, 94, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            minWidth: '50px',
            minHeight: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Menu"
        >
          {showNavigation ? '📖' : '⋯'}
        </button>
      </div>

      {/* 3D LEFT SIDE NAVIGATION ARROWS */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-[400] flex flex-col space-y-4">
        <button
          onClick={handlePreviousStory}
          disabled={stories.length <= 1 || showNavigation}
          className={`w-20 h-20 rounded-2xl transform transition-all duration-200 flex items-center justify-center text-2xl font-bold ${
            stories.length <= 1 || showNavigation
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1 cursor-pointer'
          }`}
          style={{
            background: stories.length <= 1 || showNavigation
              ? 'linear-gradient(135deg, #95a5a6, #7f8c8d, #566573)'
              : 'linear-gradient(135deg, #9b59b6, #8e44ad, #7d3c98)',
            border: 'none',
            color: 'white',
            boxShadow: stories.length <= 1 || showNavigation
              ? '0 4px 8px rgba(149, 165, 166, 0.3)'
              : `
                  0 8px 15px rgba(155, 89, 182, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
          title="Previous Story (Left Arrow)"
        >
          ⬅️
        </button>

        <button
          onClick={handleNextStory}
          disabled={stories.length <= 1 || showNavigation}
          className={`w-20 h-20 rounded-2xl transform transition-all duration-200 flex items-center justify-center text-2xl font-bold ${
            stories.length <= 1 || showNavigation
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1 cursor-pointer'
          }`}
          style={{
            background: stories.length <= 1 || showNavigation
              ? 'linear-gradient(135deg, #95a5a6, #7f8c8d, #566573)'
              : 'linear-gradient(135deg, #1abc9c, #16a085, #138d75)',
            border: 'none',
            color: 'white',
            boxShadow: stories.length <= 1 || showNavigation
              ? '0 4px 8px rgba(149, 165, 166, 0.3)'
              : `
                  0 8px 15px rgba(26, 188, 156, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
          title="Next Story (Right Arrow)"
        >
          ➡️
        </button>
      </div>

      {/* 3D Navigation Dots */}
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
            className={`w-5 h-5 rounded-full transform transition-all duration-200 border-2 ${
              showNavigation
                ? 'opacity-50 cursor-not-allowed'
                : currentStory === index 
                  ? 'scale-125 shadow-lg cursor-pointer hover:scale-150'
                  : 'cursor-pointer hover:scale-110'
            }`}
            style={{
              background: currentStory === index ? '#fff' : 'transparent',
              borderColor: '#fff',
              boxShadow: currentStory === index 
                ? '0 4px 8px rgba(255, 255, 255, 0.3)'
                : '0 2px 4px rgba(255, 255, 255, 0.1)'
            }}
            title={story.title}
          />
        ))}
      </div>

      {/* Main Story Content */}
      <div className="absolute inset-0 z-50 flex flex-col justify-between p-6 pt-32 pb-32">
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

      {/* Bottom Action Bar with 3D Elements */}
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
            
            <div 
              className="text-sm px-4 py-2 rounded-full font-bold border-2 transform transition-all duration-200"
              style={{
                background: isPaused 
                  ? 'linear-gradient(135deg, #f4d03f, #f39c12, #e67e22)'
                  : 'linear-gradient(135deg, #2ecc71, #27ae60, #229954)',
                borderColor: isPaused ? '#f39c12' : '#27ae60',
                color: isPaused ? '#000' : '#fff',
                boxShadow: isPaused
                  ? '0 4px 8px rgba(243, 156, 18, 0.3)'
                  : '0 4px 8px rgba(46, 204, 113, 0.3)',
                textShadow: isPaused ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {isPaused ? '⏸️ PAUSED' : '▶️ PLAYING'}
            </div>

            <div className="text-white/60 text-xs">
              Progress: {Math.round(storyProgress * 100)}%
            </div>
            
            {/* Secondary Back Button in Bottom Bar */}
            <button
              onClick={handleBackToHome}
              className="text-white/60 hover:text-white text-sm flex items-center space-x-1 transition-all duration-200 transform hover:scale-105 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20"
              style={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span>←</span>
              <span>Back to Stories</span>
            </button>
          </motion.div>

          {stories[currentStory]?.callToAction && (
            <button 
              className="transform transition-all duration-200 hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-1"
              onClick={() => {
                console.log('🎯 CTA clicked:', stories[currentStory].callToAction);
              }}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2, #667eea)',
                border: 'none',
                borderRadius: '50px',
                padding: '16px 32px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: `
                  0 8px 15px rgba(102, 126, 234, 0.4),
                  0 4px 6px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
            >
              {stories[currentStory].callToAction}
            </button>
          )}
        </div>
      </div>

      {/* BULLETPROOF Navigation Menu with 3D Story Cards */}
      <AnimatePresence>
        {showNavigation && (
          <>
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
                        className={`group transform transition-all duration-200 hover:scale-105 hover:-translate-y-2 active:scale-95 active:translate-y-0 rounded-2xl p-6 text-left ${
                          currentStory === index ? 'ring-4 ring-blue-400' : ''
                        }`}
                        style={{
                          background: currentStory === index 
                            ? 'linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.2), rgba(31, 97, 141, 0.2))'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: currentStory === index
                            ? `
                                0 12px 25px rgba(52, 152, 219, 0.3),
                                0 8px 10px rgba(0, 0, 0, 0.2),
                                inset 0 1px 0 rgba(255, 255, 255, 0.2)
                              `
                            : `
                                0 8px 15px rgba(0, 0, 0, 0.2),
                                0 4px 6px rgba(0, 0, 0, 0.1),
                                inset 0 1px 0 rgba(255, 255, 255, 0.1)
                              `
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white font-bold text-xl mb-2 flex items-center group-hover:text-blue-200 transition-colors">
                            {currentStory === index && <span className="mr-2">▶️</span>}
                            {story.title}
                          </h3>
                          {currentStory === index && (
                            <div 
                              className="text-white text-xs px-3 py-1 rounded-full font-bold"
                              style={{
                                background: 'linear-gradient(135deg, #3498db, #2980b9)',
                                boxShadow: '0 2px 4px rgba(52, 152, 219, 0.3)'
                              }}
                            >
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
                          <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                            ▶️
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-center mt-8 text-gray-400 text-sm">
                    <p>Click any story to start • Press ESC to close • RED button in corner to close</p>
                    <p className="text-green-300 mt-2">🌲🐅 Forest Tiger Back Button - Top Center!</p>
                  </div>
                </div>
              </div>

              <div 
                className="absolute inset-0 z-[7900]"
                onClick={handleCloseMenu}
                style={{ pointerEvents: 'auto' }}
              />
            </motion.div>

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

      {/* Tiger Stripe Animation Keyframes */}
      <style jsx>{`
        @keyframes tigerStripes {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 32px 32px;
          }
        }
      `}</style>

      {/* Enhanced DEBUG INFO */}
      <div className="absolute top-32 left-6 z-[100] text-white/70 text-xs bg-black/70 p-3 rounded">
        <p>🔍 <strong>FOREST TIGER DEBUG:</strong></p>
        <p>Story: {currentStory + 1}/{stories.length}</p>
        <p>Progress: {Math.round(storyProgress * 100)}%</p>
        <p>Paused: <span className={isPaused ? 'text-red-400' : 'text-green-400'}>
          {isPaused ? '⏸️ YES' : '▶️ NO'}
        </span></p>
        <p>Menu: <span className={showNavigation ? 'text-blue-400' : 'text-gray-400'}>
          {showNavigation ? '📖 OPEN' : '❌ CLOSED'}
        </span></p>
        <p><span className="text-green-400">🌲 Forest Colors</span></p>
        <p><span className="text-orange-400">🐅 Tiger Stripes</span></p>
        <p><em>MEGA BACK BUTTON: Top Center</em></p>
      </div>
    </div>
  );
};

// Main Component
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
