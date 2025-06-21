import React, { useContext, useState, useRef, useEffect } from "react"; // Importa la biblioteca React para la creación de componentes.
import '../styles/UserInfoCard.css'; // Importa los estilos CSS específicos para este componente.
import closeIcon from '../assets/image10.png'; // Importa la imagen del icono de cerrar.
import profileIcon from '../assets/image9.png'; // Importa la imagen del icono de perfil de usuario por defecto.
import cameraIcon from '../assets/image11.png'; // Importa la imagen del icono de la cámara para cambiar la foto de perfil.
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks para acceder a la ubicación actual y para la navegación.
import { useAuth } from '../context/AuthContext';
import useCustomerInfo from '../components/Customers/Hooks/useCustomerInfo';

// Define el componente funcional UserInfoCard, que recibe dos props: 'isOpen' (booleano para controlar la visibilidad) y 'onClose' (función para cerrar la tarjeta).
const UserInfoCard = ({ isOpen, onClose }) => {
  // Hook para acceder al objeto de ubicación actual (no se utiliza directamente en este componente, pero podría usarse en el futuro).
  const location = useLocation();
  // Hook para obtener la función 'navigate' que permite la navegación programática entre rutas.
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { user, userInfo, isAuthenticated, logout, loading: authLoading } = useAuth();
  const { customerInfo, loading: customerLoading, error: customerError, isCustomer } = useCustomerInfo();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    dui: '',
    email: '',
    phone: '',
    profilePicture: '',
    minBudget: '',
    maxBudget: ''
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (isCustomer && customerInfo) {
      setFormData({
        firstName: customerInfo.firstName || '',
        lastName: customerInfo.lastName || '',
        birthDate: customerInfo.birthDate ? customerInfo.birthDate.split('T')[0] : '',
        address: customerInfo.address || '',
        dui: customerInfo.dui || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        profilePicture: customerInfo.profilePicture || '',
        minBudget: customerInfo.minBudget || '',
        maxBudget: customerInfo.maxBudget || customerInfo.budget || ''
      });
    } else if (!isCustomer && userInfo) {
      setFormData({
        firstName: userInfo.name ? userInfo.name.split(' ')[0] : '',
        lastName: userInfo.name ? userInfo.name.split(' ').slice(1).join(' ') : '',
        birthDate: userInfo.birthdate ? userInfo.birthdate.split('T')[0] : '',
        address: userInfo.address || '',
        dui: userInfo.dui || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        profilePicture: userInfo.profilePicture || '',
        minBudget: '',
        maxBudget: ''
      });
    }
  }, [customerInfo, userInfo, isCustomer]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:4000/api/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        return data.imageUrl;
      } else {
        throw new Error(data.message || 'Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const handleImageClick = () => {
    if (!isAdmin && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUpdateMessage('Por favor selecciona un archivo de imagen válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUpdateMessage('La imagen debe ser menor a 5MB');
      return;
    }

    try {
      setIsUploadingImage(true);
      setUpdateMessage('Subiendo imagen...');

      const imageUrl = await uploadImageToCloudinary(file);

      setFormData(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));

      setUpdateMessage('Imagen subida correctamente');
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (error) {
      setUpdateMessage('Error al subir la imagen');
      console.error('Error uploading image: ', error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!isCustomer) return;

    try {
      setIsUpdating(true);
      setUpdateMessage('');

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        address: formData.address,
        dui: formData.dui,
        email: formData.email,
        phone: formData.phone,
        profilePicture: formData.profilePicture,
        budget: parseFloat(formData.maxBudget) || 0
      };

      const response = await fetch(`http://localhost:4000/api/customers/${user.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setUpdateMessage('Perfil actualizado correctamente');
        setTimeout(() => setUpdateMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setUpdateMessage(errorData.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile: ', error);
      setUpdateMessage('Error de conexión al actualizar el perfil');
    } finally {
      setIsUpdating(false);
    }
  };

  // Si la prop 'isOpen' es falsa, el componente devuelve 'null', lo que significa que no se renderiza nada.
  if (!isOpen) return null;

  const isLoading = authLoading || (isCustomer && customerLoading);
  const isAdmin = user?.userType === 'admin';

  if (isLoading) {
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

  if (isCustomer && customerError) {
    return (
      <div className="user-info-overlay8">
        <div className="user-info-card8">
          <div className="card-header8">
            <button className="close-button8" onClick={onClose}>
              <img src={closeIcon} alt="Cerrar" />
            </button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            Error: {customerError}
          </div>
        </div>
      </div>
    );
  }

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
                src={formData.profilePicture || profileIcon}
                alt="Perfil"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {isUploadingImage && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  Subiendo...
                </div>
              )}
            </div>

            {!isAdmin && (
              <div className="camera-icon8" onClick={handleImageClick} style={{ cursor: 'pointer' }}>
                <img src={cameraIcon} alt="Cambiar foto" />
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          <h3 className="profile-name8">
            {formData.firstName} {formData.lastName}
            {isAdmin && " (Administrador)"}
          </h3>
        </div>

        {updateMessage && (
          <div style={{
            padding: '10px',
            margin: '10px 20px',
            backgroundColor: updateMessage.includes('Error') ? '#fee' : '#efe',
            color: updateMessage.includes('Error') ? '#c33' : '#363',
            borderRadius: '4px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {updateMessage}
          </div>
        )}

        <div className="info-section8">
          <h4>Información básica</h4>

          <div className="info-field8">
            <label>Nombres</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>

          <div className="info-field8">
            <label>Apellidos</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>

          <div className="info-field8">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>

          <div className="info-field8">
            <label>Dirección</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>

          <div className="info-field8">
            <label>DUI</label>
            <input
              name="dui"
              value={formData.dui}
              onChange={handleInputChange}
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isAdmin}
              style={isAdmin ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {}}
            />
          </div>

          <div className="info-field8">
            <label>Teléfono</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
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
                <input
                  type="number"
                  name="minBudget"
                  value={formData.minBudget}
                  onChange={handleInputChange}
                  placeholder="$0"
                />
              </div>
              <div className="budget-input8">
                <label>Max.</label>
                <input
                  type="number"
                  name="maxBudget"
                  value={formData.maxBudget}
                  onChange={handleInputChange}
                  placeholder="$0"
                />
              </div>
            </div>
          </div>
        )}

        <div className="button-section8">
          {!isAdmin && (
            <button
              className="update-profile-btn8"
              onClick={handleUpdateProfile}
              disabled={isUpdating}
            >
              {isUpdating ? 'Actualizando...' : 'Actualizar perfil'}
            </button>
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