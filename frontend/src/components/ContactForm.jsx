import React, { useState } from "react";
import '../styles/ContactForm.css'; // Importa los estilos CSS para este componente
import closeIcon from '../assets/image10.png'; // Importa la imagen del icono de cerrar
import useContactForm from './Customers/Hooks/useContactForm';

// Define el componente funcional ContactForm, que recibe una prop 'onClose' para manejar el cierre del formulario
const ContactForm = ({ onClose }) => {

  const initialState = {
    email: '',
    name: '',
    phone: '',
    message: ''
  };

  const {formData, handleChange, handleSubmit} = useContactForm(
    initialState,
    () => onClose()
  );

  // Renderiza el componente del formulario de contacto
  return (
    <div className="contact-form-overlay">
      <div className="contact-form-container">
        <div className="contact-form-header">
          <h2>Formulario de contacto</h2>
          <button className="close-button" onClick={onClose}>
            <img src={closeIcon} alt="Cerrar" />
          </button>
        </div>

        <p className="contact-subtitle">Enviar mensaje al vendedor</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group4">
            <input
              className="inputs"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Dirección de correo electrónico"
              required
            />
          </div>

          <div className="form-group4">
            <input
              className="inputs"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>

          <div className="form-group4">
            <input
              className="inputs"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Número de teléfono"
              required
            />
          </div>

          <div className="form-group4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensaje..."
              rows="4"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="send-button">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;