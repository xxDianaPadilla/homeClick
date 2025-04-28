import React from 'react';
import "../styles/CambiarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png"; // Asegúrate de que la ruta a la imagen sea correcta
import LockIcon from "../components/LockIconCC.jsx"; // Importa el componente LockIcon

function CambiarContrasena() {
  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="form-container">
        <LockIcon /> {/* Renderiza el componente LockIcon aquí */}
        <h1 className="form-title">Cambiar Contraseña</h1>
        <p className="form-description">
        La contraseña debe tener al menos 6 caracteres e inlcuir
        una combinación de números, letras y caracteres
        especiales (!$@%).
        </p>
        <form className="change-password-form">
          <input
            type="password"
            placeholder="Contraseña nueva"
            className="text-input"
          />
          <input
            type="password"
            placeholder="Repetir contraseña nueva"
            className="text-input"
          />
          <button className="submit-button" type="submit">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default CambiarContrasena;