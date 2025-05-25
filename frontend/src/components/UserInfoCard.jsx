import React, { useContext } from "react"; // Importa la biblioteca React para la creación de componentes.
import '../styles/UserInfoCard.css'; // Importa los estilos CSS específicos para este componente.
import closeIcon from '../assets/image10.png'; // Importa la imagen del icono de cerrar.
import profileIcon from '../assets/image9.png'; // Importa la imagen del icono de perfil de usuario por defecto.
import cameraIcon from '../assets/image11.png'; // Importa la imagen del icono de la cámara para cambiar la foto de perfil.
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks para acceder a la ubicación actual y para la navegación.
import { useAuth } from '../context/AuthContext';

// Define el componente funcional UserInfoCard, que recibe dos props: 'isOpen' (booleano para controlar la visibilidad) y 'onClose' (función para cerrar la tarjeta).
const UserInfoCard = ({ isOpen, onClose }) => {
  // Hook para acceder al objeto de ubicación actual (no se utiliza directamente en este componente, pero podría usarse en el futuro).
  const location = useLocation();
  // Hook para obtener la función 'navigate' que permite la navegación programática entre rutas.
  const navigate = useNavigate();

  const { user, userInfo, isAuthenticated, logout, loading } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      // Logout exitoso
      console.log('Sesión cerrada correctamente');
    } else {
      // Manejar error si es necesario
      console.error('Error al cerrar sesión:', result.error);
    }
  };

  // Si la prop 'isOpen' es falsa, el componente devuelve 'null', lo que significa que no se renderiza nada.
  if (!isOpen) return null;

  if (loading || !userInfo) {
    return (
      <div className="user-info-overlay8">
        <div className="user-info-card8">
          <div className="card-header8">
            <button className="close-button8" onClick={onClose}>
              <img src={closeIcon} alt="Cerrar" />
            </button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            Cargando información del usuario...
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.userType === 'admin';

  return (
    <div className="user-info-overlay8">
      <div className="user-info-card8">
        <div className="card-header8">
          <button className="close-button8" onClick={onClose}>
            <img src={closeIcon} alt="Cerrar" />
          </button>
        </div>

        <div className="profile-section8">
          <div className="profile-image-container8">
            <div className="profile-image8">
              <img 
                src={userInfo.profilePicture || profileIcon} 
                alt="Perfil" 
              />
            </div>

            {!isAdmin && (
              <div className="camera-icon8">
                <img src={cameraIcon} alt="Cambiar foto" />
              </div>
            )}
          </div>
          <h3 className="profile-name8">
            {userInfo.name || 'Usuario'}
            {isAdmin && " (Administrador)"}
          </h3>
        </div>

        <div className="info-section8">
          <h4>Información básica</h4>

          <div className="info-field8">
            <label>Fecha de nacimiento</label>
            <input 
              defaultValue={userInfo.birthdate || ""} 
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
          
          <div className="info-field8">
            <label>Dirección</label>
            <input 
              defaultValue={userInfo.address || ""} 
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
          
          <div className="info-field8">
            <label>DUI</label>
            <input 
              defaultValue={userInfo.dui || ""} 
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
        </div>

        <div className="info-section8">
          <h4>Información de contacto</h4>

          <div className="info-field8">
            <label>Correo electrónico</label>
            <input 
              defaultValue={userInfo.email || ""} 
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>

          <div className="info-field8">
            <label>Teléfono</label>
            <input 
              defaultValue={userInfo.phone || ""} 
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>
        </div>

        {!isAdmin && (
          <div className="info-section8">
            <h4>Presupuestos</h4>

            <div className="budget-field8">
              <div className="budget-input8">
                <label>Min.</label>
                <input />
              </div>
              <div className="budget-input8">
                <label>Max.</label>
                <input />
              </div>
            </div>
          </div>
        )}

        <div className="button-section8">
          {!isAdmin && (
            <button className="update-profile-btn8">Actualizar perfil</button>
          )}
          <button className="close-session-btn8" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;