import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../styles/InicioSesion.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import usePasswordToggle from '../components/Customers/Hooks/usePasswordToggle';
import { useAuth } from '../context/AuthContext';

function InicioSesion() {
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.userType === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/landingPage');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const validationRules = {
    email: {
      required: 'El correo electrónico es requerido',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'El correo electrónico no es válido'
      }
    },
    password: {
      required: 'La contraseña es requerida',
      minLength: {
        value: 6,
        message: 'La contraseña debe tener al menos 6 caracteres'
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      clearErrors();

      const result = await login(data.email, data.password);

      if (!result.success) {
        const errorMessage = result.message || 'Error en la autenticación';

        if (errorMessage.toLowerCase().includes('email') ||
          errorMessage.toLowerCase().includes('correo') ||
          errorMessage.toLowerCase().includes('usuario no encontrado')) {
          setError('email', {
            type: 'server',
            message: errorMessage
          });
        } else if (errorMessage.toLowerCase().includes('password') ||
          errorMessage.toLowerCase().includes('contraseña') ||
          errorMessage.toLowerCase().includes('credenciales incorrectas')) {
          setError('password', {
            type: 'server',
            message: errorMessage
          });
        } else {
          setError('root.serverError', {
            type: 'server',
            message: errorMessage
          });
        }
      }

    } catch (error) {
      console.error('Error durante el login:', error);
      setError('root.serverError', {
        type: 'server',
        message: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'
      });
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/registro');
  };

  const handleRecuperarContrasenaClick = (e) => {
    e.preventDefault();
    navigate('/recuperarContrasena');
  };

  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="form-container2">
        <h1 className="form-title">Inicio de sesión</h1>

        {/* Error general del servidor */}
        {errors.root?.serverError && (
          <div className="error-message" style={{
            color: '#ff4444',
            backgroundColor: '#ffe6e6',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            textAlign: 'center',
            border: '1px solid #ffcccc'
          }}>
            {errors.root.serverError.message}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              className={`text-input ${errors.email ? 'error' : ''}`}
              disabled={isSubmitting}
              {...register('email', validationRules.email)}
            />
            {errors.email && (
              <span className="error-text" style={{ color: '#ff4444', fontSize: '14px' }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className={`text-input ${errors.password ? 'error' : ''}`}
              disabled={isSubmitting}
              {...register('password', validationRules.password)}
            />
            <span
              className="password-toggle"
              aria-label="Mostrar contraseña"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            >
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"></path>
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
            {errors.password && (
              <span className="error-text" style={{
                color: '#ff4444',
                fontSize: '14px',
                position: 'absolute',
                bottom: '-20px',
                left: '0'
              }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="remember-forgot">
            <label className="remember-me">
              <input
                type="checkbox"
                {...register('rememberMe')}
              />
              Mantener sesión iniciada
            </label>
            <a href="#" className="forgot-password" onClick={handleRecuperarContrasenaClick}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            className="submit-button4"
            type="submit"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>

          <div className="no-account">
            ¿No tienes una cuenta?
            <a href="#" className="register-link" onClick={handleRegisterClick}>
              Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InicioSesion;