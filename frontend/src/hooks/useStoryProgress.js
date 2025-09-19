import { useState, useEffect, useCallback } from 'react';

export const useStoryProgress = (totalStories = 1, autoPlayDuration = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // NEW: State for story mode vs home page
  const [isStoryMode, setIsStoryMode] = useState(false);
  
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalStories);
    setProgress(0);
  }, [totalStories]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalStories) % totalStories);
    setProgress(0);
  }, [totalStories]);

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index);
    setProgress(0);
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const stop = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying && !isPaused) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, isPaused, play, pause]);

  // NEW: Enter story mode function
  const enterStoryMode = useCallback((startIndex = 0) => {
    setCurrentIndex(startIndex);
    setIsStoryMode(true);
    setProgress(0);
    setIsPlaying(true);
    setIsPaused(false);
    
    // Add story mode to browser history
    window.history.pushState({ storyMode: true }, '', window.location.pathname);
  }, []);

  // NEW: Exit story mode and return to home
  const exitStoryMode = useCallback(() => {
    setIsStoryMode(false);
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentIndex(0);
  }, []);

  // NEW: Go back to home page
  const goBackToHome = useCallback(() => {
    console.log('Going back to home page'); // Debug log
    exitStoryMode();
  }, [exitStoryMode]);

  // Auto-play progress effect
  useEffect(() => {
    let interval;
    
    if (isPlaying && !isPaused && isStoryMode) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (autoPlayDuration / 100));
          
          if (newProgress >= 100) {
            goToNext();
            return 0;
          }
          
          return newProgress;
        });
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isPaused, isStoryMode, autoPlayDuration, goToNext]);

  // NEW: Browser back button handler
  useEffect(() => {
    const handlePopState = (event) => {
      if (isStoryMode) {
        console.log('Browser back button pressed in story mode'); // Debug log
        exitStoryMode();
        
        // Prevent default browser back behavior
        event.preventDefault();
        return false;
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Escape' && isStoryMode) {
        console.log('Escape key pressed'); // Debug log
        exitStoryMode();
      }
    };

    // Only add listeners when in story mode
    if (isStoryMode) {
      window.addEventListener('popstate', handlePopState);
      document.addEventListener('keydown', handleKeyPress);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
        document.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isStoryMode, exitStoryMode]);

  // NEW: Auto-exit story mode when no stories
  useEffect(() => {
    if (totalStories === 0 && isStoryMode) {
      exitStoryMode();
    }
  }, [totalStories, isStoryMode, exitStoryMode]);

  return {
    // Original returns
    currentIndex,
    progress,
    isPlaying,
    isPaused,
    goToNext,
    goToPrev,
    goToIndex,
    play,
    pause,
    stop,
    toggle,
    
    // NEW: Back button and story mode functionality
    isStoryMode,
    enterStoryMode,
    exitStoryMode,
    goBackToHome,
    
    // NEW: Utility functions
    hasNext: currentIndex < totalStories - 1,
    hasPrev: currentIndex > 0,
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalStories - 1,
    
    // NEW: Story mode helpers
    totalStories,
    getCurrentStory: () => currentIndex,
    getProgressPercent: () => Math.round(progress),
  };
};

// NEW: Example usage component
export const StoryViewer = ({ stories = [] }) => {
  const storyHook = useStoryProgress(stories.length, 5000);

  const {
    currentIndex,
    progress,
    isPlaying,
    isPaused,
    isStoryMode,
    enterStoryMode,
    exitStoryMode,
    goBackToHome,
    toggle,
    goToNext,
    goToPrev,
    hasNext,
    hasPrev
  } = storyHook;

  if (!isStoryMode) {
    // HOME PAGE VIEW
    return (
      <div style={{ padding: '20px' }}>
        <h1>🌍 Travel Stories</h1>
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {stories.map((story, index) => (
            <div
              key={story.id}
              onClick={() => enterStoryMode(index)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <img src={story.image} alt={story.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
              <h3>{story.title}</h3>
              <p>{story.location}</p>
              <p>{story.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STORY MODE VIEW
  const currentStory = stories[currentIndex];

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '400px', 
      margin: '0 auto',
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '2px', padding: '10px', position: 'absolute', top: 0, left: 0, right: 80, zIndex: 20 }}>
        {stories.map((_, index) => (
          <div key={index} style={{ flex: 1, height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%',
              backgroundColor: '#fff',
              transition: 'width 0.1s ease'
            }} />
          </div>
        ))}
      </div>

      {/* RED BACK BUTTON */}
      <button
        onClick={goBackToHome}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'linear-gradient(135deg, #dc3545, #c82333)',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'pointer',
          zIndex: 30,
          boxShadow: '0 2px 8px rgba(220, 53, 69, 0.4)',
        }}
        title="Back to Home"
      >
        ← Home
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={toggle}
        style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          border: '2px solid white',
          borderRadius: '20px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 25,
        }}
      >
        {isPlaying && !isPaused ? '⏸️ Pause' : '▶️ Play'}
      </button>

      {/* Navigation Areas */}
      {hasPrev && (
        <div onClick={goToPrev} style={{ position: 'absolute', left: 0, top: 60, bottom: 0, width: '40%', zIndex: 15, cursor: 'pointer' }} />
      )}
      {hasNext && (
        <div onClick={goToNext} style={{ position: 'absolute', right: 0, top: 60, bottom: 0, width: '40%', zIndex: 15, cursor: 'pointer' }} />
      )}

      {/* Story Content */}
      <img src={currentStory?.image} alt={currentStory?.title} style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
        color: 'white',
        padding: '60px 20px 30px',
        zIndex: 10
      }}>
        <h2 style={{ margin: '0 0 8px 0' }}>{currentStory?.title}</h2>
        <p style={{ margin: '0 0 8px 0', opacity: 0.9 }}>📍 {currentStory?.location}</p>
        <p style={{ margin: 0, fontSize: '14px' }}>{currentStory?.description}</p>
      </div>

      {/* Story Counter */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '15px',
        fontSize: '12px',
        zIndex: 20
      }}>
        {currentIndex + 1} / {stories.length}
      </div>
    </div>
  );
};
