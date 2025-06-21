import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import usePasswordRecoveryAlert from '../components/Customers/Hooks/usePasswordRecoveryAlert';
import PasswordRecoveryAlert from '../components/PasswordRecoveryAlert';
import LockImg from "../assets/LockIcon.png";
import ArrowLeftIcon from "../assets/arrowRight.png";

function CambiarContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updatePassword, loading, error, message } = usePasswordRecovery();
  const { alert, showSuccess, showError, hideAlert } = usePasswordRecoveryAlert();
  
  // Estados para controlar la visibilidad de los requisitos
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);

  // Obtener datos del estado de navegación
  const email = location.state?.email;
  const fromCodeVerification = location.state?.fromCodeVerification;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
      <AuthLayout
        title="Cambiar Contraseña"
        subtitle="Crea una nueva contraseña segura para tu cuenta de HomeClick. Asegúrate de que sea fácil de recordar pero difícil de adivinar."
        showBackButton={true}
        onBackClick={handleBackClick}
        backIcon={ArrowLeftIcon}
        showLogo={true}
        logoIcon={LockImg}
      >
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo para nueva contraseña con requisitos dinámicos */}
          <div style={{ position: 'relative' }}>
            <AuthInput
              type="password"
              placeholder="Contraseña nueva"
              register={register}
              name="newPassword"
              validationRules={validationRules.newPassword}
              error={errors.newPassword?.message}
              disabled={loading || isSubmitting}
              showPasswordToggle={true}
              onFocus={() => setIsNewPasswordFocused(true)}
              onBlur={() => {
                // Usar setTimeout para evitar que se cierre antes de que el usuario pueda interactuar
                setTimeout(() => setIsNewPasswordFocused(false), 150);
              }}
            />

            {/* Requisitos de contraseña flotante - solo se muestran cuando está enfocado */}
            {isNewPasswordFocused && watchedPassword && (
              <div 
                className="password-requirements-popup-auth"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: 'auto',
                  marginTop: '8px',
                  minWidth: '300px',
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  borderRadius: '12px',
                  padding: '16px',
                  zIndex: 20,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                  animation: 'slideInFade 0.3s ease-out'
                }}
                onMouseEnter={() => setIsNewPasswordFocused(true)}
                onMouseLeave={() => setIsNewPasswordFocused(false)}
              >
                <div style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  🔐 Requisitos de seguridad
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                  fontSize: '0.8rem',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    background: passwordValidation.minLength 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    boxShadow: passwordValidation.minLength 
                      ? '0 2px 4px rgba(16, 185, 129, 0.3)' 
                      : '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}>
                    {passwordValidation.minLength ? '✓' : '✗'}
                  </div>
                  <span style={{ color: passwordValidation.minLength ? '#86efac' : '#fca5a5' }}>
                    8 caracteres mínimos
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                  fontSize: '0.8rem',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    background: passwordValidation.hasUppercase 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    boxShadow: passwordValidation.hasUppercase 
                      ? '0 2px 4px rgba(16, 185, 129, 0.3)' 
                      : '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}>
                    {passwordValidation.hasUppercase ? '✓' : '✗'}
                  </div>
                  <span style={{ color: passwordValidation.hasUppercase ? '#86efac' : '#fca5a5' }}>
                    Una letra mayúscula
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                  fontSize: '0.8rem',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    background: passwordValidation.hasNumber 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    boxShadow: passwordValidation.hasNumber 
                      ? '0 2px 4px rgba(16, 185, 129, 0.3)' 
                      : '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}>
                    {passwordValidation.hasNumber ? '✓' : '✗'}
                  </div>
                  <span style={{ color: passwordValidation.hasNumber ? '#86efac' : '#fca5a5' }}>
                    Un número
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    background: passwordValidation.hasSpecialChar 
                      ? 'linear-gradient(135deg, #10b981, #059669)' 
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    boxShadow: passwordValidation.hasSpecialChar 
                      ? '0 2px 4px rgba(16, 185, 129, 0.3)' 
                      : '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}>
                    {passwordValidation.hasSpecialChar ? '✓' : '✗'}
                  </div>
                  <span style={{ color: passwordValidation.hasSpecialChar ? '#86efac' : '#fca5a5' }}>
                    Un carácter especial
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Campo para confirmar contraseña */}
          <AuthInput
            type="password"
            placeholder="Repetir contraseña nueva"
            register={register}
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
            error={errors.confirmPassword?.message}
            disabled={loading || isSubmitting}
            showPasswordToggle={true}
          />

          <button 
            className={`auth-button ${passwordValidation?.minLength ? 'success' : ''}`}
            type="submit"
            disabled={loading || isSubmitting || !passwordValidation?.minLength}
          >
            {loading || isSubmitting ? (
              <>
                <div className="auth-loading-spinner" />
                Cambiando contraseña...
              </>
            ) : (
              <>
                <Save size={20} />
                Cambiar contraseña
              </>
            )}
          </button>
        </form>
      </AuthLayout>

      {/* Componente de Alerta */}
      <PasswordRecoveryAlert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={hideAlert}
        autoClose={alert.autoClose}
        duration={alert.duration}
      />

      {/* Estilos CSS en línea para la animación */}
      <style jsx>{`
        @keyframes slideInFade {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}

export default CambiarContrasena;