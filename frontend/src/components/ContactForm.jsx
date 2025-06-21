import React, { useEffect } from "react";
import '../styles/ContactForm.css';
import closeIcon from '../assets/image10.png';
import useContactForm from './Customers/Hooks/useContactForm';
import useCustomerInfo from "./Customers/Hooks/useCustomerInfo";
import { useAuth } from "../context/AuthContext";

const ContactForm = ({ onClose, propertyName = '' }) => {
  const { isAuthenticated } = useAuth();
  const { customerInfo, loading: customerLoading, isCustomer, error } = useCustomerInfo();

  const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    message: ''
  };

  const { formData, isSubmitting, handleChange, handleSubmit, updateFormData } = useContactForm(
    initialState,
    () => onClose(),
    propertyName
  );

  useEffect(() => {
    console.log('ContactForm - customerInfo:', customerInfo);
    console.log('ContactForm - isCustomer:', isCustomer);
    console.log('ContactForm - customerLoading:', customerLoading);
  }, [customerInfo, isCustomer, customerLoading]);

  useEffect(() => {
    if (customerInfo && isCustomer && !customerLoading) {
      console.log('Updating form with customer data:', customerInfo);
      
      updateFormData({
        email: customerInfo.email || '',
        firstName: customerInfo.firstName || customerInfo.name || '', 
        lastName: customerInfo.lastName || customerInfo.surname || '', 
        phone: customerInfo.phone || customerInfo.phoneNumber || '' 
      });
    }
  }, [customerInfo, isCustomer, customerLoading, updateFormData]);

  if (customerLoading && isAuthenticated) {
    return (
      <div className="contact-form-overlay">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <h2>Formulario de contacto</h2>
            <button className="close-button" onClick={onClose}>
              <img src={closeIcon} alt="Cerrar" />
            </button>
          </div>
          <div className="loading-message">
            Cargando información del usuario...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-overlay">
      <div className="contact-form-container">
        <div className="contact-form-header">
          <h2>Formulario de contacto</h2>
          <button className="close-button" onClick={onClose}>
            <img src={closeIcon} alt="Cerrar" />
          </button>
        </div>

        <p className="contact-subtitle">
          {propertyName
            ? `Enviar mensaje sobre: ${propertyName}`
            : "Enviar mensaje al administrador"
          }
        </p>

        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group4">
            <input
              className="inputs"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Dirección de correo electrónico"
              disabled={isCustomer && customerInfo} 
              required
            />
          </div>

          <div className="form-group4">
            <input
              className="inputs"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nombre"
              disabled={isCustomer && customerInfo} 
              required
            />
          </div>

          <div className="form-group4">
            <input
              className="inputs"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              disabled={isCustomer && customerInfo} 
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
              disabled={isCustomer && customerInfo} 
              required
            />
          </div>

          <div className="form-group4">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows="4"
              required
            ></textarea>
          </div>

          {isCustomer && customerInfo && (
            <div className="form-info">
              <small>
                ℹ️ Los campos de información personal se llenan automáticamente con tu perfil.
              </small>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="send-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;