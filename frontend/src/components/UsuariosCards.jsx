import React, {useRef, useEffect, useState} from "react";
import '../styles/Usuarios.css';
import searchIcon from '../assets/image1.png';
import EditAdminCard from "../components/EditAdminCard";
import useUsuarios from "./Administrators/Hooks/useUsuariosCards";
import AddAdminCard from "./AddAdminCard";
import useAddPropertyCard from "./Administrators/Hooks/useAddPropertyCard";

const UsuariosCards = () => {

    const {usuarios, showEditModal, selectedUser, handleCardClick, closeModal} = useUsuarios();
    const {isAddModalOpen, openAddModal, closeAddModal} = useAddPropertyCard();

    return(
        <div className="administradores-section">
            <div className="admin-header">
                <h2>Listado de ventas</h2>
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
                        <span className="admin-nombre">{usuario.nombreCasa}</span>
                        <span className="admin-email">{usuario.estado}</span>
                    </div>
                ))}
            </div>

            <EditAdminCard isOpen={showEditModal} onClose={closeModal} userData={selectedUser}/>
            <AddAdminCard isOpen={isAddModalOpen} onClose={closeAddModal}/>
        </div>
    );
};

export default UsuariosCards;