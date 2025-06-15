const OrangeButton = ({ 
  children, 
  onClick, 
  className = '', 
  centered = false,
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'orange-button';
  const centeredClass = centered ? 'centered-button' : '';
  const finalClassName = `${baseClasses} ${centeredClass} ${className}`;
  
  return (
    <button
      type={type}
      className={finalClassName}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default OrangeButton;