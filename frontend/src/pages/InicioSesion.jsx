import { useState } from 'react'; // Importa el hook useState para gestionar el estado local del componente.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática entre rutas.
import "../styles/InicioSesion.css"; // Importa el archivo CSS que contiene los estilos específicos para la página de inicio de sesión.
import bgImgHouse from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página de inicio de sesión.

// Define el componente funcional InicioSesion, que representa la página de inicio de sesión de la aplicación.
function InicioSesion() {
  // Estado local para controlar la visibilidad de la contraseña (mostrar u ocultar). Inicialmente se establece en 'false' (oculta).
  const [showPassword, setShowPassword] = useState(false);
  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el enlace de registro. Navega a la página de registro.
  const handleRegisterClick = () => {
    navigate('/registro');
  };

  // Función que se ejecuta al hacer clic en el enlace de "¿Olvidaste tu contraseña?". Navega a la página de recuperación de contraseña.
  const handleRecuperarContrasenaClick = () => {
    navigate('/recuperarContrasena');
  };

  // Función que se ejecuta al hacer clic en el botón de "Iniciar sesión". Navega a la página principal (landingPage).
  const handleLandingPageClick = () => {
    navigate('/landingPage');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  // Renderiza la estructura de la página de inicio de sesión.
  return (
    <div className="landing-container">
      {/* Imagen de fondo de la página de inicio de sesión. */}
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      {/* Contenedor principal para el formulario de inicio de sesión. */}
      <div className="form-container2">
        {/* Título principal del formulario de inicio de sesión. */}
        <h1 className="form-title">Inicio de sesión</h1>
        {/* Formulario de inicio de sesión. */}
        <form className="login-form">
          {/* Campo de entrada para el correo electrónico. */}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          {/* Contenedor para el campo de contraseña y el icono para mostrar/ocultar la contraseña. */}
          <div className="password-container">
            {/* Campo de entrada para la contraseña. El tipo de input se cambia dinámicamente entre "password" y "text" basado en el estado 'showPassword'. */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="text-input"
            />
            {/* Span que actúa como un botón para mostrar u ocultar la contraseña. El atributo 'aria-label' mejora la accesibilidad. */}
            <span
              className="password-toggle"
              aria-label="Mostrar contraseña"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* Icono de un ojo SVG para indicar la acción de mostrar/ocultar la contraseña. */}
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          {/* Contenedor para la opción de "Mantener sesión iniciada" y el enlace de "¿Olvidaste tu contraseña?". */}
          <div className="remember-forgot">
            {/* Label para la casilla de verificación de "Mantener sesión iniciada". */}
            <label className="remember-me">
              <input type="checkbox" />
              Mantener sesión iniciada
            </label>
            {/* Enlace para la página de recuperación de contraseña. Al hacer clic, se ejecuta 'handleRecuperarContrasenaClick'. */}
            <a href="" className="forgot-password" onClick={handleRecuperarContrasenaClick}>¿Olvidaste tu contraseña?</a>
          </div>
          {/* Botón para iniciar sesión. Al hacer clic, se ejecuta 'handleLandingPageClick'. */}
          <button className="submit-button4" type="submit" onClick={handleDashboard}>
            Iniciar sesión
          </button>
          {/* Sección para usuarios que no tienen una cuenta, con un enlace a la página de registro. Al hacer clic, se ejecuta 'handleRegisterClick'. */}
          <div className="no-account">
            ¿No tienes una cuenta? <a href="" className="register-link" onClick={handleRegisterClick}>Regístrate</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InicioSesion;