import React from "react";
import '../styles/UserInfoCard.css';
import closeIcon from '../assets/image10.png';
import profileIcon from '../assets/image9.png';
import cameraIcon from '../assets/image11.png';
import { useLocation, useNavigate } from 'react-router-dom';

const UserInfoCard = ({isOpen, onClose}) =>{
    const location = useLocation();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/inicio-sesion');
      };

    if(!isOpen) return null;

    return(
        <div className="user-info-overlay8">
            <div className="user-info-card8">
                <div className="card-header8">
                    <button className="close-button8" onClick={onClose}>
                        <img src={closeIcon} alt="Cerrar" />
                    </button>
                </div>

                <div className="profile-section8">
                    <div className="profile-image-container8">
                        <div className="profile-image8">
                            <img src={profileIcon} alt="Perfil" />
                        </div>
                        <div className="camera-icon8">
                            <img src={cameraIcon} alt="Cambiar foto" />
                        </div>
                    </div>
                    <h3 className="profile-name8">Juan Pablo Rodriguez López</h3>
                </div>

                <div className="info-section8">
                    <h4>Información básica</h4>

                    <div className="info-field8">
                        <label>Fecha de nacimiento</label>
                        <input  defaultValue="1999-07-14"/>
                    </div>
                    <div className="info-field8">
                        <label>Dirección</label>
                        <input  defaultValue="Calle #21 San Salvador" />
                    </div>
                    <div className="info-field8">
                        <label>DUI</label>
                        <input  defaultValue="12345678-9"/>
                    </div>
                </div>

                <div className="info-section8">
                    <h4>Información de contacto</h4>

                    <div className="info-field8">
                        <label>Correo electrónico</label>
                        <input defaultValue="jp@example.com"/>
                    </div>

                    <div className="info-field8">
                        <label>Teléfono</label>
                        <input  defaultValue="1234-5678"/>
                    </div>
                </div>

                <div className="info-section8">
                    <h4>Presupuestos</h4>

                    <div className="budget-field8">
                        <div className="budget-input8">
                            <label>Min.</label>
                            <input />
                        </div>
                        <div className="budget-input8">
                            <label>Max.</label>
                            <input/>
                        </div>
                    </div>
                </div>

                <div className="button-section8">
                    <button className="update-profile-btn8">Actualizar perfil</button>
                    <button className="close-session-btn8" onClick={handleLoginClick}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;