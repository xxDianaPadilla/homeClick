import React, { useRef, useEffect } from 'react';
import "../styles/CodigoVerificacion.css";
import bgImgHouseF from "../assets/imgLoginFondo.png";
import { useNavigate } from 'react-router-dom';

function CodigoVerificacion() {
  const navigate = useNavigate();

  const handleChangePasswordClick = () =>{
    navigate('/changePassword');
  };

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChangeA = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDownB = (index, event) => {
    if (event.key === 'Backspace' && event.target.value === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  return (
    <div className="verification-container-1">
      <img
        src={bgImgHouseF}
        alt="Row of Victorian houses with warm sunlight and clear sky"
        className="background-image-2"
      />
      <div className="verification-overlay-3">
        <h1 className="heading-4">Verificación de Correo</h1>
        <p className="verification-text-5">
          Hemos enviado un código de verificación a tu correo electrónico. Por favor,
          ingresa el código para continuar.
        </p>
        <form className="verification-form-6">
          <div className="code-input-group-7">
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
          <button type="submit" className="verification-button-15" onClick={handleChangePasswordClick}>
            Verificar Código
          </button>
          <p className="resend-text-16">
            ¿No recibiste el código? <a href="#" className="resend-link-17">Reenviar código</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CodigoVerificacion;