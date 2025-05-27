import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/NavBarAdmin.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';
import UserInfoCard from "./UserInfoCard";

const NavBarAdmin = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('Inicio');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveLink('Inicio');
    } else if (path === '/propertyAdmin') {
      setActiveLink('Administrar propiedades');
    } else if (path === '/listadoVentas') {
      setActiveLink('Perfil de Administradores');
    } else if (path === '/categorias') {  
      setActiveLink('Categorías');        
    }
  }, [location.pathname]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img
            src={LogoHomeclick}
            alt="Logo de HomeClick"
            className="logo-image" 
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <div className="navbar-actions">
          <div className="navbar-user">
            <img 
              onClick={toggleProfile}
              src={perfil}
              alt="Icono de perfil de usuario"
              className="user-icon"
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
        <Link
          to="/dashboard"
          className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Inicio
        </Link>
        <Link
          to="/propertyAdmin"
          className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Administrar propiedades
        </Link>
        <Link
          to="/listadoVentas"
          className={`nav-link ${activeLink === 'Perfil de Administradores' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Listado de ventas
        </Link>
        <Link
          to="/categorias"
          className={`nav-link ${activeLink === 'Categorías' ? 'active' : ''}`}
          onClick={handleLinkClick}
        >
          Categorías
        </Link>
        <div className="nav-line"></div>
      </nav>
      
      <UserInfoCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};

export default NavBarAdmin;