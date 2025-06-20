import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import "../styles/CambiarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import LockIcon from "../components/LockIconCC.jsx";
import { useNavigate, useLocation } from 'react-router-dom';
import usePasswordToggle from '../components/Customers/Hooks/usePasswordToggle';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import usePasswordRecoveryAlert from '../components/Customers/Hooks/usePasswordRecoveryAlert';
import PasswordRecoveryAlert from '../components/PasswordRecoveryAlert';

function CambiarContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { updatePassword, loading, error, message } = usePasswordRecovery();
  const { alert, showSuccess, showError, hideAlert } = usePasswordRecoveryAlert();

  // Obtener datos del estado de navegación
  const email = location.state?.email;
  const fromCodeVerification = location.state?.fromCodeVerification;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const watchedPassword = watch('newPassword', '');

  // Redireccionar si no hay datos necesarios
  useEffect(() => {
    if (!email || !fromCodeVerification) {
      navigate('/recuperarContrasena');
    }
  }, [email, fromCodeVerification, navigate]);

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength
    };
  };

  const passwordValidation = validatePassword(watchedPassword);

  const validationRules = {
    newPassword: {
      required: 'La nueva contraseña es requerida',
      minLength: {
        value: 6,
        message: 'La contraseña debe tener al menos 6 caracteres'
      }
    },
    confirmPassword: {
      required: 'Confirma tu nueva contraseña',
      validate: (value) => {
        return value === watchedPassword || 'Las contraseñas no coinciden';
      }
    }
  };

  const onSubmit = async (data) => {
    const result = await updatePassword(data.newPassword);

    if (result.success) {
      showSuccess('¡Contraseña cambiada exitosamente!', { duration: 2000 });
      
      setTimeout(() => {
        navigate('/changedPassword', {
          state: {
            fromPasswordReset: true,
            message: 'Tu contraseña ha sido cambiada exitosamente'
          }
        });
      }, 1500);
    } else {
      showError(result.message || 'Error al cambiar la contraseña');
    }
  };

  const handleBackClick = () => {
    navigate('/passwordCode', {
      state: {
        email: email,
        fromPasswordReset: true
      }
    });
  };

  if (!email) {
    return null;
  }

  return (
    <>
      <div className="landing-container">
        <img
          src={bgImgHouse}
          alt="Row of Victorian houses with warm sunlight and clear sky"
          className="background-image"
        />
        <div className="form-container2">
          <LockIcon />
          <h1 className="form-title">Cambiar Contraseña</h1>
          <p className="form-description">
            Crea una nueva contraseña segura para tu cuenta de HomeClick.
            Asegúrate de que sea fácil de recordar pero difícil de adivinar.
          </p>

          <form className="change-password-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo para nueva contraseña */}
            <div className="input-group-enhanced">
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña nueva"
                  className={`text-input ${errors.newPassword ? 'input-error' : ''}`}
                  disabled={loading}
                  {...register('newPassword', validationRules.newPassword)}
                />
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    ) : (
                      <>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                      </>
                    )}
                  </svg>
                </span>
              </div>
              {errors.newPassword && (
                <span className="error-text-improved">
                  {errors.newPassword.message}
                </span>
              )}

              {/* Indicadores de requisitos de contraseña */}
              <div className="password-requirements-enhanced">
                <p className="requirements-title">
                  Requisitos de contraseña:
                </p>
                <div className="requirements-grid">
                  <div className={`requirement-item ${passwordValidation?.minLength ? 'valid' : 'invalid'}`}>
                    <span className="requirement-icon">
                      {passwordValidation?.minLength ? '✓' : '✗'}
                    </span>
                    <span className="requirement-text">Al menos 6 caracteres</span>
                  </div>
                  <div className={`requirement-item ${passwordValidation?.hasUppercase ? 'valid' : 'neutral'}`}>
                    <span className="requirement-icon">
                      {passwordValidation?.hasUppercase ? '✓' : '○'}
                    </span>
                    <span className="requirement-text">Una letra mayúscula (recomendado)</span>
                  </div>
                  <div className={`requirement-item ${passwordValidation?.hasNumber ? 'valid' : 'neutral'}`}>
                    <span className="requirement-icon">
                      {passwordValidation?.hasNumber ? '✓' : '○'}
                    </span>
                    <span className="requirement-text">Un número (recomendado)</span>
                  </div>
                  <div className={`requirement-item ${passwordValidation?.hasSpecialChar ? 'valid' : 'neutral'}`}>
                    <span className="requirement-icon">
                      {passwordValidation?.hasSpecialChar ? '✓' : '○'}
                    </span>
                    <span className="requirement-text">Un carácter especial (recomendado)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campo para confirmar contraseña */}
            <div className="input-group-enhanced">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Repetir contraseña nueva"
                className={`text-input ${errors.confirmPassword ? 'input-error' : ''}`}
                disabled={loading}
                {...register('confirmPassword', validationRules.confirmPassword)}
              />
              {errors.confirmPassword && (
                <span className="error-text-improved">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button 
              className={`submit-button4 ${passwordValidation?.minLength ? 'ready' : ''}`}
              type="submit"
              disabled={loading || !passwordValidation?.minLength}
            >
              {loading && (
                <span className="loading-spinner-inline"></span>
              )}
              {loading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
            </button>

            <div className="back-link-container">
              <button 
                type="button"
                onClick={handleBackClick}
                disabled={loading}
                className="back-link"
              >
                ← Volver al código de verificación
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Componente de Alerta */}
      <PasswordRecoveryAlert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={hideAlert}
        autoClose={alert.autoClose}
        duration={alert.duration}
      />
    </>
  );
}

export default CambiarContrasena;