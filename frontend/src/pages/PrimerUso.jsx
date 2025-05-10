import { useState } from 'react'; // Importa el hook useState para gestionar el estado local de los componentes.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática entre rutas.
import "../styles/PrimerUso.css"; // Importa el archivo CSS que contiene los estilos específicos para la página de primer uso.
import bgImgHouse from "../assets/imgLoginFondo.png" // Importa la imagen de fondo para la página.

// Define el componente funcional PrimerUso, que representa la página que se muestra al usuario en su primer uso de la aplicación.
function PrimerUso() {
  // Estado local para controlar la visibilidad de la primera contraseña (mostrar u ocultar). Inicialmente se establece en 'false' (oculta).
  const [showPassword1, setShowPassword1] = useState(false);
  // Estado local para controlar la visibilidad de la segunda contraseña (mostrar u ocultar). Inicialmente se establece en 'false' (oculta).
  const [showPassword2, setShowPassword2] = useState(false);
  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario. En este caso, simplemente navega a la página de inicio de sesión.
  const handleSubmit = (e) => {
    // Previene el comportamiento por defecto del formulario (recargar la página).
    e.preventDefault();
    // Navega a la ruta '/inicio-sesion'.
    navigate('/inicio-sesion');
  };

  // Renderiza la estructura de la página de primer uso.
  return (
    <div className="landing-container">
      {/* Imagen de fondo de la página. */}
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      {/* Contenedor principal para el formulario de primer uso. */}
      <div className="form-container2">
        {/* Título principal de la página de primer uso. */}
        <h1 className="form-title3">Primer uso</h1>
        {/* Formulario para que el usuario cree una nueva cuenta (aunque la lógica de creación no está implementada aquí). */}
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Campo de entrada para el correo electrónico. */}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          {/* Contenedor para el campo de la primera contraseña y el icono para mostrar/ocultar. */}
          <div className="password-container">
            {/* Campo de entrada para la primera contraseña. El tipo se cambia dinámicamente con 'showPassword1'. */}
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Contraseña"
              className="text-input"
            />
            {/* Span que actúa como botón para mostrar/ocultar la primera contraseña. */}
            <span
              className="password-toggle"
              aria-label="Mostrar contraseña"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {/* Icono de ojo SVG para mostrar/ocultar la contraseña. */}
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          {/* Contenedor para el campo de la segunda contraseña (confirmación) y el icono para mostrar/ocultar. */}
          <div className="password-container">
            {/* Campo de entrada para la segunda contraseña. El tipo se cambia dinámicamente con 'showPassword2'. */}
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Contraseña"
              className="text-input"
            />
            {/* Span que actúa como botón para mostrar/ocultar la segunda contraseña. */}
            <span
              className="password-toggle"
              aria-label="Mostrar contraseña"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {/* Icono de ojo SVG para mostrar/ocultar la contraseña. */}
              <svg className="eye-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
          {/* Botón para crear la cuenta. Al hacer clic, se envía el formulario (y en este caso, se navega a '/inicio-sesion'). */}
          <button className="submit-button3">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default PrimerUso;