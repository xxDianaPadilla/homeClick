import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../styles/RecuperarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import ArrowLeftIcon from "../assets/arrowRight.png";
import LockImg from "../assets/LockIcon.png";
import { useNavigate } from 'react-router-dom';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery'; // Hook corregido

function RecuperarContraseña() {
  const navigate = useNavigate();
  const { loading, error, message, requestRecoveryCode } = usePasswordRecovery(); // Función corregida
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
    const result = await requestRecoveryCode(data.email); // Función corregida
    
    if (result.success) {
      setEmailSent(true);
      // Pasar el email al siguiente paso
      setTimeout(() => {
        navigate('/passwordCode', { 
          state: { 
            email: data.email,
            fromPasswordReset: true 
          } 
        });
      }, 2000);
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
      // Si no hay email válido, mostrar error
      alert('Por favor, ingresa un correo electrónico válido primero');
    }
  };

  return (
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

            {/* Mostrar mensajes de error o éxito */}
            {error && (
              <div className="error-message" style={{
                color: '#ff4444',
                backgroundColor: '#ffe6e6',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                textAlign: 'center',
                border: '1px solid #ffcccc'
              }}>
                {error}
              </div>
            )}

            {message && !error && (
              <div className="success-message" style={{
                color: '#28a745',
                backgroundColor: '#e6ffe6',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '15px',
                textAlign: 'center',
                border: '1px solid #ccffcc'
              }}>
                {message}
              </div>
            )}

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
                  <span className="error-text" style={{ color: '#ff4444', fontSize: '14px' }}>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <button 
                className="submit-button4" 
                type="submit"
                disabled={loading}
                style={{
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Enviando...' : 'Enviar código de verificación'}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="success-message" style={{
              color: '#28a745',
              backgroundColor: '#e6ffe6',
              padding: '15px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
              border: '1px solid #ccffcc'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#28a745' }}>¡Código enviado!</h3>
              <p style={{ margin: 0 }}>
                Hemos enviado un código de verificación a tu correo electrónico. 
                Serás redirigido automáticamente...
              </p>
            </div>

            <button 
              className="submit-button4" 
              onClick={handlePasswordCodeClick}
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
    </div>
  );
}

export default RecuperarContraseña;