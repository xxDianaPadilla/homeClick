import React, { useState, useEffect } from 'react';
import "../styles/CodigoVerificacion.css";
import bgImgHouseF from "../assets/imgLoginFondo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import useCodeVerification from '../components/Customers/Hooks/useCodeVerification';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery'; // Hook corregido

function CodigoVerificacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyRecoveryCode, loading, error, message } = usePasswordRecovery(); // Función corregida
  
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
  } = useCodeVerification(5); // Cambiado a 5 dígitos según tu backend

  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos en segundos (según tu backend)
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
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!isCodeComplete()) {
      alert('Por favor, completa el código de 5 dígitos');
      return;
    }

    const codeString = getCodeString();
    const result = await verifyRecoveryCode(codeString); // Función corregida

    if (result.success) {
      // Navegar a cambiar contraseña
      navigate('/changePassword', {
        state: {
          email: email,
          fromCodeVerification: true
        }
      });
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    // Recargar la página de recuperar contraseña para enviar nuevo código
    navigate('/recuperarContrasena');
  };

  const handleBackClick = () => {
    navigate('/recuperarContrasena');
  };

  if (!email) {
    return null; // Componente se redireccionará
  }

  return (
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
          <strong>{email}</strong><br />
          Por favor, ingresa el código para continuar.
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

        <form className="verification-form-6" onSubmit={handleVerifyCode}>
          <div className="code-input-group-7" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <React.Fragment key={index}>
                {index === 2 && <span className="code-separator-11">-</span>}
                <input
                  ref={el => inputRefs.current[index] = { current: el }}
                  type="text"
                  className={`code-input-${8 + index}`}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.6 : 1
                  }}
                />
              </React.Fragment>
            ))}
          </div>

          <button 
            className="verification-button-15" 
            type="submit"
            disabled={loading || !isCodeComplete()}
            style={{
              opacity: loading || !isCodeComplete() ? 0.6 : 1,
              cursor: loading || !isCodeComplete() ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Verificando...' : 'Verificar Código'}
          </button>

          <div className="resend-section" style={{ marginTop: '20px' }}>
            {!canResend ? (
              <p className="resend-text-16">
                ¿No recibiste el código? Podrás solicitar uno nuevo en{' '}
                <span style={{ fontWeight: 'bold', color: '#ff6b35' }}>
                  {formatTime(timeLeft)}
                </span>
              </p>
            ) : (
              <p className="resend-text-16">
                ¿No recibiste el código?{' '}
                <button 
                  type="button"
                  className="resend-link-17" 
                  onClick={handleResendCode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b35',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Reenviar código
                </button>
              </p>
            )}
          </div>

          <div style={{ marginTop: '15px' }}>
            <button 
              type="button"
              onClick={handleBackClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Volver a ingresar correo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CodigoVerificacion;