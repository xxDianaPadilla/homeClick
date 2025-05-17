import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/NavBarAdmin.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';

const NavBarAdmin = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('Inicio');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setActiveLink('Inicio');
    } else if (path === '/propertyAdmin') {
      setActiveLink('Administrar propiedades');
    } else if (path === '/usuariosAdmin') {
      setActiveLink('Perfil de Administradores');
    }
  }, [location.pathname]);

  return (
    <header className="navbar-header">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img
            src={LogoHomeclick}
            alt="Logo de HomeClick"
            className="logo-image" style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="navbar-user">
          <img
            src={perfil}
            alt="Icono de perfil de usuario"
            className="user-icon"
          />
        </div>
      </div>
      <nav className="navbar-navigation">
        <div className="nav-line"></div>
        <Link
          to="/dashboard"
          className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`}
        >
          Inicio
        </Link>
        <Link
          to="/propertyAdmin"
          className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`}
        >
          Administrar propiedades
        </Link>
        <Link
          to="/usuariosAdmin"
          className={`nav-link ${activeLink === 'Perfil de Administradores' ? 'active' : ''}`}
        >
          Perfil de Administradores
        </Link>
        <div className="nav-line"></div>
      </nav>
    </header>
  );
};

export default NavBarAdmin;