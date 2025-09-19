import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Determine device type
      if (width < 640) {
        setDevice('mobile');
      } else if (width < 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = device === 'mobile';
  const isTablet = device === 'tablet';
  const isDesktop = device === 'desktop';

  const breakpoints = {
    sm: screenSize.width >= 640,
    md: screenSize.width >= 768,
    lg: screenSize.width >= 1024,
    xl: screenSize.width >= 1280,
    '2xl': screenSize.width >= 1536
  };

  return {
    screenSize,
    device,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  };
};
