import React from 'react';
import "../styles/RecuperarContrasena.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import ArrowLeftIcon from "../assets/arrowRight.png";
import LockImg from "../assets/LockIcon.png";
import { useNavigate } from 'react-router-dom';

function RecuperarContraseña() {
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
      <div className="form-container2">
        <div className="header">
          <button className="back-button" onClick={handleLoginClick}>
            <img src={ArrowLeftIcon} alt="Volver" className="back-icon" />
          </button>
        </div>
        
        <div className="lock-icon-container2">
            <img src={LockImg} alt="Icono de seguridad" className="lock-icon" />
          </div>

        <h1 className="form-title4">¿Tienes problemas para iniciar sesión?</h1>
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
          <a href="/registro" className="create-account-link">
            <strong>Crear cuenta nueva</strong>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContraseña;