import React from 'react';
import "../styles/RecuperarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import ArrowLeftIcon from "../assets/arrowRight.png";
import LockIcon from "../components/LockIcon.jsx"; // Importa el componente LockIcon

function RecuperarContraseña() {
  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="form-container">
        <div className="header">
          <button className="back-button">
            <img src={ArrowLeftIcon} alt="Volver" className="back-icon" />
          </button>
        </div>
        <LockIcon /> {/* Renderiza el componente LockIcon aquí */}
        <h1 className="form-title">¿Tienes problemas para iniciar sesión?</h1>
        <p className="form-description">
          Ingresa tu correo electrónico y te enviaremos un enlace{"\n"}
          para que recuperes el acceso a tu cuenta
        </p>
        <form className="reset-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          <button className="submit-button" type="submit">
            Enviar enlace de inicio de sesión
          </button>
        </form>
        <div className="or-separator"><hr /> &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; <strong>O</strong> &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; <hr /></div> {/* Agrega la "O" con las líneas */}
        <div className="create-account">
          <a href="#" className="create-account-link">
            <strong>Crear cuenta nueva</strong>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContraseña;