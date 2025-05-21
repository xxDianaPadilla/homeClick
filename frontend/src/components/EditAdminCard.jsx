import React from "react";
import '../styles/EditAdminCard.css';
import editIcon from "../assets/Edit.png";
import deleteIcon from "../assets/Trash.png";
import closeIcon from '../assets/Arrow.png'; 
import useEditAdminCard from "./Administrators/Hooks/useEditAdminCard";

const EditAdminCard = ({isOpen, onClose, userData}) =>{

    const {isEditable, formData, handleEdit, handleChange} = useEditAdminCard(isOpen, onClose, userData);

    if(!isOpen) return null;

    return(
        <div className="edit-admin-overlay">
            <div className="edit-admin-modal">
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
                            value={formData.nombre}
                            onChange={handleChange}
                            readOnly={!isEditable}
                        />
                    </div>
                    
                    <div className="info-field">
                        <div className="field-label">Correo:</div>
                        <input 
                            type="email"
                            name="email"
                            className="field-value input-field"
                            value={formData.email}
                            onChange={handleChange}
                            readOnly={!isEditable}
                        />
                    </div>
                    
                    <div className="info-field">
                        <div className="field-label">Contraseña:</div>
                        <input 
                            type="password"
                            name="password"
                            className="field-value input-field"
                            value={formData.password}
                            onChange={handleChange}
                            readOnly={!isEditable}
                        />
                    </div>
                </div>
                
                <div className="action-buttons">
                    <button className="edit-button" onClick={handleEdit}>
                        {isEditable ? "Guardar" : "Editar"}
                        <img src={editIcon} alt="Editar" />
                    </button>
                    <button className="delete-button">
                        Eliminar
                        <img src={deleteIcon} alt="Eliminar" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAdminCard;