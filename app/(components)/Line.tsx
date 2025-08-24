import React from 'react';

type LineProps = {
  variant?: 'full' | 'half';
  className?: string;
};

const Line: React.FC<LineProps> = ({ variant = 'full', className = '' }) => {
  const widthClass = variant === 'half' ? 'w-1/2' : 'w-full';
  return (
    <div className={`bg-gray-200 h-1 rounded ${widthClass} ${className}`} />
  );
};

export default Line;
