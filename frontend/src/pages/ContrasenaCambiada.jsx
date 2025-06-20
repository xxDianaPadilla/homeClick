import React, { useEffect } from 'react';
import "../styles/ContrasenaCambiada.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="password-changed-container">
        {/* Icono de éxito */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#28a745',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 4px 20px rgba(40, 167, 69, 0.3)'
          }}>
            <svg 
              width="40" 
              height="40" 
              fill="white" 
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
        </div>

        <h1 className="title">
          {fromPasswordReset ? '¡Contraseña cambiada exitosamente!' : 'Contraseña cambiada correctamente'}
        </h1>
        
        <p className="description">
          {fromPasswordReset ? (
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
          )}
        </p>

        {/* Mensaje personalizado si existe */}
        {customMessage && (
          <div style={{
            backgroundColor: '#e6ffe6',
            border: '1px solid #ccffcc',
            borderRadius: '5px',
            padding: '10px',
            margin: '15px 0',
            color: '#28a745',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {customMessage}
          </div>
        )}

        {/* Información de redirección automática */}
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '5px',
          padding: '10px',
          margin: '15px 0',
          color: '#6c757d',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Serás redirigido automáticamente al inicio de sesión en 5 segundos...
        </div>

        <button className="accept-button" onClick={handleLoginClick}>
          Ir a iniciar sesión
        </button>

        {/* Consejos de seguridad */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          fontSize: '12px',
          color: '#856404'
        }}>
          <strong>💡 Consejos de seguridad:</strong>
          <ul style={{ margin: '5px 0 0 15px', textAlign: 'left' }}>
            <li>No compartas tu contraseña con nadie</li>
            <li>Usa contraseñas únicas para cada servicio</li>
            <li>Considera usar un gestor de contraseñas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContrasenaCambiada;