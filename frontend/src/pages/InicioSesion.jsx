import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/InicioSesion.css";
import bgImgHouse from "../assets/imgLoginFondo.png"; 

function InicioSesion() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  const handleRecuperarContrasenaClick = () => {
    navigate('/recuperarContrasena');
  };

  const handleLandingPageClick = () => {
    navigate('/landingPage');
  };

  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="form-container2">
        <h1 className="form-title">Inicio de sesión</h1>
        <form className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="text-input"
            />
            <span
              className="password-toggle"
              aria-label="Mostrar contraseña"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          <div className="remember-forgot">
            <label className="remember-me">
              <input type="checkbox" />
              Mantener sesión iniciada
            </label>
            <a href="" className="forgot-password" onClick={handleRecuperarContrasenaClick}>¿Olvidaste tu contraseña?</a>
          </div>
          <button className="submit-button" type="submit" onClick={handleLandingPageClick}>
            Iniciar sesión
          </button>
          <div className="no-account">
            ¿No tienes una cuenta? <a href="" className="register-link" onClick={handleRegisterClick}>Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InicioSesion;