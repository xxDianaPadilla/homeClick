import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthInput from '../components/AuthInput';
import usePasswordToggle from '../components/Customers/Hooks/usePasswordToggle';

function PrimerUso() {
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/inicio-sesion');
  };

  return (
    <AuthLayout
      title="Primer uso"
      subtitle="Configura tu cuenta para comenzar a usar HomeClick"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthInput
          type="email"
          placeholder="Correo electrónico"
          name="email"
          register={() => ({})}
        />

        <AuthInput
          type="password"
          placeholder="Contraseña"
          name="password"
          register={() => ({})}
          showPasswordToggle={true}
        />

        <AuthInput
          type="password"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          register={() => ({})}
          showPasswordToggle={true}
        />

        <button
          type="submit"
          className="auth-button"
        >
          <UserPlus size={20} />
          Crear cuenta
        </button>
      </form>
    </AuthLayout>
  );
}

export default PrimerUso;