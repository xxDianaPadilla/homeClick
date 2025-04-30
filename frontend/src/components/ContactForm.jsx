import React, { useState } from "react";
import '../styles/ContactForm.css'; // Importa los estilos CSS para este componente
import closeIcon from '../assets/image10.png'; // Importa la imagen del icono de cerrar

// Define el componente funcional ContactForm, que recibe una prop 'onClose' para manejar el cierre del formulario
const ContactForm = ({ onClose }) => {
  // Define un estado local 'formData' para gestionar los valores de los campos del formulario
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    message: ''
  });

  // Función para actualizar el estado 'formData' cuando cambia el valor de un campo del formulario
  const handleChange = (e) => {
    // Obtiene el nombre y el valor del elemento que disparó el evento (el input o textarea)
    const { name, value } = e.target;
    // Actualiza el estado 'formData' utilizando la función de actualización de estado
    setFormData(prevState => ({
      // Mantiene los valores anteriores del estado
      ...prevState,
      // Actualiza el valor del campo específico cuyo nombre coincide con 'name'
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    // Previene el comportamiento predeterminado del envío del formulario (recargar la página)
    e.preventDefault();
    // Simula el envío del formulario mostrando los datos en la consola
    console.log('Formulario enviado:', formData);

    // Llama a la función 'onClose' proporcionada como prop para cerrar el formulario
    onClose();
  };

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