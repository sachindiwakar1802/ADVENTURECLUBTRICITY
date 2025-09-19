import { useState, useEffect, useCallback } from 'react';

export const useStoryProgress = (totalStories = 1, autoPlayDuration = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    let interval;
    
    if (isPlaying && !isPaused) {
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
  }, [isPlaying, isPaused, autoPlayDuration, goToNext]);

  return {
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
    toggle
  };
};
