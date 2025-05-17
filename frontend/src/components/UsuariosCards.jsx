import React, {useRef, useEffect, useState} from "react";
import '../styles/Usuarios.css';
import searchIcon from '../assets/image1.png';

const UsuariosCards = () => {

    const [usuarios, setUsuarios] = useState([
        {id: 1, nombre: "Rolando Perez, Juan Emilio", email: "juanemilio@gmail.com"},
        {id: 2, nombre: "Esposito Galdamez, Joana Alexandra", email: "joanaesposito@gmail.com"},
        {id: 3, nombre: "Rolando Perez, Juan Emilio", email: "juanemilio@gmail.com"},
        {id: 4, nombre: "Esposito Galdamez, Joana Alexandra", email: "joanaesposito@gmail.com"},
        {id: 5, nombre: "Rolando Perez, Juan Emilio", email: "juanemilio@gmail.com"},
        {id: 6, nombre: "Esposito Galdamez, Joana Alexandra", email: "joanaesposito@gmail.com"},
    ]);

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
                    <div key={usuario.id} className="admin-card">
                        <span className="admin-nombre">{usuario.nombre}</span>
                        <span className="admin-email">{usuario.email}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsuariosCards;