import React from "react";
import '../styles/AddAdminCard.css';
import addIcon from '../assets/mas.png'; 
import closeIcon from '../assets/Arrow.png'; 

const AddAdminCard = ({isOpen, onClose}) => {

    if(!isOpen) return null;

    return(
        <div className="add-admin-overlay">
                    <div className="add-admin-modal">
                        <div className="modal-header">
                            <button className="back-button" onClick={onClose}>
                                <img src={closeIcon} alt="Cerrar"/>
                            </button>
                        </div>
                        
                        <div className="admin-info">
                            <div className="info-field">
                                <div className="field-label">Nombre completo:</div>
                                <input 
                                    type="text"
                                    name="nombre"
                                    className="field-value input-field"
                                />
                            </div>
                            
                            <div className="info-field">
                                <div className="field-label">Correo:</div>
                                <input 
                                    type="email"
                                    name="email"
                                    className="field-value input-field"
                                />
                            </div>
                            
                            <div className="info-field">
                                <div className="field-label">Contraseña:</div>
                                <input 
                                    type="password"
                                    name="password"
                                    className="field-value input-field"
                                />
                            </div>
                        </div>
                        
                        <div className="action-buttons">
                            <button className="add-button">
                                Crear administrador
                                <img src={addIcon} alt="Crear" />
                            </button>
                        </div>
                    </div>
                </div>
    );
};

export default AddAdminCard;