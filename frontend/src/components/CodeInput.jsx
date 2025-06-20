import React from 'react';

const CodeInput = ({ 
  code, 
  inputRefs, 
  onInputChange, 
  onKeyDown, 
  onPaste, 
  disabled = false, 
  error = false,
  className = "",
  length = 5
}) => {
  return (
    <div 
      className={`code-input-container ${className} ${error ? 'error' : ''}`}
      style={{
        display: 'flex',
        gap: '0.75rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {code.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = { current: el }}
          className={`code-input ${digit ? 'filled' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
          maxLength="1"
          value={digit}
          onChange={(e) => onInputChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          onPaste={index === 0 ? onPaste : undefined}
          disabled={disabled}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          style={{
            width: '3rem',
            height: '3rem',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            border: `2px solid ${error ? '#ef4444' : digit ? '#10b981' : 'rgba(255, 255, 255, 0.4)'}`,
            borderRadius: '8px',
            backgroundColor: error ? 'rgba(239, 68, 68, 0.1)' : digit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: 'Courier New, monospace',
            backdropFilter: 'blur(5px)',
            ...(disabled && {
              opacity: 0.5,
              cursor: 'not-allowed'
            })
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.borderColor = '#60a5fa';
              e.target.style.boxShadow = '0 0 0 3px rgba(96, 165, 250, 0.2)';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? '#ef4444' : digit ? '#10b981' : 'rgba(255, 255, 255, 0.4)';
            e.target.style.boxShadow = 'none';
            e.target.style.transform = 'scale(1)';
          }}
        />
      ))}
    </div>
  );
};

export default CodeInput;