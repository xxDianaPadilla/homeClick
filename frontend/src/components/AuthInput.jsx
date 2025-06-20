import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const AuthInput = ({
  type = "text",
  placeholder,
  register,
  name,
  validationRules,
  error,
  success,
  disabled = false,
  className = "",
  icon,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`auth-input-group ${className}`}>
      <div className="auth-password-container">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`auth-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
          disabled={disabled}
          {...register(name, validationRules)}
          {...props}
        />
        
        {icon && (
          <div className="auth-input-icon">
            {icon}
          </div>
        )}
        
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="auth-password-toggle"
            onClick={togglePassword}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <div className="auth-error-message">
          <AlertCircle className="auth-error-icon" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="auth-success-message">
          <CheckCircle className="auth-error-icon" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};

export default AuthInput;