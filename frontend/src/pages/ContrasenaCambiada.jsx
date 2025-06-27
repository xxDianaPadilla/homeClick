import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, LogIn } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

function ContrasenaCambiada() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener mensaje personalizado del estado
  const fromPasswordReset = location.state?.fromPasswordReset;
  const customMessage = location.state?.message;

  // Auto-redirección después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inicio-sesion');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  return (
    <AuthLayout
      title={fromPasswordReset ? '¡Contraseña cambiada exitosamente!' : 'Contraseña cambiada correctamente'}
      subtitle={
        fromPasswordReset ? (
          <>
            Tu contraseña ha sido actualizada correctamente.<br/>
            Ya puedes iniciar sesión con tu nueva contraseña.
          </>
        ) : (
          <>
            Vuelva a iniciar sesión<br/>
            para poder verificar que las
            nuevas credenciales funcionen.
          </>
        )
      }
      containerClass="success-container"
    >
      {/* Mensaje personalizado si existe */}
      {customMessage && (
        <div style={{
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          margin: '1rem 0',
          color: '#86efac',
          fontSize: '0.875rem',
          textAlign: 'center',
          fontFamily: 'Raleway, sans-serif',
          fontStyle: 'italic'
        }}>
          {customMessage}
        </div>
      )}

      {/* Información de redirección automática */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        margin: '1rem 0',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.75rem',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
        fontStyle: 'italic'
      }}>
        Serás redirigido automáticamente al inicio de sesión en 5 segundos...
      </div>

      <button className="auth-button success" onClick={handleLoginClick}>
        <LogIn size={20} />
        Ir a iniciar sesión
      </button>

      {/* Consejos de seguridad */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'rgba(255, 243, 205, 0.1)',
        border: '1px solid rgba(255, 234, 167, 0.3)',
        borderRadius: '8px',
        fontSize: '0.75rem',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.5rem' }}>
          💡 Consejos de seguridad:
        </strong>
        <ul style={{ margin: '0.25rem 0 0 1rem', textAlign: 'left', lineHeight: '1.4' }}>
          <li>No compartas tu contraseña con nadie</li>
          <li>Usa contraseñas únicas para cada servicio</li>
          <li>Considera usar un gestor de contraseñas</li>
        </ul>
      </div>
    </AuthLayout>
  );
}

export default ContrasenaCambiada;