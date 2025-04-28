import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/PrimerUso.css";
import bgImgHouse from "../assets/imgLoginFondo.png"

function PrimerUso() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

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
        <h1 className="form-title3">Primer uso</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            className="text-input" 
          />
          <div className="password-container">
            <input 
              type={showPassword1 ? "text" : "password"} 
              placeholder="Contraseña" 
              className="text-input" 
            />
            <span 
              className="password-toggle" 
              aria-label="Mostrar contraseña" 
              onClick={() => setShowPassword1(!showPassword1)}
            >
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          <div className="password-container">
            <input 
              type={showPassword2 ? "text" : "password"} 
              placeholder="Contraseña" 
              className="text-input" 
            />
            <span 
              className="password-toggle" 
              aria-label="Mostrar contraseña" 
              onClick={() => setShowPassword2(!showPassword2)}
            >
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          <button className="submit-button" type="submit">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrimerUso;