// components/LoadingScreen.jsx
import React from 'react';
import './CSS/loading_screen.css'; // CSS below

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
