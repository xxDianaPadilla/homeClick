import React from "react"; // Importa la biblioteca React para la creación de componentes.
import '../styles/UserInfoCard.css'; // Importa los estilos CSS específicos para este componente.
import closeIcon from '../assets/image10.png'; // Importa la imagen del icono de cerrar.
import profileIcon from '../assets/image9.png'; // Importa la imagen del icono de perfil de usuario por defecto.
import cameraIcon from '../assets/image11.png'; // Importa la imagen del icono de la cámara para cambiar la foto de perfil.
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks para acceder a la ubicación actual y para la navegación.

// Define el componente funcional UserInfoCard, que recibe dos props: 'isOpen' (booleano para controlar la visibilidad) y 'onClose' (función para cerrar la tarjeta).
const UserInfoCard = ({ isOpen, onClose }) => {
  // Hook para acceder al objeto de ubicación actual (no se utiliza directamente en este componente, pero podría usarse en el futuro).
  const location = useLocation();
  // Hook para obtener la función 'navigate' que permite la navegación programática entre rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón de "Cerrar sesión". Navega a la página de inicio de sesión.
  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  // Si la prop 'isOpen' es falsa, el componente devuelve 'null', lo que significa que no se renderiza nada.
  if (!isOpen) return null;

  // Si 'isOpen' es verdadera, se renderiza la estructura de la tarjeta de información del usuario.
  return (
    <div className="user-info-overlay8">
      {/* Contenedor principal de la tarjeta de información del usuario. */}
      <div className="user-info-card8">
        {/* Encabezado de la tarjeta, contiene el botón de cerrar. */}
        <div className="card-header8">
          {/* Botón de cerrar la tarjeta. Al hacer clic, llama a la función 'onClose' proporcionada como prop. */}
          <button className="close-button8" onClick={onClose}>
            {/* Imagen del icono de cerrar con texto alternativo para accesibilidad. */}
            <img src={closeIcon} alt="Cerrar" />
          </button>
        </div>

        {/* Sección de perfil, muestra la imagen del perfil y el nombre del usuario. */}
        <div className="profile-section8">
          {/* Contenedor de la imagen de perfil, utilizado para posicionar el icono de la cámara. */}
          <div className="profile-image-container8">
            {/* Contenedor de la imagen de perfil en sí. */}
            <div className="profile-image8">
              {/* Imagen del perfil de usuario con texto alternativo. */}
              <img src={profileIcon} alt="Perfil" />
            </div>
            {/* Icono de la cámara para indicar la posibilidad de cambiar la foto de perfil. */}
            <div className="camera-icon8">
              {/* Imagen del icono de la cámara con texto alternativo. */}
              <img src={cameraIcon} alt="Cambiar foto" />
            </div>
          </div>
          {/* Nombre del usuario que se muestra en la tarjeta. */}
          <h3 className="profile-name8">Juan Pablo Rodriguez López</h3>
        </div>

        {/* Sección de información básica del usuario. */}
        <div className="info-section8">
          {/* Título de la sección. */}
          <h4>Información básica</h4>

          {/* Campo para la fecha de nacimiento. */}
          <div className="info-field8">
            <label>Fecha de nacimiento</label>
            {/* Input de tipo texto con un valor por defecto. */}
            <input defaultValue="1999-07-14" />
          </div>
          {/* Campo para la dirección. */}
          <div className="info-field8">
            <label>Dirección</label>
            {/* Input de tipo texto con un valor por defecto. */}
            <input defaultValue="Calle #21 San Salvador" />
          </div>
          {/* Campo para el número de DUI (Documento Único de Identidad, un documento de identificación en El Salvador). */}
          <div className="info-field8">
            <label>DUI</label>
            {/* Input de tipo texto con un valor por defecto. */}
            <input defaultValue="12345678-9" />
          </div>
        </div>

        {/* Sección de información de contacto del usuario. */}
        <div className="info-section8">
          {/* Título de la sección. */}
          <h4>Información de contacto</h4>

          {/* Campo para el correo electrónico. */}
          <div className="info-field8">
            <label>Correo electrónico</label>
            {/* Input de tipo texto con un valor por defecto. */}
            <input defaultValue="jp@example.com" />
          </div>

          {/* Campo para el número de teléfono. */}
          <div className="info-field8">
            <label>Teléfono</label>
            {/* Input de tipo texto con un valor por defecto. */}
            <input defaultValue="1234-5678" />
          </div>
        </div>

        {/* Sección de presupuestos del usuario. */}
        <div className="info-section8">
          {/* Título de la sección. */}
          <h4>Presupuestos</h4>

          {/* Contenedor para los campos de presupuesto mínimo y máximo. */}
          <div className="budget-field8">
            {/* Campo para el presupuesto mínimo. */}
            <div className="budget-input8">
              <label>Min.</label>
              {/* Input de tipo texto sin valor por defecto. */}
              <input />
            </div>
            {/* Campo para el presupuesto máximo. */}
            <div className="budget-input8">
              <label>Max.</label>
              {/* Input de tipo texto sin valor por defecto. */}
              <input />
            </div>
          </div>
        </div>

        {/* Sección de botones de acción. */}
        <div className="button-section8">
          {/* Botón para actualizar la información del perfil. */}
          <button className="update-profile-btn8">Actualizar perfil</button>
          {/* Botón para cerrar la sesión del usuario. Al hacer clic, llama a la función 'handleLoginClick' para navegar a la página de inicio de sesión. */}
          <button className="close-session-btn8" onClick={handleLoginClick}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;