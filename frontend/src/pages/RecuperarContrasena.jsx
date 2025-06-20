import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../styles/RecuperarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import ArrowLeftIcon from "../assets/arrowRight.png";
import LockImg from "../assets/LockIcon.png";
import { useNavigate } from 'react-router-dom';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import useAlert from '../components/Customers/Hooks/useAlert';
import AlertMessage from '../components/AlertMessage';

function RecuperarContraseña() {
  const navigate = useNavigate();
  const { loading, requestRecoveryCode } = usePasswordRecovery();
  const { alert, showSuccess, showError, hideAlert } = useAlert();
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
                    className={`text-input ${errors.email ? 'error' : ''}`}
                    disabled={loading}
                    {...register('email', validationRules.email)}
                  />
                  {errors.email && (
                    <span className="error-text" style={{ 
                      color: '#dc3545', 
                      fontSize: '13px',
                      display: 'block',
                      marginTop: '5px',
                      marginLeft: '2px'
                    }}>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <button 
                  className="submit-button4" 
                  type="submit"
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {loading && (
                    <span style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      border: '2px solid #ffffff40',
                      borderTop: '2px solid #fff',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '8px'
                    }}></span>
                  )}
                  {loading ? 'Enviando...' : 'Enviar código de verificación'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="success-container" style={{
                backgroundColor: '#d4edda',
                border: '1px solid #c3e6cb',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#28a745',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 15px auto',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
                <h3 style={{ margin: '0 0 10px 0', color: '#155724', fontSize: '18px' }}>
                  ¡Código enviado!
                </h3>
                <p style={{ margin: 0, color: '#155724', fontSize: '14px' }}>
                  Hemos enviado un código de verificación a tu correo electrónico. 
                  Serás redirigido automáticamente...
                </p>
              </div>

              <button 
                className="submit-button4" 
                onClick={handlePasswordCodeClick}
                style={{
                  backgroundColor: '#28a745',
                  borderColor: '#28a745'
                }}
              >
                Continuar con la verificación
              </button>
            </>
          )}

          <div className="or-separator">
            <hr /> &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; 
            <strong>O</strong> &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; 
            <hr />
          </div>
          
          <div className="create-account">
            <a href="/registro" className="create-account-link">
              <strong>Crear cuenta nueva</strong>
            </a>
          </div>
        </div>

        {/* Estilos para la animación */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* Componente de Alerta */}
      <AlertMessage
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