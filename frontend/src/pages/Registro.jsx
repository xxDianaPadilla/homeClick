import React, { useState } from 'react'; // Importa React y el hook useState para gestionar el estado local.
import "../styles/Registro.css"; // Importa los estilos CSS específicos para la página de registro.
import bgImgHouse from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import { usePasswordToggle } from '../components/Customers/Hooks/usePasswordToggle';
import useBirthDate from '../components/Customers/Hooks/useBirthDate';
import useTermsModal from '../components/Customers/Hooks/useTermsModal';

// Define el componente funcional Registro, que permite a los usuarios crear una nueva cuenta.
function Registro() {
  // Estado para controlar la visibilidad de la contraseña (mostrar u ocultar).
  const {showPassword, togglePasswordVisibility } = usePasswordToggle();
  const {showModal, handleModalOpen, handleModalClose} = useTermsModal();
  const {selectedDate} = useBirthDate();

  // Renderiza la estructura de la página de registro.
  return (
    <div className="landing-container">
      {/* Imagen de fondo de la página de registro. */}
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight"
        className="background-image"
      />
      {/* Contenedor con un posible overlay para mejorar la legibilidad del texto sobre la imagen. */}
      <div className="overlay">
        {/* Título principal del formulario de registro. */}
        <h1 className="form-title2">Registro</h1>
        {/* Formulario de registro. */}
        <form className="registro-form">
          {/* Campo de entrada para el nombre. */}
          <input
            type="text"
            placeholder="Nombres"
            className="text-input"
          />
          {/* Campo de entrada para el teléfono. */}
          <input
            type="text"
            placeholder="Teléfono"
            className="text-input"
          />
          {/* Contenedor para el campo de contraseña y el icono para mostrar/ocultar la contraseña. */}
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="text-input"
            />
            {/* Icono de ojo para mostrar/ocultar la contraseña. */}
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>

          {/* Campo de entrada para los apellidos. */}
          <input
            type="text"
            placeholder="Apellidos"
            className="text-input"
          />
          {/* Campo de entrada para la dirección. */}
          <input
            type="text"
            placeholder="Dirección"
            className="text-input"
          />
          {/* Lista de requisitos para la contraseña. */}
          <div className="password-requirements">
            <ul>
              <li>8 caracteres mínimo</li>
              <li>Una mayúscula</li>
              <li>Un número</li>
              <li>Un caracter especial</li>
            </ul>
          </div>

          {/* Campo de entrada para el DUI (Documento Único de Identidad). */}
          <input
            type="text"
            placeholder="DUI"
            className="text-input"
          />
          {/* Campo de entrada para el correo electrónico. */}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          {/* Contenedor para la selección de la fecha de nacimiento. */}
          <div className="fecha-container">
            <div className="fecha-nacimiento-label">Fecha de nacimiento</div>
            <div className="fecha-nacimiento-container">
              {/* Selector para el día de nacimiento. */}
              <select
                value={selectedDate.day}
                onChange={(e) => setSelectedDate({...selectedDate, day: e.target.value})}
              >
                <option value="">Día</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
              {/* Selector para el mes de nacimiento. */}
              <select
                value={selectedDate.month}
                onChange={(e) => setSelectedDate({...selectedDate, month: e.target.value})}
              >
                <option value="">Mes</option>
                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, i) => (
                  <option key={i} value={i+1}>{month}</option>
                ))}
              </select>
              {/* Selector para el año de nacimiento. */}
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

          {/* Casilla de verificación para aceptar los términos y condiciones. */}
          <div className="checkbox-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms" className="terms-label" onClick={handleModalOpen}>
              Acepto los términos y condiciones
            </label>
          </div>

          {/* Botón para enviar el formulario de registro. */}
          <button className="submit-button2" type="submit">
            Regístrate
          </button>

          {/* Enlace para iniciar sesión si ya se tiene una cuenta. */}
          <div className="login-text">
            ¿Ya tienes una cuenta creada? <a href="/inicio-sesion">Inicia sesión</a>
          </div>
        </form>
      </div>

      {/* Modal para mostrar los términos y condiciones, se muestra condicionalmente. */}
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

            {/* Botón para aceptar los términos y condiciones y cerrar el modal. */}
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