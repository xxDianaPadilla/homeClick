import React from 'react';
import "../styles/Candado.css"; // Asegúrate de que la ruta sea correcta
import LockImg from "../assets/LockIcon.png";

function LockIcon() {
  return (
    <div className="lock-icon-container">
      <img src={LockImg} alt="Candado" className="lock-image" />
    </div>
  );
}

export default LockIcon;