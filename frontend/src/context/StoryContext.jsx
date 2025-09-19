import React, { createContext, useContext, useState, useEffect } from 'react';

const StoryContext = createContext();

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};

export const StoryProvider = ({ children }) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isStoryMode, setIsStoryMode] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    autoplay: true,
    soundEnabled: true,
    preferredDifficulty: 'medium',
    favoriteActivities: []
  });

  const stories = [
    {
      id: 1,
      title: "Himalayan Trek",
      location: "Uttarakhand, India",
      description: "Embark on a thrilling journey through the majestic Himalayas, where snow-capped peaks meet pristine forests.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
      fallbackImage: "https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Himalayan+Trek",
      duration: "7 Days",
      difficulty: "Hard",
      price: 45000,
      rating: 4.8,
      reviews: 234,
      features: ["Professional Guide", "Camping", "Meals Included"],
      category: "trekking",
      season: "March-May, Sept-Nov",
      groupSize: "6-12 people",
      highlights: ["Base Camp Trek", "Sunrise Views", "Local Culture"]
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      location: "Kerala, India", 
      description: "Navigate through serene backwaters surrounded by coconut palms and traditional houseboats.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&crop=center",
      fallbackImage: "https://via.placeholder.com/800x600/059669/FFFFFF?text=Kerala+Backwaters",
      duration: "4 Days",
      difficulty: "Easy", 
      price: 25000,
      rating: 4.6,
      reviews: 156,
      features: ["Houseboat Stay", "Local Cuisine", "Village Visits"],
      category: "cruise",
      season: "Oct-March",
      groupSize: "4-8 people",
      highlights: ["Backwater Cruise", "Ayurveda Spa", "Bird Watching"]
    },
    {
      id: 3,
      title: "Rajasthan Desert Safari",
      location: "Rajasthan, India",
      description: "Experience the golden dunes and starlit nights in the heart of the Thar Desert.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop&crop=center",
      fallbackImage: "https://via.placeholder.com/800x600/F59E0B/FFFFFF?text=Desert+Safari",
      duration: "5 Days",
      difficulty: "Medium",
      price: 35000,
      rating: 4.7,
      reviews: 189,
      features: ["Camel Ride", "Desert Camping", "Folk Music"],
      category: "desert",
      season: "Nov-Feb",
      groupSize: "8-15 people",
      highlights: ["Sand Dunes", "Stargazing", "Cultural Shows"]
    },
    {
      id: 4,
      title: "Goa Beach Paradise",
      location: "Goa, India",
      description: "Relax on pristine beaches with vibrant nightlife and Portuguese colonial charm.",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&crop=center",
      fallbackImage: "https://via.placeholder.com/800x600/0EA5E9/FFFFFF?text=Goa+Beaches",
      duration: "6 Days",
      difficulty: "Easy",
      price: 30000,
      rating: 4.5,
      reviews: 278,
      features: ["Beach Resort", "Water Sports", "Nightlife"],
      category: "beach",
      season: "Nov-March",
      groupSize: "4-12 people",
      highlights: ["Sunset Cruises", "Water Activities", "Local Markets"]
    },
    {
      id: 5,
      title: "Ladakh Adventure",
      location: "Ladakh, India",
      description: "Journey through high-altitude landscapes and ancient Buddhist monasteries.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
      fallbackImage: "https://via.placeholder.com/800x600/7C3AED/FFFFFF?text=Ladakh+Adventure",
      duration: "8 Days",
      difficulty: "Hard",
      price: 55000,
      rating: 4.9,
      reviews: 145,
      features: ["High Altitude", "Monastery Visits", "Photography"],
      category: "adventure",
      season: "May-Sept",
      groupSize: "4-8 people",
      highlights: ["Pangong Lake", "Nubra Valley", "Leh Palace"]
    },
    {
      id: 6,
      title: "Munnar Tea Gardens",
      location: "Kerala, India", 
      description: "Explore lush tea plantations and misty mountains in God's Own Country.",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba871ff?w=800&h=600&fit=crop&crop=center",
      fallbackImage: "https://via.placeholder.com/800x600/10B981/FFFFFF?text=Tea+Gardens",
      duration: "4 Days",
      difficulty: "Easy",
      price: 22000,
      rating: 4.4,
      reviews: 167,
      features: ["Tea Factory Tours", "Nature Walks", "Hill Station"],
      category: "nature",
      season: "Sept-March", 
      groupSize: "6-10 people",
      highlights: ["Tea Tasting", "Elephant Safari", "Spice Gardens"]
    }
  ];

  // Fixed functions with proper callbacks
  const nextStory = React.useCallback(() => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
    setStoryProgress(0);
  }, [stories.length]);

  const prevStory = React.useCallback(() => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    setStoryProgress(0);
  }, [stories.length]);

  const goToStory = React.useCallback((index) => {
    if (index >= 0 && index < stories.length) {
      setCurrentStory(index);
      setStoryProgress(0);
    }
  }, [stories.length]);

  const togglePlay = React.useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const enterStoryMode = React.useCallback((storyIndex = 0) => {
    setCurrentStory(storyIndex);
    setIsStoryMode(true);
    setStoryProgress(0);
    setIsPlaying(true);
  }, []);

  const exitStoryMode = React.useCallback(() => {
    setIsStoryMode(false);
    setIsPlaying(false);
    setStoryProgress(0);
  }, []);

  const handleImageError = React.useCallback((storyId) => {
    setImageErrors(prev => ({
      ...prev,
      [storyId]: true
    }));
  }, []);

  // Fixed useEffect with proper dependencies
  useEffect(() => {
    let interval;
    if (isPlaying && userPreferences.autoplay && isStoryMode) {
      interval = setInterval(() => {
        setStoryProgress(prev => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 0.5;
        });
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, userPreferences.autoplay, isStoryMode, nextStory]);

  useEffect(() => {
    setStoryProgress(0);
  }, [currentStory]);

  const value = {
    stories,
    currentStory,
    isPlaying,
    storyProgress,
    userPreferences,
    imageErrors,
    isStoryMode,
    nextStory,
    prevStory,
    goToStory,
    togglePlay,
    enterStoryMode,
    exitStoryMode,
    setStoryProgress,
    handleImageError,
    getCurrentStory: () => stories[currentStory],
    hasNextStory: () => currentStory < stories.length - 1,
    hasPrevStory: () => currentStory > 0,
    getStoryImage: (story) => imageErrors[story.id] ? story.fallbackImage : story.image
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
};

// HOME PAGE Component
export const HomePage = () => {
  const { stories, enterStoryMode } = useStory();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#333',
          marginBottom: '10px'
        }}>
          🌍 Travel Stories
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Discover amazing destinations and adventures. Tap any story to start exploring!
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {stories.map((story, index) => (
          <div 
            key={story.id}
            onClick={() => enterStoryMode(index)}
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ position: 'relative' }}>
              <img 
                src={story.image}
                alt={story.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {story.difficulty}
              </div>
            </div>
            
            <div style={{ padding: '20px' }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '20px',
                color: '#333'
              }}>
                {story.title}
              </h3>
              <p style={{ 
                margin: '0 0 12px 0', 
                color: '#666',
                fontSize: '14px'
              }}>
                📍 {story.location}
              </p>
              <p style={{ 
                margin: '0 0 16px 0', 
                color: '#777',
                fontSize: '14px',
                lineHeight: '1.4'
              }}>
                {story.description}
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #eee',
                paddingTop: '16px'
              }}>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  <span>⏱️ {story.duration}</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                  ₹{story.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// FIXED Story Display Component
export const StoryDisplay = () => {
  const { 
    getCurrentStory, 
    nextStory, 
    prevStory, 
    togglePlay, 
    isPlaying, 
    storyProgress,
    handleImageError,
    getStoryImage,
    hasNextStory,
    hasPrevStory,
    currentStory,
    stories,
    exitStoryMode
  } = useStory();

  const currentStoryData = getCurrentStory();

  // Fixed event handlers
  const handleLeftTap = React.useCallback(() => {
    if (hasPrevStory()) {
      prevStory();
    }
  }, [hasPrevStory, prevStory]);

  const handleRightTap = React.useCallback(() => {
    if (hasNextStory()) {
      nextStory();
    }
  }, [hasNextStory, nextStory]);

  const handleExitStoryMode = React.useCallback(() => {
    console.log('Exit button clicked'); // Debug log
    exitStoryMode();
  }, [exitStoryMode]);

  const handleTogglePlay = React.useCallback(() => {
    console.log('Play/Pause clicked, current state:', isPlaying); // Debug log
    togglePlay();
  }, [togglePlay, isPlaying]);

  // Fixed useEffect with proper cleanup
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        exitStoryMode();
      }
    };

    const handlePopState = () => {
      exitStoryMode();
    };

    // Add browser back button functionality
    window.history.pushState({ storyMode: true }, '', window.location.pathname);
    
    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [exitStoryMode]);

  if (!currentStoryData) {
    return <div>Loading...</div>; // Safety check
  }

  return (
    <div className="story-container" style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#000',
      borderRadius: '12px',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* Progress Bar */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '90px',
        height: '4px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '2px',
        zIndex: 20,
        display: 'flex',
        gap: '2px'
      }}>
        {stories.map((_, index) => (
          <div 
            key={index}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: index < currentStory ? '#fff' : 
                              index === currentStory ? 'rgba(255,255,255,0.5)' : 
                              'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {index === currentStory && (
              <div style={{
                height: '100%',
                width: `${storyProgress}%`,
                backgroundColor: '#fff',
                borderRadius: '2px',
                transition: 'width 0.05s ease'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* RED EXIT BUTTON - Top Right */}
      <button 
        onClick={handleExitStoryMode}
        style={{
          position: 'absolute',
          top: '6px',
          right: '8px',
          background: 'linear-gradient(135deg, #dc3545, #c82333)',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          color: 'white',
          zIndex: 30,
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(220, 53, 69, 0.4)',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #c82333, #a71e2a)';
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 53, 69, 0.4)';
        }}
        title="Back to Home"
      >
        ← Home
      </button>

      {/* FIXED Play/Pause Button */}
      <button 
        onClick={handleTogglePlay}
        style={{
          position: 'absolute',
          top: '25px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          border: '2px solid rgba(255,255,255,0.9)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          zIndex: 25,
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.9)';
          e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.8)';
          e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
        }}
      >
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>

      {/* Tap Areas */}
      <div 
        onClick={handleLeftTap}
        style={{
          position: 'absolute',
          left: 0,
          top: 60,
          bottom: 0,
          width: '40%',
          zIndex: 15,
          cursor: hasPrevStory() ? 'pointer' : 'default',
          background: 'transparent'
        }}
      />
      
      <div 
        onClick={handleRightTap}
        style={{
          position: 'absolute',
          right: 0,
          top: 60,
          bottom: 0,
          width: '40%',
          zIndex: 15,
          cursor: hasNextStory() ? 'pointer' : 'default',
          background: 'transparent'
        }}
      />

      {/* Story Image */}
      <img
        src={getStoryImage(currentStoryData)}
        alt={currentStoryData.title}
        onError={() => handleImageError(currentStoryData.id)}
        style={{
          width: '100%',
          height: '600px',
          objectFit: 'cover',
          display: 'block'
        }}
      />

      {/* Story Content */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
        color: 'white',
        padding: '60px 20px 30px',
        zIndex: 10
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
          {currentStoryData.title}
        </h2>
        <p style={{ margin: '0 0 12px 0', opacity: 0.9 }}>
          📍 {currentStoryData.location}
        </p>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: '1.4' }}>
          {currentStoryData.description}
        </p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', opacity: 0.8 }}>
          <span>⏱️ {currentStoryData.duration}</span>
          <span>🏔️ {currentStoryData.difficulty}</span>
          <span>💰 ₹{currentStoryData.price.toLocaleString()}</span>
        </div>
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
        {currentStory + 1} / {stories.length}
      </div>
    </div>
  );
};

// Main App Component 
export const App = () => {
  const { isStoryMode } = useStory();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: isStoryMode ? '#000' : '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isStoryMode ? '0' : '20px'
    }}>
      {isStoryMode ? <StoryDisplay /> : <HomePage />}
    </div>
  );
};

// Wrap the entire app with StoryProvider
export default () => (
  <StoryProvider>
    <App />
  </StoryProvider>
);
