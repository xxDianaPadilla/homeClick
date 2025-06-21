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
  onFocus,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Registrar el campo y obtener las funciones de react-hook-form
  const registerProps = register(name, validationRules);
  
  // Combinar nuestros handlers con los de react-hook-form
  const combinedProps = {
    ...registerProps,
    onFocus: (e) => {
      if (onFocus) {
        onFocus(e);
      }
      if (registerProps.onFocus) {
        registerProps.onFocus(e);
      }
    },
    onBlur: (e) => {
      if (onBlur) {
        onBlur(e);
      }
      if (registerProps.onBlur) {
        registerProps.onBlur(e);
      }
    }
  };

  return (
    <div className={`auth-input-group ${className}`}>
      <div className="auth-password-container">
        {/* Icono izquierdo */}
        {icon && (
          <div className="auth-input-icon" style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'rgba(255, 255, 255, 0.8)',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}>
            {icon}
          </div>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          className={`auth-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
          disabled={disabled}
          {...combinedProps}
          style={{
            paddingLeft: icon ? '3rem' : '1rem',
            paddingRight: showPasswordToggle ? '3rem' : '1rem'
          }}
          {...props}
        />
        
        {/* Botón para mostrar/ocultar contraseña */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="auth-password-toggle"
            onClick={togglePassword}
            tabIndex={-1}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.8)',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              zIndex: 1
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
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