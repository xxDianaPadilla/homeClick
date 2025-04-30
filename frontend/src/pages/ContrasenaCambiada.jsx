import React from 'react'; // Importa la biblioteca React para la creación de componentes.
import "../styles/ContrasenaCambiada.css"; // Importa el archivo CSS que contiene los estilos específicos para la página de contraseña cambiada.
import bgImgHouse from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática.

// Define el componente funcional ContrasenaCambiada, que representa la página que se muestra después de que la contraseña del usuario ha sido cambiada exitosamente.
function ContrasenaCambiada() {
  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón "Aceptar". Navega a la página de inicio de sesión.
  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  // Renderiza la estructura de la página de contraseña cambiada.
  return (
    <div className="landing-container">
      {/* Imagen de fondo de la página. */}
      <img
        src={bgImgHouse}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image"
      />
      {/* Contenedor para el mensaje de éxito y el botón para volver a la página de inicio de sesión. */}
      <div className="password-changed-container">
        {/* Título principal indicando que la contraseña se cambió correctamente. */}
        <h1 className="title">Contraseña cambiada correctamente</h1>
        {/* Mensaje descriptivo que indica al usuario que debe iniciar sesión nuevamente para verificar las nuevas credenciales. */}
        <p className="description">
          Vuelva a iniciar sesión<br/>
          para poder verificar que las
          nuevas credenciales funcionen.
        </p>
        {/* Botón para que el usuario vuelva a la página de inicio de sesión. Al hacer clic, se ejecuta la función 'handleLoginClick'. */}
        <button className="accept-button" onClick={handleLoginClick}>Aceptar</button>
      </div>
    </div>
  );
}

export default ContrasenaCambiada;