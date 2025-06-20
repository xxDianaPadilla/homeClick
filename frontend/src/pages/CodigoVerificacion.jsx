import React, { useState, useEffect } from 'react';
import "../styles/CodigoVerificacion.css";
import bgImgHouseF from "../assets/imgLoginFondo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import useCodeVerification from '../components/Customers/Hooks/useCodeVerification';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import useAlert from '../components/Customers/Hooks/useAlert';
import AlertMessage from '../components/AlertMessage';

function CodigoVerificacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyRecoveryCode, loading } = usePasswordRecovery();
  const { alert, showSuccess, showError, showWarning, hideAlert } = useAlert();
  
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
  }, [timeLeft]);

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
            <strong style={{ color: '#ff6b35' }}>{email}</strong><br />
            Por favor, ingresa el código para continuar.
          </p>

          <form className="verification-form-6" onSubmit={handleVerifyCode}>
            {/* Contenedor mejorado para los inputs del código */}
            <div 
              className="code-input-group-enhanced" 
              onPaste={handlePaste}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                margin: '30px 0',
                flexWrap: 'wrap'
              }}
            >
              {code.map((digit, index) => (
                <React.Fragment key={index}>
                  {index === 2 && (
                    <span 
                      className="code-separator-enhanced"
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#666',
                        margin: '0 8px'
                      }}
                    >
                      -
                    </span>
                  )}
                  <input
                    ref={el => inputRefs.current[index] = { current: el }}
                    type="text"
                    className="code-input-enhanced"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading}
                    style={{
                      width: '50px',
                      height: '50px',
                      border: `2px solid ${digit ? '#28a745' : '#ddd'}`,
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      backgroundColor: loading ? '#f5f5f5' : '#fff',
                      opacity: loading ? 0.6 : 1,
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#ff6b35';
                      e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = digit ? '#28a745' : '#ddd';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </React.Fragment>
              ))}
            </div>

            {/* Información del temporizador */}
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              padding: '12px',
              backgroundColor: timeLeft > 300 ? '#e7f3ff' : '#fff3cd',
              border: `1px solid ${timeLeft > 300 ? '#b3d9ff' : '#ffeaa7'}`,
              borderRadius: '6px',
              color: timeLeft > 300 ? '#0066cc' : '#856404'
            }}>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>
                {timeLeft > 0 ? (
                  <>
                    ⏱️ Tiempo restante: <strong>{formatTime(timeLeft)}</strong>
                  </>
                ) : (
                  <>
                    ⚠️ El código ha expirado
                  </>
                )}
              </div>
            </div>

            <button 
              className="verification-button-15" 
              type="submit"
              disabled={loading || !isCodeComplete() || timeLeft === 0}
              style={{
                opacity: loading || !isCodeComplete() || timeLeft === 0 ? 0.6 : 1,
                cursor: loading || !isCodeComplete() || timeLeft === 0 ? 'not-allowed' : 'pointer',
                position: 'relative',
                backgroundColor: isCodeComplete() && timeLeft > 0 ? '#28a745' : undefined,
                borderColor: isCodeComplete() && timeLeft > 0 ? '#28a745' : undefined
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
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>

            {/* Sección de reenvío mejorada */}
            <div className="resend-section" style={{ marginTop: '25px', textAlign: 'center' }}>
              {!canResend ? (
                <p className="resend-text-16" style={{ color: '#666', fontSize: '14px' }}>
                  ¿No recibiste el código? Podrás solicitar uno nuevo en{' '}
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#ff6b35',
                    fontFamily: 'monospace',
                    fontSize: '15px'
                  }}>
                    {formatTime(timeLeft)}
                  </span>
                </p>
              ) : (
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '6px',
                  marginBottom: '15px'
                }}>
                  <p style={{ margin: '0 0 10px 0', color: '#721c24', fontSize: '14px' }}>
                    ¿No recibiste el código?
                  </p>
                  <button 
                    type="button"
                    onClick={handleResendCode}
                    style={{
                      background: '#dc3545',
                      border: 'none',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Solicitar nuevo código
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
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

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>

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

export default CodigoVerificacion;