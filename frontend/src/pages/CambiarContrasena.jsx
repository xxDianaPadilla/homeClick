import React from "react"; // Importa la biblioteca React para la creación de componentes.
import "../styles/CambiarContrasena.css"; // Importa el archivo CSS que contiene los estilos específicos para la página de cambiar contraseña.
import bgImgHouse from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import LockIcon from "../components/LockIconCC.jsx"; // Importa el componente LockIcon, probablemente un icono de candado estilizado, desde la ruta especificada. La extensión '.jsx' sugiere que es un componente React.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática.

// Define el componente funcional CambiarContrasena, que representa la página para que el usuario cambie su contraseña.
function CambiarContrasena() {
  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón para confirmar el cambio de contraseña. Navega a la página de contraseña cambiada exitosamente.
  const handleChangedPasswordClick = () => {
    navigate('/changedPassword');
  };

  // Renderiza la estructura de la página de cambiar contraseña.
  return (
    <div className="landing-container">
      {/* Imagen de fondo de la página. */}
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      {/* Contenedor para el formulario de cambiar contraseña. */}
      <div className="form-container2">
        {/* Renderiza el componente LockIcon, probablemente mostrando un icono de candado en la parte superior del formulario. */}
        <LockIcon />
        {/* Título principal del formulario. */}
        <h1 className="form-title">Cambiar Contraseña</h1>
        {/* Descripción o instrucciones para el usuario sobre los requisitos de la nueva contraseña. */}
        <p className="form-description">
          La contraseña debe tener al menos 6 caracteres e inlcuir
          una combinación de números, letras y caracteres
          especiales (!$@%).
        </p>
        {/* Formulario para que el usuario ingrese y repita su nueva contraseña. */}
        <form className="change-password-form">
          {/* Campo de entrada para la nueva contraseña. */}
          <input
            type="password"
            placeholder="Contraseña nueva"
            className="text-input"
          />
          {/* Campo de entrada para repetir la nueva contraseña, asegurando que el usuario la haya ingresado correctamente. */}
          <input
            type="password"
            placeholder="Repetir contraseña nueva"
            className="text-input"
          />
          {/* Botón de envío del formulario para cambiar la contraseña. Al hacer clic, se ejecuta la función 'handleChangedPasswordClick'. */}
          <button className="submit-button" type="submit" onClick={handleChangedPasswordClick}>
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

export default CambiarContrasena;