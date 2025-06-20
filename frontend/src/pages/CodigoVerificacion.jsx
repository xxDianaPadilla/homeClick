import React, { useState, useEffect } from 'react';
import "../styles/CodigoVerificacion.css";
import bgImgHouseF from "../assets/imgLoginFondo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import useCodeVerification from '../components/Customers/Hooks/useCodeVerification';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import usePasswordRecoveryAlert from '../components/Customers/Hooks/usePasswordRecoveryAlert';
import PasswordRecoveryAlert from '../components/PasswordRecoveryAlert';

function CodigoVerificacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyRecoveryCode, loading } = usePasswordRecovery();
  const { alert, showSuccess, showError, showWarning, hideAlert } = usePasswordRecoveryAlert();
  
  // Obtener email del estado de navegación
  const email = location.state?.email;
  const fromPasswordReset = location.state?.fromPasswordReset;

  const {
    code,
    inputRefs,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeString,
    isCodeComplete,
    clearCode
  } = useCodeVerification(5);

  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos
  const [canResend, setCanResend] = useState(false);

  // Redireccionar si no hay email
  useEffect(() => {
    if (!email || !fromPasswordReset) {
      navigate('/recuperarContrasena');
    }
  }, [email, fromPasswordReset, navigate]);

  // Contador regresivo
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
      showWarning('El código ha expirado. Puedes solicitar uno nuevo.', {
        autoClose: false
      });
    }
  }, [timeLeft, showWarning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!isCodeComplete()) {
      showError('Por favor, completa el código de 5 dígitos');
      return;
    }

    const codeString = getCodeString();
    const result = await verifyRecoveryCode(codeString);

    if (result.success) {
      showSuccess('¡Código verificado correctamente!', { duration: 2000 });
      
      setTimeout(() => {
        navigate('/changePassword', {
          state: {
            email: email,
            fromCodeVerification: true
          }
        });
      }, 1500);
    } else {
      showError(result.message || 'Código de verificación inválido');
      clearCode();
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    navigate('/recuperarContrasena');
  };

  const handleBackClick = () => {
    navigate('/recuperarContrasena');
  };

  if (!email) {
    return null;
  }

  return (
    <>
      <div className="verification-container-1">
        <img
          src={bgImgHouseF}
          alt="Row of Victorian houses with warm sunlight and clear sky"
          className="background-image-2"
        />
        <div className="verification-form">
          <h1 className="heading-4">Verificación de Correo</h1>
          <p className="verification-text-5">
            Hemos enviado un código de verificación de <strong>5 dígitos</strong> a<br />
            <strong className="email-highlight">{email}</strong><br />
            Por favor, ingresa el código para continuar.
          </p>

          <form className="verification-form-6" onSubmit={handleVerifyCode}>
            {/* Nueva interfaz de código compacta */}
            <div className="code-input-container-compact">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = { current: el }}
                  className={`code-input-compact ${digit ? 'filled' : ''} ${timeLeft === 0 ? 'expired' : ''}`}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  disabled={loading || timeLeft === 0}
                />
              ))}
            </div>

            {/* Información del temporizador */}
            <div className={`timer-info-traditional ${timeLeft <= 300 ? 'warning' : ''} ${timeLeft === 0 ? 'expired' : ''}`}>
              {timeLeft > 0 ? (
                <p>
                  <span className="timer-label">Tiempo restante:</span>
                  <span className="timer-value">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <p className="timer-expired">
                  El código ha expirado. Solicita uno nuevo.
                </p>
              )}
            </div>

            <button 
              className={`verification-button-traditional ${isCodeComplete() && timeLeft > 0 ? 'ready' : ''}`}
              type="submit"
              disabled={loading || !isCodeComplete() || timeLeft === 0}
            >
              {loading && (
                <span className="loading-spinner-inline"></span>
              )}
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>

            {/* Sección de reenvío */}
            <div className="resend-section-traditional">
              {!canResend ? (
                <p className="resend-text-traditional">
                  ¿No recibiste el código? Podrás solicitar uno nuevo en{' '}
                  <span className="countdown-timer">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              ) : (
                <div className="resend-container-traditional">
                  <p className="resend-expired-text">
                    ¿No recibiste el código?
                  </p>
                  <button 
                    type="button"
                    onClick={handleResendCode}
                    className="resend-button-traditional"
                  >
                    Solicitar nuevo código
                  </button>
                </div>
              )}
            </div>

            <div className="back-link-container">
              <button 
                type="button"
                onClick={handleBackClick}
                className="back-link"
              >
                ← Volver a ingresar correo
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Solo la alerta superior derecha */}
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

export default CodigoVerificacion;