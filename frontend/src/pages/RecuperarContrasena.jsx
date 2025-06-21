import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import LockImg from "../assets/LockIcon.png";
import ArrowLeftIcon from "../assets/arrowRight.png";

function RecuperarContraseña() {
  const navigate = useNavigate();
  const { loading, requestRecoveryCode } = usePasswordRecovery();
  const [emailSent, setEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');
    setSuccessMessage('');
    
    const result = await requestRecoveryCode(data.email);
    
    if (result.success) {
      setEmailSent(true);
      setSuccessMessage('¡Código enviado exitosamente! Revisa tu correo electrónico.');
      
      // Navegar después de un breve delay
      setTimeout(() => {
        navigate('/passwordCode', { 
          state: { 
            email: data.email,
            fromPasswordReset: true 
          } 
        });
      }, 2000);
    } else {
      setErrorMessage(result.message || 'Error al enviar el código de verificación');
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
      setErrorMessage('Por favor, ingresa un correo electrónico válido primero');
    }
  };

  return (
    <AuthLayout
      title="¿Problemas para iniciar sesión?"
      subtitle="Ingresa tu correo electrónico y te enviaremos un código para recuperar tu cuenta"
      showBackButton={true}
      onBackClick={handleLoginClick}
      backIcon={ArrowLeftIcon}
      showLogo={true}
      logoIcon={LockImg}
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

      {!emailSent ? (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {/* ARREGLADO: AuthInput ya maneja el icono internamente */}
          <AuthInput
            type="email"
            placeholder="Correo electrónico"
            register={register}
            name="email"
            validationRules={validationRules.email}
            error={errors.email?.message}
            disabled={loading}
            icon={<Mail size={20} />}
          />

          <button 
            type="submit"
            className="auth-button primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="auth-loading-spinner" />
                Enviando código...
              </>
            ) : (
              <>
                <Mail size={20} />
                Enviar código de verificación
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="auth-form">
          <button 
            type="button"
            className="auth-button success" 
            onClick={handlePasswordCodeClick}
          >
            <CheckCircle size={20} />
            Continuar con la verificación
          </button>
        </div>
      )}

      <div className="auth-separator">O</div>
      
      <div className="auth-navigation">
        <a href="/registro" className="auth-navigation-link">
          <strong>Crear cuenta nueva</strong>
        </a>
      </div>
    </AuthLayout>
  );
}

export default RecuperarContraseña;