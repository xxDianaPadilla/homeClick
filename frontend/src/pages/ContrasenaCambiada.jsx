import React from 'react';
import "../styles/ContrasenaCambiada.css";
import bgImgHouse from "../assets/imgLoginFondo.png"; // Reutilizamos la imagen de fondo

function ContrasenaCambiada() {
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
        <button className="accept-button">Aceptar</button>
      </div>
    </div>
  );
}

export default ContrasenaCambiada;