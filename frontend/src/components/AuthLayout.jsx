import React from 'react';
import '../styles/AuthLayout.css';
import bgImgHouse from '../assets/imgLoginFondo.png';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  showLogo = false, 
  logoIcon,
  showBackButton = false, 
  onBackClick,
  backIcon,
  containerClass = "",
  showTopMargin = true 
}) => {
  return (
    <div className="auth-container">
      <img
        src={bgImgHouse}
        alt="Fondo de casas"
        className="auth-background-image"
      />
      <div className={`auth-form-container ${containerClass} ${showTopMargin ? 'with-top-margin' : ''}`}>
        {showBackButton && (
          <div className="auth-header">
            <button className="auth-back-button" onClick={onBackClick} type="button">
              <img src={backIcon} alt="Volver" />
            </button>
          </div>
        )}

        {showLogo && logoIcon && (
          <div className="auth-logo-container">
            <img src={logoIcon} alt="Logo" className="auth-logo" />
          </div>
        )}

        <div className="auth-content">
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;