import React from 'react';

const IconButton = ({ 
  children, 
  onClick, 
  icon: Icon,
  iconSize = 20,
  className = '', 
  variant = 'primary',
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300';
  
  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={finalClassName}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={iconSize} />}
      <span>{children}</span>
    </button>
  );
};

export default IconButton;