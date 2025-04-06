'use client';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
const getWindowSize = () => {
  return {
    width: window?.innerWidth || 375,
    height: window?.innerHeight || 600,
  };
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 375,
    height: 600,
  });
  const debouncedWindowSize = debounce(() => {
    setWindowSize(getWindowSize());
  }, 300);
  useEffect(() => {
    setWindowSize(getWindowSize());
  }, []);
  useEffect(() => {
    window?.addEventListener('resize', debouncedWindowSize);
    return () => window?.removeEventListener('resize', debouncedWindowSize);
  }, []);

  return windowSize;
};
