import React, { useRef, useEffect } from 'react'; // Importa React, useRef para crear referencias a elementos del DOM y useEffect para gestionar efectos secundarios.
import "../styles/CodigoVerificacion.css"; // Importa los estilos CSS específicos para la página de verificación de código.
import bgImgHouseF from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática.
import useVerificationInputs from '../components/Customers/Hooks/useVerificationInputs';

// Define el componente funcional CodigoVerificacion, que representa la página para que el usuario ingrese un código de verificación enviado por correo electrónico.
function CodigoVerificacion() {

  const {inputRefs, handleInputChangeA, handleKeyDownB} = useVerificationInputs(6);

  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón para verificar el código. Navega a la página de cambio de contraseña.
  const handleChangePasswordClick = () =>{
    navigate('/changePassword');
  };

  // Renderiza la estructura de la página de verificación de código.
  return (
    <div className="verification-container-1">
      {/* Imagen de fondo de la página. */}
      <img
        src={bgImgHouseF}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image-2"
      />
      {/* Overlay que contiene el contenido principal de la verificación. */}
      <div className="verification-overlay-3">
        {/* Título de la página. */}
        <h1 className="heading-4">Verificación de Correo</h1>
        {/* Texto informativo explicando que se ha enviado un código al correo electrónico del usuario. */}
        <p className="verification-text-5">
          Hemos enviado un código de verificación a tu correo electrónico. Por favor,
          ingresa el código para continuar.
        </p>
        {/* Formulario para ingresar el código de verificación. */}
        <form className="verification-form-6">
          {/* Contenedor para los campos de entrada del código. */}
          <div className="code-input-group-7">
            {/* Cada input es un campo para un dígito del código de verificación.
                - type="text": Permite la entrada de texto (números en este caso).
                - className: Aplica estilos específicos para los campos de código.
                - maxLength="1": Limita la entrada a un solo carácter.
                - required: Asegura que el campo sea obligatorio.
                - ref: Asigna la referencia correspondiente del array 'inputRefs' a este input.
                - onChange: Llama a 'handleInputChangeA' para manejar el cambio de valor y enfocar el siguiente input.
                - onKeyDown: Llama a 'handleKeyDownB' para manejar la tecla 'Backspace' y enfocar el input anterior. */}
            <input
              type="text"
              className="code-input-8"
              maxLength="1"
              required
              ref={inputRefs[0]}
              onChange={(e) => handleInputChangeA(0, e)}
              onKeyDown={(e) => handleKeyDownB(0, e)}
            />
            <input
              type="text"
              className="code-input-9"
              maxLength="1"
              required
              ref={inputRefs[1]}
              onChange={(e) => handleInputChangeA(1, e)}
              onKeyDown={(e) => handleKeyDownB(1, e)}
            />
            <input
              type="text"
              className="code-input-10"
              maxLength="1"
              required
              ref={inputRefs[2]}
              onChange={(e) => handleInputChangeA(2, e)}
              onKeyDown={(e) => handleKeyDownB(2, e)}
            />
            {/* Separador visual entre los grupos de dígitos del código. */}
            <span className="code-separator-11">-</span>
            <input
              type="text"
              className="code-input-12"
              maxLength="1"
              required
              ref={inputRefs[3]}
              onChange={(e) => handleInputChangeA(3, e)}
              onKeyDown={(e) => handleKeyDownB(3, e)}
            />
            <input
              type="text"
              className="code-input-13"
              maxLength="1"
              required
              ref={inputRefs[4]}
              onChange={(e) => handleInputChangeA(4, e)}
              onKeyDown={(e) => handleKeyDownB(4, e)}
            />
            <input
              type="text"
              className="code-input-14"
              maxLength="1"
              required
              ref={inputRefs[5]}
              onChange={(e) => handleInputChangeA(5, e)}
              onKeyDown={(e) => handleKeyDownB(5, e)}
            />
          </div>
          {/* Botón para enviar y verificar el código ingresado. Al hacer clic, se ejecuta 'handleChangePasswordClick'. */}
          <button type="submit" className="verification-button-15" onClick={handleChangePasswordClick}>
            Verificar Código
          </button>
          {/* Enlace para reenviar el código de verificación en caso de no haberlo recibido. */}
          <p className="resend-text-16">
            ¿No recibiste el código? <a href="#" className="resend-link-17">Reenviar código</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CodigoVerificacion;