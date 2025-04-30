import React, { useRef, useEffect } from 'react'; // Importa React, useRef para crear referencias a elementos del DOM y useEffect para gestionar efectos secundarios.
import "../styles/CodigoVerificacion.css"; // Importa los estilos CSS específicos para la página de verificación de código.
import bgImgHouseF from "../assets/imgLoginFondo.png"; // Importa la imagen de fondo para la página.
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática.

// Define el componente funcional CodigoVerificacion, que representa la página para que el usuario ingrese un código de verificación enviado por correo electrónico.
function CodigoVerificacion() {
  // Utiliza el hook useNavigate para obtener la función 'navigate', que permite redirigir al usuario a otras rutas.
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón para verificar el código. Navega a la página de cambio de contraseña.
  const handleChangePasswordClick = () =>{
    navigate('/changePassword');
  };

  // Crea un array de referencias (refs) para cada uno de los campos de entrada del código de verificación. Esto permite manipular directamente los elementos del DOM.
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Función que se ejecuta cuando cambia el valor de un campo de entrada del código.
  const handleInputChangeA = (index, event) => {
    // Obtiene el valor del campo de entrada actual.
    const { value } = event.target;
    // Si el valor tiene un solo carácter y no es el último campo de entrada, enfoca el siguiente campo.
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Función que se ejecuta al presionar una tecla en un campo de entrada del código.
  const handleKeyDownB = (index, event) => {
    // Si la tecla presionada es 'Backspace', el campo actual está vacío y no es el primer campo, enfoca el campo anterior.
    if (event.key === 'Backspace' && event.target.value === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Hook useEffect que se ejecuta solo una vez después del primer renderizado del componente.
  useEffect(() => {
    // Si existe el primer campo de entrada (la referencia no es null), establece el foco en él.
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []); // El array de dependencias vacío asegura que este efecto se ejecute solo una vez.

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