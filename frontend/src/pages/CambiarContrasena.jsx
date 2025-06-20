import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import PasswordRequirements from '../components/PasswordRequirements';
import usePasswordRecovery from '../components/Customers/Hooks/usePasswordRecovery';
import usePasswordRecoveryAlert from '../components/Customers/Hooks/usePasswordRecoveryAlert';
import PasswordRecoveryAlert from '../components/PasswordRecoveryAlert';
import LockImg from "../assets/LockIcon.png";
import ArrowLeftIcon from "../assets/arrowRight.png";

function CambiarContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updatePassword, loading, error, message } = usePasswordRecovery();
  const { alert, showSuccess, showError, hideAlert } = usePasswordRecoveryAlert();

  // Obtener datos del estado de navegación
  const email = location.state?.email;
  const fromCodeVerification = location.state?.fromCodeVerification;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const watchedPassword = watch('newPassword', '');

  // Redireccionar si no hay datos necesarios
  useEffect(() => {
    if (!email || !fromCodeVerification) {
      navigate('/recuperarContrasena');
    }
  }, [email, fromCodeVerification, navigate]);

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength
    };
  };

  const passwordValidation = validatePassword(watchedPassword);

  const validationRules = {
    newPassword: {
      required: 'La nueva contraseña es requerida',
      minLength: {
        value: 6,
        message: 'La contraseña debe tener al menos 6 caracteres'
      }
    },
    confirmPassword: {
      required: 'Confirma tu nueva contraseña',
      validate: (value) => {
        return value === watchedPassword || 'Las contraseñas no coinciden';
      }
    }
  };

  const onSubmit = async (data) => {
    const result = await updatePassword(data.newPassword);

    if (result.success) {
      showSuccess('¡Contraseña cambiada exitosamente!', { duration: 2000 });
      
      setTimeout(() => {
        navigate('/changedPassword', {
          state: {
            fromPasswordReset: true,
            message: 'Tu contraseña ha sido cambiada exitosamente'
          }
        });
      }, 1500);
    } else {
      showError(result.message || 'Error al cambiar la contraseña');
    }
  };

  const handleBackClick = () => {
    navigate('/passwordCode', {
      state: {
        email: email,
        fromPasswordReset: true
      }
    });
  };

  if (!email) {
    return null;
  }

  return (
    <>
      <AuthLayout
        title="Cambiar Contraseña"
        subtitle="Crea una nueva contraseña segura para tu cuenta de HomeClick. Asegúrate de que sea fácil de recordar pero difícil de adivinar."
        showBackButton={true}
        onBackClick={handleBackClick}
        backIcon={ArrowLeftIcon}
        showLogo={true}
        logoIcon={LockImg}
      >
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo para nueva contraseña */}
          <AuthInput
            type="password"
            placeholder="Contraseña nueva"
            register={register}
            name="newPassword"
            validationRules={validationRules.newPassword}
            error={errors.newPassword?.message}
            disabled={loading || isSubmitting}
            showPasswordToggle={true}
          />

          {/* Indicadores de requisitos de contraseña */}
          {watchedPassword && (
            <PasswordRequirements 
              password={watchedPassword} 
              className="mt-2"
            />
          )}

          {/* Campo para confirmar contraseña */}
          <AuthInput
            type="password"
            placeholder="Repetir contraseña nueva"
            register={register}
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
            error={errors.confirmPassword?.message}
            disabled={loading || isSubmitting}
            showPasswordToggle={true}
          />

          <button 
            className={`auth-button ${passwordValidation?.minLength ? 'success' : ''}`}
            type="submit"
            disabled={loading || isSubmitting || !passwordValidation?.minLength}
          >
            {loading || isSubmitting ? (
              <>
                <div className="auth-loading-spinner" />
                Cambiando contraseña...
              </>
            ) : (
              <>
                <Save size={20} />
                Cambiar contraseña
              </>
            )}
          </button>
        </form>
      </AuthLayout>

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

export default CambiarContrasena;