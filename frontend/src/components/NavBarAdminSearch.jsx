import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import "../styles/NavBarAdminSearch.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';
import filterIcon from '../assets/filterIcon.png';
import searchIcon from '../assets/image1.png';

const NavBarAdminSearch = () =>{

    const [activeLink, setActiveLink] = useState('Administrar propiedades');
    const navigate = useNavigate();

    const handleLinkClick = (link, path) => {
        setActiveLink(link);
        navigate(path);
    };


    return(
        <header className="navbar-header">
            <div className="navbar-top">
                <div className="navbar-logo">
                    <img src={LogoHomeclick} alt="Logo de HomeClick" className="logo-image" onClick={() => handleLinkClick('Inicio', 'dashboard')} style={{cursor: 'pointer'}}/>
                </div>

                <div className="search-container2">
                    <div className="search-box">
                        <input  className="search-input" placeholder=""/>
                        <button className="search-button">
                            <img src={searchIcon} alt="Buscar" className="search-icon"/>
                        </button>
                    </div>

                    <button className="filter-button">Filtrar
                        <img src={filterIcon} alt="Filter" className="filter-icon"/>
                    </button>
                </div>

                <div className="navbar-user">
                    <img src={perfil} alt="Icono de perfil de usuario" className="user-icon"/>
                </div>
            </div>

            <nav className="navbar-navigation">
                <div className="nav-line"></div>
                <a href="/dashboard" className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`} onClick={() => handleLinkClick('Inicio', '/dashboard')}>Inicio</a>
                <a href="/propertyAdmin" className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`} onClick={() => handleLinkClick('Administrar propiedades', '/propertyAdmin')}>Administrar propiedades</a>
                <a href="/usuariosAdmin" className={`nav-link ${activeLink === 'Perfil de Administradores' ? 'active' : ''}`} onClick={() => handleLinkClick('Perfil de Administradores', '/usuariosAdmin')}>Perfil de Administradores</a>
                <div className="nav-line"></div>
            </nav>
        </header>
    );
};

export default NavBarAdminSearch;