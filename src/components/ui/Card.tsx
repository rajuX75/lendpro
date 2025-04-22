import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hover = false,
}) => {
  const hoverClasses = hover 
    ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' 
    : '';
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm p-4 transition-all duration-200 animate-scale-in ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;