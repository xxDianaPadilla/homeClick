// Importaciones necesarias
// React y hooks fundamentales para el manejo de estado y efectos
import React, { useState, useEffect } from "react";
// Hooks de enrutamiento para la navegación y obtención de la ubicación actual
import { useNavigate, useLocation } from 'react-router-dom';
// Estilos CSS para el componente Navbar
import "../styles/EstiloNav.css";

// Importación de imágenes y assets
// Logo principal de la aplicación
import homeClickLogo from '../assets/naranja.png';
// Icono para el botón de búsqueda
import searchIcon from '../assets/image1.png';
// Iconos para el botón de guardar propiedades (estados normal y activo)
import saveIcon from '../assets/image23.png';
import savedIcon from '../assets/image41.png';
// Iconos para el carrito de compras (estados normal y activo)
import cartIcon from '../assets/image24.png';
import selectedCartIcon from '../assets/image42.png';
// Icono para el perfil de usuario
import profileIcon from '../assets/image3.png';
// Componente que muestra la información del usuario
import UserInfoCard from "./UserInfoCard";

// Definición del componente principal Navbar
const Navbar = () => {
  // Estados locales del componente
  // Controla la visibilidad de la tarjeta de perfil
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Controla la visibilidad del menú móvil
  const [menuOpen, setMenuOpen] = useState(false);
  // Determina si la pantalla es de tamaño móvil
  const [isMobile, setIsMobile] = useState(false);

  // Hooks de enrutamiento
  // Obtiene la ubicación actual para determinar la página activa
  const location = useLocation();
  // Función para navegar entre rutas
  const navigate = useNavigate();

  // Variables de estado para páginas específicas
  // Verifica si estamos en la página del carrito
  const isShoppingCartPage = location.pathname === '/shoppingCart';
  // Verifica si estamos en la página de propiedades guardadas
  const isSavedProperties = location.pathname === '/savedProperties';

  // Manejadores de eventos
  // Navega a la página del carrito
  const handleCartClick = () => {
    navigate('/shoppingCart');
  };

  // Navega a la página de propiedades guardadas
  const handleSavedPropertiesClick = () =>{
    navigate('/savedProperties');
  };

  // Efecto para manejar el responsive design
  useEffect(() => {
    // Función que actualiza el estado móvil basado en el ancho de la ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Cierra el menú móvil si la pantalla se hace grande
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    // Agrega el listener para el evento resize
    window.addEventListener('resize', handleResize);
    // Ejecuta handleResize inicialmente
    handleResize();

    // Limpieza del efecto
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Funciones auxiliares
  // Alterna la visibilidad de la tarjeta de perfil
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Alterna la visibilidad del menú móvil
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Determina si un enlace está activo basado en la ruta actual
  const isActive = (path) =>{
    if(location.pathname === path){
      return "active";
    }

    if (location.pathname === '/propertyView' && location.state && location.state.fromCategory === path) {
      return "active";
    }

    return "";
  };

  // Renderizado del componente
  return (
    <>
      {/* Barra de navegación principal */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo de la aplicación */}
          <div className="navbar-logo">
            <a href="/landingPage">
              <img src={homeClickLogo} alt="HomeClick Logo" />
            </a>
          </div>

          {/* Barra de búsqueda */}
          <div className="search-container">
            <input type="text" placeholder="Buscar..." />
            <button className="search-button">
              <img src={searchIcon} alt="" />
            </button>
          </div>

          {/* Iconos de navegación (guardar, carrito, perfil) */}
          <div className="navbar-icons">
            <button className="icon-button bookmark-button" onClick={handleSavedPropertiesClick}>
              <img src={isSavedProperties ? savedIcon : saveIcon} alt="" />
            </button>
            <button className="icon-button cart-button" onClick={handleCartClick}>
              <img src={isShoppingCartPage ? selectedCartIcon : cartIcon} alt="" />
            </button>
            <button className="icon-button profile-button" onClick={toggleProfile}>
              <img src={profileIcon} alt="" />
            </button>
          </div>

          {/* Botón de menú hamburguesa para móvil */}
          <button className={`hamburger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <hr className="espacio" />

        {/* Menú de navegación con categorías de propiedades */}
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-options">
            <li><a href="/propertyCategories" className={isActive("/propertyCategories")}>Casa de campo</a></li>
            <li><a href="/apartamento">Apartamentos</a></li>
            <li><a href="/casa-de-playa">Casa de playa</a></li>
            <li><a href="/mansion">Mansión</a></li>
            <li><a href="/cabana">Cabaña</a></li>
            <li><a href="/loft">Loft</a></li>
            <li><a href="/casa-prefabricada">Casa prefabricada</a></li>
            <li><a href="/villa">Villa</a></li>
            <li><a href="/duplex">Dúplex</a></li>
            <li><a href="/townhouse">Townhouse</a></li>
          </ul>
        </div>
      </nav>

      {/* Componente de información del usuario */}
      <UserInfoCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Overlay oscuro para el menú móvil */}
      {menuOpen && isMobile && (
        <div className="overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default Navbar;