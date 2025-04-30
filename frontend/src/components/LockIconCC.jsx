import React from 'react';
import "../styles/Candado.css"; // Importa los estilos CSS para el componente LockIcon. Asegúrate de que la ruta al archivo Candado.css sea correcta.
import LockImg from "../assets/LockIcon.png"; // Importa la imagen del icono de candado desde la ruta especificada.

// Define el componente funcional LockIcon.
function LockIcon() {
  // Renderiza un contenedor div con la clase 'lock-icon-container'. Esta clase probablemente contiene estilos para posicionar y dar formato al icono.
  return (
    <div className="lock-icon-container">
      {/* Muestra la imagen del candado. 
          - 'src' especifica la ruta de la imagen importada.
          - 'alt' proporciona un texto alternativo para la imagen, importante para la accesibilidad (si la imagen no se carga, se mostrará este texto).
          - 'className' aplica los estilos definidos en el archivo Candado.css a la imagen. */}
      <img src={LockImg} alt="Candado" className="lock-image" />
    </div>
  );
}

// Exporta el componente LockIcon para que pueda ser utilizado en otras partes de la aplicación.
export default LockIcon;