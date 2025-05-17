import React from "react";
import '../styles/EditAdminCard.css';
import editIcon from "../assets/Edit.png";
import deleteIcon from "../assets/Trash.png";
import closeIcon from '../assets/Arrow.png'; 

const EditAdminCard = ({isOpen, onClose, userData}) =>{

    if(!isOpen) return null;

    return(
        <div className="edit-admin-overlay">
            <div className="edit-admin-modal">
                <div className="modal-header">
                    <button className="back-button" onClick={onClose}>
                        <img src={closeIcon}/>
                    </button>
                </div>

                <div className="admin-info">
                    <div className="info-field">
                        <div className="field-label">Nombre completo:</div>
                        <div className="field-value">{userData?.nombre || "Nombre Nombre"}</div>
                    </div>

                    <div className="info-field">
                        <div className="field-label">Correo:</div>
                        <div className="field-value">{userData?.email || "persona@gmail.com"}</div>
                    </div>

                    <div className="info-field">
                        <div className="field-label">Contraseña:</div>
                        <div className="field-value">*****************</div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="edit-button">Editar
                        <img src={editIcon} alt="Editar" />
                    </button>
                    <button className="delete-button">Eliminar
                        <img src={deleteIcon} alt="Eliminar" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAdminCard;