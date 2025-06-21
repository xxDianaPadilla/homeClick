import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const EnhancedInput = ({
  type = "text",
  placeholder,
  register,
  name,
  validationRules,
  error,
  disabled = false,
  showPasswordToggle = false,
  label,
  icon,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle && type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`field-group ${className}`}>
      {label && (
        <div className="field-label">
          {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
          {label}
        </div>
      )}
      
      <div style={{ position: 'relative' }}>
        <input
          type={inputType}
          placeholder={placeholder}
          className={`enhanced-input ${error ? 'field-error' : ''}`}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...register(name, validationRules)}
          style={{
            paddingRight: showPasswordToggle ? '50px' : '16px'
          }}
          {...props}
        />
        
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.7)',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '6px',
          color: '#fca5a5',
          fontSize: '0.8rem',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default EnhancedInput;