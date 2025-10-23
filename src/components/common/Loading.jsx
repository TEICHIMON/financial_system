import React from 'react';

const Loading = ({ 
  size = 'md', 
  fullScreen = false,
  text = '読み込み中...',
  className = '' 
}) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  
  const sizeClass = sizes[size] || sizes.md;
  
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClass}`}></div>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      {spinner}
    </div>
  );
};

export default Loading;
