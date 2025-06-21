import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/EstiloNav.css";

// Importación de imágenes y assets
import homeClickLogo from '../assets/naranja.png';
import searchIcon from '../assets/image1.png';
import saveIcon from '../assets/image23.png';
import savedIcon from '../assets/image41.png';
import cartIcon from '../assets/image24.png';
import selectedCartIcon from '../assets/image42.png';
import profileIcon from '../assets/image3.png';
import UserInfoCard from "./UserInfoCard";
import { useCategories } from "../components/Categories/hooks/useCategories";

const Navbar = ({onSearchChange, searchTerm}) => {
  // Estados locales del componente
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  // Hooks de enrutamiento
  const location = useLocation();
  const navigate = useNavigate();

  // Hook para obtener categorías
  const { categories, isLoadingCategories, categoriesError } = useCategories();

  // Variables de estado para páginas específicas
  const isShoppingCartPage = location.pathname === '/shoppingCart';
  const isSavedProperties = location.pathname === '/savedProperties';

  // Manejadores de eventos
  const handleCartClick = () => {
    navigate('/shoppingCart');
  };

  const handleSavedPropertiesClick = () => {
    navigate('/savedProperties');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchSubmit = () => {
    if (onSearchChange) {
      onSearchChange(localSearchTerm);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  // Manejador optimizado para navegación por categoría
  const handleCategoryClick = (e, category) => {
    e.preventDefault();

    setLocalSearchTerm('');
    if (onSearchChange) {
      onSearchChange('');
    }

    navigate('/propertyCategories', {
      state: {
        selectedCategory: {
          id: category._id, // ObjectId de la categoría
          propertyType: category.propertyType,
          name: category.name || category.propertyType
        }
      }
    });
  };

  useEffect(() => {
    if (searchTerm !== undefined) {
      setLocalSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  // Efecto para manejar el responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Funciones auxiliares
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Determina si un enlace está activo basado en la ruta actual
  const isActive = (categoryId) => {
    if (location.pathname === '/propertyCategories' && location.state?.selectedCategory) {
      return location.state.selectedCategory.id === categoryId ? "active" : "";
    }
    return "";
  };

  // Renderizado del componente
  return (
    <>
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
            <input
              type="text"
              id="searchInput"
              placeholder="Buscar por ubicación..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
            />
            <button className="search-button" onClick={handleSearchSubmit}>
              <img src={searchIcon} alt="" />
            </button>
          </div>

          {/* Iconos de navegación */}
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

        {/* Menú de navegación con categorías dinámicas */}
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-options">
            {isLoadingCategories ? (
              <li><span className="loading-text">Cargando categorías...</span></li>
            ) : categoriesError ? (
              <li><span className="error-text">Error: {categoriesError}</span></li>
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id}>
                  <a
                    href="#"
                    className={isActive(category._id)}
                    onClick={(e) => handleCategoryClick(e, category)}
                    title={`Ver propiedades de tipo: ${category.propertyType}`}
                  >
                    {category.propertyType}
                  </a>
                </li>
              ))
            ) : (
              <li><span className="no-categories">No hay categorías disponibles</span></li>
            )}
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