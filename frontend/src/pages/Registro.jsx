// Registro.jsx
import React, { useState } from 'react';
import "../styles/Registro.css";
import bgImgHouse from "../assets/imgLoginFondo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import TermYcon from './TermYcon'; // Asegúrate de la ruta correcta

function Registro() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleTermsClick = () => {
    setShowTermsPopup(true);
  };

  const handleClosePopup = () => {
    setShowTermsPopup(false);
  };

  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      <div className="overlay" role="main" aria-label="Formulario de registro">
        <h1>Registro</h1>
        <form className="registro-form">
          <input type="text" placeholder="Nombres" aria-label="Nombres" required style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }} />
          <input type="text" placeholder="Teléfono" aria-label="Teléfono" required style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }} />
          <div className="input-password-wrapper" style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Contraseña"
              aria-label="Contraseña"
              id="password"
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEye : faEyeSlash}
              className="toggle-password"
              id="togglePassword"
              aria-label="Mostrar u ocultar contraseña"
              role="button"
              tabIndex={0}
              onClick={togglePasswordVisibility}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  togglePasswordVisibility();
                }
              }}
            />
          </div>

          <input type="text" placeholder="Apellidos" aria-label="Apellidos" required style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }} />
          <input type="text" placeholder="Dirección" aria-label="Dirección" required style={{ gridColumn: '2 / 3', gridRow: '2 / 3' }} />
          <ul
            className="password-requirements"
            style={{ gridColumn: '3 / 4', gridRow: '2 / 3', marginTop: 0, marginBottom: 0 }}
          >
            <li>8 caracteres mínimos</li>
            <li>Una mayúscula</li>
            <li>Un número</li>
            <li>Un carácter especial</li>
          </ul>

          <input type="text" placeholder="DUI" aria-label="DUI" required style={{ gridColumn: '1 / 2', gridRow: '3 / 4' }} />
          <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" required style={{ gridColumn: '2 / 3', gridRow: '3 / 4' }} />
          <div style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}>
            <label htmlFor="fechaNacimiento" className="fecha-nacimiento-label">
              Fecha de nacimiento
            </label>
            <div id="fechaNacimiento" className="fecha-nacimiento-container" style={{ marginTop: '5px' }}>
              <select aria-label="Día de nacimiento" required defaultValue="">
                <option value="" disabled>Día</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select aria-label="Mes de nacimiento" required defaultValue="">
                <option value="" disabled>Mes</option>
                <option>Enero</option>
                <option>Febrero</option>
                <option>Marzo</option>
                <option>Abril</option>
                <option>Mayo</option>
                <option>Junio</option>
                <option>Julio</option>
                <option>Agosto</option>
                <option>Septiembre</option>
                <option>Octubre</option>
                <option>Noviembre</option>
                <option>Diciembre</option>
              </select>
              <select aria-label="Año de nacimiento" required defaultValue="">
                <option value="" disabled>Año</option>
                {Array.from({ length: 25 }, (_, i) => (
                  <option key={2025 - i}>{2025 - i}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="checkbox-container" style={{ gridColumn: '1 / 3', gridRow: '4 / 5' }}>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms" className="terms-label-link" onClick={handleTermsClick}>
              Acepto los términos y condiciones
            </label>
          </div>

          <button type="submit" aria-label="Registrarte">
            Registrarte
          </button>
        </form>
        <p className="login-text">
          ¿Ya tienes una cuenta creada? <a href="#" tabIndex={0}>
            Inicia sesión
          </a>
        </p>
      </div>

      {showTermsPopup && (
        <div className="terms-popup">
          <div className="terms-popup-content">
            <span className="close-popup" onClick={handleClosePopup}>
              &times;
            </span>
            <TermYcon />
          </div>
        </div>
      )}
    </div>
  );
}

export default Registro;