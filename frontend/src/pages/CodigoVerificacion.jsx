import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, RefreshCw } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import CodeInput from '../components/CodeInput';
import Timer from '../components/Timer';
import useCodeVerification from '../components/Customers/Hooks/useCodeVerification';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import ArrowLeftIcon from "../assets/arrowRight.png";

function CodigoVerificacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyRecoveryCode, requestRecoveryCode, loading } = usePasswordRecovery();
  
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
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!isCodeComplete()) {
      setErrorMessage('Por favor, completa el código de 5 dígitos');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const codeString = getCodeString();
    const result = await verifyRecoveryCode(codeString);

    if (result.success) {
      setSuccessMessage('¡Código verificado correctamente!');
      
      setTimeout(() => {
        navigate('/changePassword', {
          state: {
            email: email,
            fromCodeVerification: true
          }
        });
      }, 1500);
    } else {
      setErrorMessage(result.message || 'Código de verificación inválido');
      clearCode();
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    const result = await requestRecoveryCode(email);
    if (result.success) {
      setTimeLeft(1200);
      setCanResend(false);
      setSuccessMessage('Nuevo código enviado exitosamente');
      setErrorMessage('');
      clearCode();
    } else {
      setErrorMessage(result.message || 'Error al reenviar el código');
    }
  };

  const handleBackClick = () => {
    navigate('/recuperarContrasena');
  };

  if (!email) {
    return null;
  }

  return (
    <AuthLayout
      title="Verificación de Correo"
      subtitle={
        <>
          Hemos enviado un código de <strong>5 dígitos</strong> a<br />
          <strong style={{ color: '#60a5fa' }}>{email}</strong><br />
          Por favor, ingresa el código para continuar.
        </>
      }
      showBackButton={true}
      onBackClick={handleBackClick}
      backIcon={ArrowLeftIcon}
    >
      {/* Mensajes de estado */}
      {successMessage && (
        <div className="auth-success-message">
          <CheckCircle className="auth-error-icon" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="auth-error-message">
          <span>{errorMessage}</span>
        </div>
      )}

      <form className="auth-form" onSubmit={handleVerifyCode}>
        {/* Input de código */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <CodeInput
            code={code}
            inputRefs={inputRefs}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            disabled={loading || timeLeft === 0}
            error={!!errorMessage}
          />
        </div>

        {/* Temporizador */}
        <Timer 
          timeLeft={timeLeft}
          isExpired={timeLeft === 0}
          className="mb-4"
        />

        {/* Botón de verificación */}
        <button 
          type="submit"
          className={`auth-button ${isCodeComplete() && timeLeft > 0 ? 'success' : ''}`}
          disabled={loading || !isCodeComplete() || timeLeft === 0}
        >
          {loading ? (
            <>
              <div className="auth-loading-spinner" />
              Verificando...
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              Verificar Código
            </>
          )}
        </button>

        {/* Sección de reenvío */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          {!canResend ? (
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '0.875rem',
              margin: 0
            }}>
              ¿No recibiste el código? Podrás solicitar uno nuevo cuando expire el tiempo
            </p>
          ) : (
            <div>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontSize: '0.875rem',
                margin: '0 0 1rem 0'
              }}>
                ¿No recibiste el código?
              </p>
              <button 
                type="button"
                onClick={handleResendCode}
                className="auth-button primary"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="auth-loading-spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} />
                    Solicitar nuevo código
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}

export default CodigoVerificacion;