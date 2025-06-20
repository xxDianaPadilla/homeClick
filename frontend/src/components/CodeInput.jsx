import React from 'react';

const CodeInput = ({ 
  code, 
  inputRefs, 
  onInputChange, 
  onKeyDown, 
  onPaste, 
  disabled = false, 
  error = false,
  className = "" 
}) => {
  return (
    <div className={`code-input-container ${className} ${error ? 'error' : ''}`}>
      {code.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = { current: el }}
          className={`code-input ${digit ? 'filled' : ''} ${error ? 'error' : ''}`}
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
        />
      ))}
    </div>
  );
};

export default CodeInput;