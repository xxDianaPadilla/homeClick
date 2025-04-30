import React from 'react';
import "../styles/LockIcon.css"; // Importa los estilos CSS para el componente LockIcon
import LockImg from "../assets/LockIcon.png"; // Importa la imagen del icono de candado

// Define el componente funcional LockIcon
function LockIcon() {
  // Renderiza un contenedor div con la clase 'lock-icon-container'
  return (
    <div className="lock-icon-container">
      {/* Muestra la imagen del candado con el texto alternativo "Candado" y la clase 'lock-image' */}
      <img src={LockImg} alt="Candado" className="lock-image" />
    </div>
  );
}

export default LockIcon;