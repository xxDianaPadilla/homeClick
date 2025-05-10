import React, { useState } from "react";
import "../styles/NavBarAdminSearch.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';
import filterIcon from '../assets/filterIcon.png';
import searchIcon from '../assets/image1.png';

const NavBarAdminSearch = () =>{

    const [activeLink, setActiveLink] = useState('Administrar propiedades');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };


    return(
        <header className="navbar-header">
            <div className="navbar-top">
                <div className="navbar-logo">
                    <img src={LogoHomeclick} alt="Logo de HomeClick" className="logo-image"/>
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
                <a href="#" className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`} onClick={() => handleLinkClick('Inicio')}>Inicio</a>
                <a href="#" className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`} onClick={() => handleLinkClick('Administrar propiedades')}>Administrar propiedades</a>
                <a href="#" className={`nav-link ${activeLink === 'Perfil de Administradores' ? 'active' : ''}`} onClick={() => handleLinkClick('Perfil de Administradores')}>Perfil de Administradores</a>
                <div className="nav-line"></div>
            </nav>
        </header>
    );
};

export default NavBarAdminSearch;