import React from 'react'; // Importa la biblioteca React para la creación de componentes.
import "../styles/RecuperarContrasena.css"; // Importa los estilos CSS específicos para la página de recuperación de contraseña.
import bgImgHouse from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import ArrowLeftIcon from "../assets/arrowRight.png"; // Importa el icono de flecha izquierda (para volver).
import LockImg from "../assets/LockIcon.png"; // Importa el icono de candado.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática.

// Define el componente funcional RecuperarContraseña, que permite al usuario solicitar un enlace para restablecer su contraseña.
function RecuperarContraseña() {
  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón de "volver". Navega a la página de inicio de sesión.
  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  // Función que se ejecuta al hacer clic en el botón de "Enviar enlace de inicio de sesión". Navega a la página de código de contraseña.
  const handlePasswordCodeClick = () =>{
    navigate('/passwordCode');
  };

  // Renderiza la estructura de la página de recuperación de contraseña.
  return (
    <div className="landing-container">
      {/* Imagen de fondo de la página. */}
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      {/* Contenedor principal para el formulario de recuperación de contraseña. */}
      <div className="form-container2">
        {/* Encabezado con el botón para volver a la página de inicio de sesión. */}
        <div className="header">
          <button className="back-button" onClick={handleLoginClick}>
            <img src={ArrowLeftIcon} alt="Volver" className="back-icon" />
          </button>
        </div>

        {/* Contenedor para el icono de candado. */}
        <div className="lock-icon-container2">
          <img src={LockImg} alt="Icono de seguridad" className="lock-icon" />
        </div>

        {/* Título principal de la página de recuperación de contraseña. */}
        <h1 className="form-title4">¿Tienes problemas para iniciar sesión?</h1>
        {/* Descripción del formulario. */}
        <p className="form-description">
          Ingresa tu correo electrónico y te enviaremos un código{"\n"}
          para que recuperes el acceso a tu cuenta
        </p>
        {/* Formulario para ingresar el correo electrónico y solicitar el enlace de restablecimiento. */}
        <form className="reset-form">
          {/* Campo de entrada para el correo electrónico. */}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="text-input"
          />
          {/* Botón para enviar el enlace de inicio de sesión (en este caso, navega a '/passwordCode'). */}
          <button className="submit-button4"  onClick={handlePasswordCodeClick}>
            Enviar enlace de inicio de sesión
          </button>
        </form>
        {/* Separador "O" entre el formulario y el enlace para crear una cuenta nueva. */}
        <div className="or-separator"><hr /> &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; <strong>O</strong> &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; <hr /></div> {/* Agrega la "O" con las líneas */}
        {/* Enlace para crear una cuenta nueva. */}
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