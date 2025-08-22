import { useState, useEffect } from 'react';

// Image optimization utilities

export const getOptimalImageSrc = (basePath, screenWidth) => {
  if (screenWidth <= 640) return `${basePath}-small.jpg`;
  if (screenWidth <= 1280) return `${basePath}-medium.jpg`;
  return `${basePath}.jpg`;
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const useResponsiveImage = (basePath) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const updateImageSrc = () => {
      const newSrc = getOptimalImageSrc(basePath, window.innerWidth);
      setImageSrc(newSrc);
    };

    // Initial load
    updateImageSrc();

    // Update on resize
    const handleResize = () => {
      updateImageSrc();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [basePath]);

  useEffect(() => {
    if (!imageSrc) return;

    setImageLoaded(false);
    setImageError(false);

    preloadImage(imageSrc)
      .then(() => setImageLoaded(true))
      .catch(() => setImageError(true));
  }, [imageSrc]);

  return { imageSrc, imageLoaded, imageError };
};
