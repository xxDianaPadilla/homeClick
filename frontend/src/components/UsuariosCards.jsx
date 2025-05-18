import React, {useRef, useEffect, useState} from "react";
import '../styles/Usuarios.css';
import searchIcon from '../assets/image1.png';
import EditAdminCard from "../components/EditAdminCard";
import useUsuarios from "./Administrators/Hooks/useUsuariosCards";

const UsuariosCards = () => {

    const {usuarios, showEditModal, selectedUser, handleCardClick, closeModal} = useUsuarios();

    return(
        <div className="administradores-section">
            <div className="admin-header">
                <h2>Administradores</h2>
                <button className="btn-crear-admin">Crear administrador</button>
            </div>

            <div className="search-bar">
                <div className="search-icon">
                    <img src={searchIcon} alt="Buscar" />
                </div>
                <input placeholder="Buscar..." className="search-input"/>
            </div>

            <div className="admin-list">
                {usuarios.map((usuario) => (
                    <div key={usuario.id} className="admin-card" onClick={() => handleCardClick(usuario)}>
                        <span className="admin-nombre">{usuario.nombre}</span>
                        <span className="admin-email">{usuario.email}</span>
                    </div>
                ))}
            </div>

            <EditAdminCard isOpen={showEditModal} onClose={closeModal} userData={selectedUser}/>
        </div>
    );
};

export default UsuariosCards;