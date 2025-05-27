import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/NavBarAdminSearch.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';
import filterIcon from '../assets/filterIcon.png';
import searchIcon from '../assets/image1.png';
import UserInfoCard from "./UserInfoCard";

const NavBarAdminSearch = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('Administrar propiedades');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = (link, path) => {
        setActiveLink(link);
        navigate(path);
        setIsMobileMenuOpen(false); // Cerrar menú móvil al hacer click
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="navbar-header">
            <div className="navbar-top">
                <div className="navbar-logo">
                    <img 
                        src={LogoHomeclick} 
                        alt="Logo de HomeClick" 
                        className="logo-image" 
                        onClick={() => handleLinkClick('Inicio', 'dashboard')} 
                        style={{ cursor: 'pointer' }} 
                    />
                </div>

                <div className="search-container2">
                    <div className="search-box">
                        <input className="search-input" placeholder="Buscar..." />
                        <button className="search-button">
                            <img src={searchIcon} alt="Buscar" className="search-icon" />
                        </button>
                    </div>

                    <button className="filter-button">Filtrar
                        <img src={filterIcon} alt="Filter" className="filter-icon" />
                    </button>
                </div>

                <div className="navbar-actions">
                    <div className="navbar-user">
                        <img 
                            src={perfil} 
                            alt="Icono de perfil de usuario" 
                            className="user-icon" 
                            onClick={toggleProfile}
                        />
                    </div>
                    
                    <button 
                        className="hamburger-button"
                        onClick={toggleMobileMenu}
                        aria-label="Menú de navegación"
                    >
                        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                        <span className={`hamburger-line ${isMobileMenuOpen ? 'active' : ''}`}></span>
                    </button>
                </div>
            </div>

            <nav className={`navbar-navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="nav-line"></div>
                <a 
                    href="/dashboard" 
                    className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('Inicio', '/dashboard');
                    }}
                >
                    Inicio
                </a>
                <a 
                    href="/propertyAdmin" 
                    className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('Administrar propiedades', '/propertyAdmin');
                    }}
                >
                    Administrar propiedades
                </a>
                <a 
                    href="/listadoVentas" 
                    className={`nav-link ${activeLink === 'Perfil de Administradores' ? 'active' : ''}`} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('Perfil de Administradores', '/listadoVentas');
                    }}
                >
                    Listado de ventas
                </a>
                <a 
                    href="/categorias" 
                    className={`nav-link ${activeLink === 'Categorías' ? 'active' : ''}`} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('Categorías', '/categorias');
                    }}
                >
                    Categorías
                </a>
                <div className="nav-line"></div>
            </nav>

            <UserInfoCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </header>
    );
};

export default NavBarAdminSearch;