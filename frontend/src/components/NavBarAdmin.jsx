import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../styles/NavBarAdmin.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';

const NavBarAdmin = () => {
  const [activeLink, setActiveLink] = useState('Inicio');
  const navigate = useNavigate();

  const handleLinkClick = (link, path) => {
    setActiveLink(link);
    navigate(path);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img
            src={LogoHomeclick}
            alt="Logo de HomeClick"
            className="logo-image" onClick={() => handleLinkClick('Inicio', 'dashboard')} style={{cursor: 'pointer'}}
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
        <a
          href="/dashboard"
          className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`}
          onClick={() => handleLinkClick('Inicio', '/dashboard')}
        >
          Inicio
        </a>
        <a
          href="/propertyAdmin"
          className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`}
          onClick={() => handleLinkClick('Administrar propiedades', '/propertyAdmin')}
        >
          Administrar propiedades
        </a>
        <a
          href="#"
          className={`nav-link ${activeLink === 'Perfil de Administradores' ? 'active' : ''}`}
          onClick={() => handleLinkClick('Perfil de Administradores')}
        >
          Perfil de Administradores
        </a>
        <div className="nav-line"></div>
      </nav>
    </header>
  );
};

export default NavBarAdmin;