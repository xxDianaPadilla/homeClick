import React from "react";
import '../styles/UserInfoCard.css';
import closeIcon from '../assets/image10.png';
import profileIcon from '../assets/image9.png';
import cameraIcon from '../assets/image11.png';


const UserInfoCard = ({isOpen, onClose}) =>{

    if(!isOpen) return null;

    return(
        <div className="user-info-overlay">
            <div className="user-info-card">
                <div className="card-header">
                    <button className="close-button" onClick={onClose}>
                        <img src={closeIcon} alt="Cerrar" />
                    </button>
                </div>

                <div className="profile-section">
                    <div className="profile-image-container">
                        <div className="profile-image">
                            <img src={profileIcon} alt="Perfil" />
                        </div>
                        <div className="camera-icon">
                            <img src={cameraIcon} alt="Cambiar foto" />
                        </div>
                    </div>
                    <h3 className="profile-name">Juan Pablo Rodriguez López</h3>
                </div>

                <div className="info-section">
                    <h4>Información básica</h4>

                    <div className="info-field">
                        <label>Fecha de nacimiento</label>
                        <input type="text" defaultValue="1999-07-14"/>
                    </div>
                    <div className="info-field">
                        <label>Dirección</label>
                        <input type="text" defaultValue="Calle #21 San Salvador" />
                    </div>
                    <div className="info-field">
                        <label>DUI</label>
                        <input type="text" defaultValue="12345678-9"/>
                    </div>
                </div>

                <div className="info-section">
                    <h4>Información de contacto</h4>

                    <div className="info-field">
                        <label>Correo electrónico</label>
                        <input type="email" defaultValue="jp@example.com"/>
                    </div>

                    <div className="info-field">
                        <label>Teléfono</label>
                        <input type="tel" defaultValue="1234-5678"/>
                    </div>
                </div>

                <div className="info-section">
                    <h4>Presupuestos</h4>

                    <div className="budget-field">
                        <div className="budget-input">
                            <label>Min.</label>
                            <input type="text" />
                        </div>
                        <div className="budget-input">
                            <label>Max.</label>
                            <input type="text" />
                        </div>
                    </div>
                </div>

                <div className="button-section">
                    <button className="update-profile-btn">Actualizar perfil</button>
                    <button className="close-session-btn">Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;