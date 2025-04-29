import React, { useState } from "react";
import '../styles/ContactForm.css';
import closeIcon from '../assets/image10.png';

const ContactForm = ({onClose}) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Formulario enviado:', formData);

        onClose();
    }; 
    return(
        <div className="contact-form-overlay">
            <div className="contact-form-container">
                <div className="contact-form-header">
                    <h2>Formulario de contacto</h2>
                    <button className="close-button" onClick={onClose}>
                        <img src={closeIcon} alt="Cerrar" />
                    </button>
                </div>

                <p className="contact-subtitle">Emviar mensaje al vendedor</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group4">
                        <input className="inputs" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Dirección de correo electrónico" required/>
                    </div>

                    <div className="form-group4">
                        <input className="inputs" type="text"  value={formData.name} onChange={handleChange} placeholder="Nombre" required/>
                    </div>

                    <div className="form-group4">
                        <input className="inputs" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de teléfono" required/>
                    </div>

                    <div className="form-group4">
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mensaje..." rows="4"></textarea>
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