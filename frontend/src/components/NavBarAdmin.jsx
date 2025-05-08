import React, { useState } from 'react';
import "../styles/NavBarAdmin.css";
import LogoHomeclick from '../assets/LogoHomeclick.png';
import perfil from '../assets/perfil.png';

const NavBarAdmin = () => {
  const [activeLink, setActiveLink] = useState('Inicio');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-top">
        <div className="navbar-logo">
          <img
            src={LogoHomeclick}
            alt="Logo de HomeClick"
            className="logo-image"
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
          href="#"
          className={`nav-link ${activeLink === 'Inicio' ? 'active' : ''}`}
          onClick={() => handleLinkClick('Inicio')}
        >
          Inicio
        </a>
        <a
          href="#"
          className={`nav-link ${activeLink === 'Administrar propiedades' ? 'active' : ''}`}
          onClick={() => handleLinkClick('Administrar propiedades')}
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