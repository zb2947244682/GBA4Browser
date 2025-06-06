import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>正在加载模拟器，请稍候...</p>
    </div>
  );
};

export default LoadingSpinner; 