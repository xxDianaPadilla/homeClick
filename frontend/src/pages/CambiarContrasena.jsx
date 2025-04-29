import React from 'react';
import "../styles/CambiarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png"; 
import LockIcon from "../components/LockIconCC.jsx"; 
import { useNavigate } from 'react-router-dom';

function CambiarContrasena() {
  const navigate = useNavigate();

  const handleChangedPasswordClick = () => {
    navigate('/changedPassword');
  };

  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="form-container2">
        <LockIcon /> 
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
          <button className="submit-button" type="submit" onClick={handleChangedPasswordClick}>
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default CambiarContrasena;