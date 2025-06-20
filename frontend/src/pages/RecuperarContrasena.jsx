import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../styles/RecuperarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import ArrowLeftIcon from "../assets/arrowRight.png";
import LockImg from "../assets/LockIcon.png";
import { useNavigate } from 'react-router-dom';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import usePasswordRecoveryAlert from '../components/Customers/Hooks/usePasswordRecoveryAlert';
import PasswordRecoveryAlert from '../components/PasswordRecoveryAlert';

function RecuperarContraseña() {
  const navigate = useNavigate();
  const { loading, requestRecoveryCode } = usePasswordRecovery();
  const { alert, showSuccess, showError, hideAlert } = usePasswordRecoveryAlert();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  });

  const validationRules = {
    email: {
      required: 'El correo electrónico es requerido',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'El correo electrónico no es válido'
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  const onSubmit = async (data) => {
    const result = await requestRecoveryCode(data.email);
    
    if (result.success) {
      setEmailSent(true);
      showSuccess('¡Código enviado exitosamente! Revisa tu correo electrónico.', {
        duration: 3000
      });
      
      // Pasar el email al siguiente paso
      setTimeout(() => {
        navigate('/passwordCode', { 
          state: { 
            email: data.email,
            fromPasswordReset: true 
          } 
        });
      }, 2000);
    } else {
      showError(result.message || 'Error al enviar el código de verificación');
    }
  };

  const handlePasswordCodeClick = () => {
    const email = getValues('email');
    if (email && !errors.email) {
      navigate('/passwordCode', { 
        state: { 
          email: email,
          fromPasswordReset: true 
        } 
      });
    } else {
      showError('Por favor, ingresa un correo electrónico válido primero');
    }
  };

  return (
    <>
      <div className="landing-container">
        <img
          src={bgImgHouse}
          alt="Row of Victorian houses with warm sunlight and clear sky"
          className="background-image"
        />
        <div className="form-container2">
          <div className="header">
            <button className="back-button" onClick={handleLoginClick}>
              <img src={ArrowLeftIcon} alt="Volver" className="back-icon" />
            </button>
          </div>

          <div className="lock-icon-container2">
            <img src={LockImg} alt="Icono de seguridad" className="lock-icon" />
          </div>

          <h1 className="form-title4">¿Tienes problemas para iniciar sesión?</h1>
          
          {!emailSent ? (
            <>
              <p className="form-description">
                Ingresa tu correo electrónico y te enviaremos un código
                para que recuperes el acceso a tu cuenta
              </p>

              <form className="reset-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className={`text-input ${errors.email ? 'input-error' : ''}`}
                    disabled={loading}
                    {...register('email', validationRules.email)}
                  />
                  {errors.email && (
                    <span className="error-text-improved">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <button 
                  className="submit-button4" 
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <span className="loading-spinner-inline"></span>
                  )}
                  {loading ? 'Enviando...' : 'Enviar código de verificación'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="success-container">
                <div className="success-icon">
                  ✓
                </div>
                <h3 className="success-title">
                  ¡Código enviado!
                </h3>
                <p className="success-description">
                  Hemos enviado un código de verificación a tu correo electrónico. 
                  Serás redirigido automáticamente...
                </p>
              </div>

              <button 
                className="submit-button4 success-button" 
                onClick={handlePasswordCodeClick}
              >
                Continuar con la verificación
              </button>
            </>
          )}

          <div className="or-separator">
            <span className="separator-line"></span>
            <strong className="separator-text">O</strong>
            <span className="separator-line"></span>
          </div>
          
          <div className="create-account">
            <a href="/registro" className="create-account-link">
              <strong>Crear cuenta nueva</strong>
            </a>
          </div>
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

export default RecuperarContraseña;