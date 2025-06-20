import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import { useAuth } from '../context/AuthContext';

function InicioSesion() {
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

  // Redireccionar si ya está autenticado
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

        // Mapear errores específicos
        if (errorMessage.toLowerCase().includes('email') ||
          errorMessage.toLowerCase().includes('correo') ||
          errorMessage.toLowerCase().includes('user not found')) {
          setError('email', {
            type: 'server',
            message: 'Usuario no encontrado'
          });
        } else if (errorMessage.toLowerCase().includes('password') ||
          errorMessage.toLowerCase().includes('contraseña') ||
          errorMessage.toLowerCase().includes('invalid password')) {
          setError('password', {
            type: 'server',
            message: 'Contraseña incorrecta'
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
    <AuthLayout
      title="Bienvenido"
      subtitle="Inicia sesión en tu cuenta de HomeClick"
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Error general del servidor */}
        {errors.root?.serverError && (
          <div className="auth-error-message">
            <span>{errors.root.serverError.message}</span>
          </div>
        )}

        <AuthInput
          type="email"
          placeholder="Correo electrónico"
          register={register}
          name="email"
          validationRules={validationRules.email}
          error={errors.email?.message}
          disabled={isSubmitting}
        />

        <AuthInput
          type="password"
          placeholder="Contraseña"
          register={register}
          name="password"
          validationRules={validationRules.password}
          error={errors.password?.message}
          disabled={isSubmitting}
          showPasswordToggle={true}
        />

        <div className="auth-remember-section">
          <label className="auth-remember-checkbox">
            <input
              type="checkbox"
              {...register('rememberMe')}
              disabled={isSubmitting}
            />
            <span>Mantener sesión iniciada</span>
          </label>
          <a 
            href="#" 
            className="auth-forgot-link" 
            onClick={handleRecuperarContrasenaClick}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button
          type="submit"
          className="auth-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="auth-loading-spinner" />
              Iniciando sesión...
            </>
          ) : (
            <>
              <LogIn size={20} />
              Iniciar sesión
            </>
          )}
        </button>

        <div className="auth-navigation">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="auth-navigation-link" onClick={handleRegisterClick}>
            Regístrate aquí
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}

export default InicioSesion;