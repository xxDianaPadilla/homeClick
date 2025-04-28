import React, { useState } from 'react';
import "../styles/Registro.css";
import bgImgHouse from "../assets/imgLoginFondo.png";

function Registro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: ""
  });

  const handleModalOpen = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    document.getElementById('terms').checked = true;
  };

  return (
    <div className="landing-container">
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight"
        className="background-image"
      />
      <div className="overlay">
        <h1 className="form-title2">Registro</h1>
        <form className="registro-form">
          <input
            type="text"
            placeholder="Nombres"
            className="text-input"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="text-input"
          />
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="text-input"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          
          <input
            type="text"
            placeholder="Apellidos"
            className="text-input"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="text-input"
          />
          <div className="password-requirements">
            <ul>
              <li>8 caracteres mínimo</li>
              <li>Una mayúscula</li>
              <li>Un número</li>
              <li>Un caracter especial</li>
            </ul>
          </div>
          
          <input
            type="text"
            placeholder="DUI"
            className="text-input"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          <div className="fecha-container">
            <div className="fecha-nacimiento-label">Fecha de nacimiento</div>
            <div className="fecha-nacimiento-container">
              <select 
                value={selectedDate.day}
                onChange={(e) => setSelectedDate({...selectedDate, day: e.target.value})}
              >
                <option value="">Día</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
              <select 
                value={selectedDate.month}
                onChange={(e) => setSelectedDate({...selectedDate, month: e.target.value})}
              >
                <option value="">Mes</option>
                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, i) => (
                  <option key={i} value={i+1}>{month}</option>
                ))}
              </select>
              <select 
                value={selectedDate.year}
                onChange={(e) => setSelectedDate({...selectedDate, year: e.target.value})}
              >
                <option value="">Año</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
          </div>
          
          <div className="checkbox-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="terms-label" onClick={handleModalOpen}>
              Acepto los términos y condiciones
            </label>
          </div>
          
          <button className="submit-button2" type="submit">
            Regístrate
          </button>
          
          <div className="login-text">
            ¿Ya tienes una cuenta creada? <a href="/inicio-sesion">Inicia sesión</a>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Términos y condiciones - HomeClick</h2>
            <div className="terms-content">
              <p className="terms-date">Fecha de entrada en vigor: Febrero 25, 2025</p>
              
              <div className="terms-welcome">
                <p>Bienvenido a HomeClick. Al acceder y utilizar nuestra plataforma, aceptas estos Términos y Condiciones. Si no estás de acuerdo con los mismos, por favor, no utilices nuestros servicios.</p>
              </div>
              
              <div className="terms-section">
                <h3>Definiciones</h3>
                <ul>
                  <li><strong>Plataforma:</strong> El sitio web y la aplicación móvil de HomeClick.</li>
                  <li><strong>Usuario:</strong> Cualquier persona que acceda o utilice HomeClick.</li>
                  <li><strong>Contenido:</strong> Textos, imágenes, información disponible para el usuario a través de la plataforma.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Uso de la Plataforma</h3>
                <ul>
                  <li>La plataforma está diseñada exclusivamente para la compra de inmuebles y servicios relacionados.</li>
                  <li>Queda prohibido el uso de HomeClick para actividades fraudulentas.</li>
                  <li>Tenemos el derecho de suspender o eliminar cuentas que incumplan estas normas.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Registro y Seguridad de la Cuenta</h3>
                <ul>
                  <li>Para acceder a ciertas funciones, los usuarios deben registrarse.</li>
                  <li>Los usuarios son responsables de mantener la confidencialidad de sus credenciales.</li>
                  <li>HomeClick no será responsable de accesos no autorizados derivados de negligencia del usuario.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Proceso de Compra</h3>
                <ul>
                  <li>La plataforma facilita el contacto con vendedores y la visualización de propiedades.</li>
                  <li>HomeClick no es responsable de la exactitud de la información proporcionada por terceros ni de la conclusión final exitosa de las compras.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Responsabilidades y Limitaciones</h3>
                <ul>
                  <li>HomeClick no garantiza la disponibilidad continua de la plataforma ni la ausencia de errores técnicos.</li>
                  <li>No somos responsables de cualquier pérdida derivada del uso de la plataforma.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Propiedad Intelectual</h3>
                <ul>
                  <li>Todo el contenido de la plataforma (diseño, logotipos, software, etc.) es propiedad de HomeClick o de sus licenciantes.</li>
                  <li>Queda prohibida cualquier reproducción o distribución del material de HomeClick.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Modificaciones de los Términos</h3>
                <ul>
                  <li>HomeClick puede modificar estos términos en cualquier momento. Los cambios entrarán en vigor con la publicación y su uso continuado implica su aceptación de los mismos.</li>
                </ul>
              </div>
              
              <div className="terms-section">
                <h3>Ley Aplicable y Jurisdicción</h3>
                <ul>
                  <li>Estos términos se rigen por las leyes aplicables en El Salvador y cualquier disputa será resuelta en los tribunales correspondientes.</li>
                </ul>
              </div>
              
              <div className="terms-section contact">
                <h3>Contacto</h3>
                <p>Si tienes dudas sobre estos "Términos y Condiciones", contáctanos en:</p>
                <p>homeclick@gmail.com</p>
              </div>
            </div>
            
            <button className="accept-button" onClick={handleModalClose}>
              Aceptar términos y condiciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registro;