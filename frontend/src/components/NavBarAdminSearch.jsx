import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/NavBarAdminSearch.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';
import searchIcon from '../assets/image1.png';
import UserInfoCard from "./UserInfoCard";

const NavBarAdminSearch = ({ onSearch, searchValue, setSearchValue }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('Administrar propiedades');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [localSearchValue, setLocalSearchValue] = useState(searchValue || '');
    const navigate = useNavigate();

    useEffect(() => {
        setLocalSearchValue(searchValue || '');
    }, [searchValue]);

    const handleLinkClick = (link, path) => {
        setActiveLink(link);
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    const clearSearch = () => {
        setSearchValue('');
        onSearch('');
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
                    <form className="search-box" onSubmit={handleSearchSubmit}>
                        <input
                            className="search-input"
                            placeholder="Buscar por ubicación..."
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        {searchValue && (
                            <button
                                type="button"
                                className="clear-search-button"
                                onClick={clearSearch}
                                style={{
                                    position: 'absolute',
                                    right: '45px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    color: '#666'
                                }}
                            >
                                ×
                            </button>
                        )}
                        <button type="submit" className="search-button">
                            <img src={searchIcon} alt="Buscar" className="search-icon" />
                        </button>
                    </form>
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