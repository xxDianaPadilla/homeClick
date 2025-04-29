import React from 'react';
import "../styles/ContrasenaCambiada.css";
import bgImgHouse from "../assets/imgLoginFondo.png"; 
import { useNavigate } from 'react-router-dom';

function ContrasenaCambiada() {
  const navigate = useNavigate();

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
        <h1 className="title">Contraseña cambiada correctamente</h1>
        <p className="description">
          Vuelva a iniciar sesión<br/>
          para poder verificar que las
          nuevas credenciales funcionen.
        </p>
        <button className="accept-button" onClick={handleLoginClick}>Aceptar</button>
      </div>
    </div>
  );
}

export default ContrasenaCambiada;