import React from 'react';
import "../styles/EnvioCorreo.css";
import bgImgHouse from "../assets/imgLoginFondo.png"; // Reutilizamos la imagen de fondo

function EmailEnviado() {
  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="email-sent-container">
        <div className="icon-container">
        </div>
        <h1 className="title">Correo electrónico enviado</h1>
        <p className="description">
          Su codigo de verificación ha sido enviado a su correo electrónico. Por favor, revise su bandeja de entrada y siga las instrucciones para continuar.
        </p>
        <button className="accept-button">Aceptar</button>
      </div>
    </div>
  );
}

export default EmailEnviado;