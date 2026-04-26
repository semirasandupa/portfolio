import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [unrealPhotos, setUnrealPhotos] = useState(() => {
    const saved = localStorage.getItem('unrealPhotos');
    return saved ? JSON.parse(saved) : [
      '/images/showcase/1-min.jpg',
      '/images/showcase/2-min.jpg',
      '/images/showcase/3-min.jpg',
    ];
  });

  const [unityPhotos, setUnityPhotos] = useState(() => {
    const saved = localStorage.getItem('unityPhotos');
    return saved ? JSON.parse(saved) : [
      '/images/showcase/4-min.jpg',
      '/images/showcase/5-min.jpg',
      '/images/showcase/6-min.png',
    ];
  });

  useEffect(() => {
    localStorage.setItem('unrealPhotos', JSON.stringify(unrealPhotos));
  }, [unrealPhotos]);

  useEffect(() => {
    localStorage.setItem('unityPhotos', JSON.stringify(unityPhotos));
  }, [unityPhotos]);

  const addPhoto = (engine, photoUrl) => {
    if (engine === 'unreal') {
      setUnrealPhotos(prev => [...prev, photoUrl]);
    } else {
      setUnityPhotos(prev => [...prev, photoUrl]);
    }
  };

  const removePhoto = (engine, index) => {
    if (engine === 'unreal') {
      setUnrealPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setUnityPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <PortfolioContext.Provider value={{ unrealPhotos, unityPhotos, addPhoto, removePhoto }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
