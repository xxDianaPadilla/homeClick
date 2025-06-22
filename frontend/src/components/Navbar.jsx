import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/EstiloNav.css";

import homeClickLogo from '../assets/naranja.png';
import searchIcon from '../assets/image1.png';
import saveIcon from '../assets/image23.png';
import savedIcon from '../assets/image41.png';
import cartIcon from '../assets/image24.png';
import selectedCartIcon from '../assets/image42.png';
import profileIcon from '../assets/image3.png';
import UserInfoCard from "./UserInfoCard";
import { useCategories } from "../components/Categories/hooks/useCategories";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = ({ onSearchChange, searchTerm }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const { categories, isLoadingCategories, categoriesError } = useCategories();

  const isShoppingCartPage = location.pathname === '/shoppingCart';
  const isSavedProperties = location.pathname === '/savedProperties';

  const requiresAuth = (action) => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para acceder a esta funcionalidad');
      navigate('/inicio-sesion');
      return false;
    }
    return true;
  };

  const handleCartClick = () => {
    if (!requiresAuth('carrito')) return;
    navigate('/shoppingCart');
  };

  const handleSavedPropertiesClick = () => {
    if (!requiresAuth('propiedades guardadas')) return;
    navigate('/savedProperties');
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
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

  const handleCategoryClick = (e, category) => {
    e.preventDefault();

    setLocalSearchTerm('');
    if (onSearchChange) {
      onSearchChange('');
    }

    navigate('/propertyCategories', {
      state: {
        selectedCategory: {
          id: category._id, 
          propertyType: category.propertyType,
          name: category.name || category.propertyType
        }
      }
    });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/landingPage');
  };

  useEffect(() => {
    if (searchTerm !== undefined) {
      setLocalSearchTerm(searchTerm);
    }
  }, [searchTerm]);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (categoryId) => {
    if (location.pathname === '/propertyCategories' && location.state?.selectedCategory) {
      return location.state.selectedCategory.id === categoryId ? "active" : "";
    }
    return "";
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/landingPage" onClick={handleLogoClick}>
              <img src={homeClickLogo} alt="HomeClick Logo" />
            </a>
          </div>

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

          <div className="navbar-icons">
            <button
              className={`icon-button bookmark-button ${!isAuthenticated ? 'disabled' : ''}`}
              onClick={handleSavedPropertiesClick}
              title={!isAuthenticated ? 'Inicia sesión para ver propiedades guardadas' : 'Ver propiedades guardadas'}
            >
              <img src={isSavedProperties ? savedIcon : saveIcon} alt="" />
            </button>

            <button
              className={`icon-button cart-button ${!isAuthenticated ? 'disabled' : ''}`}
              onClick={handleCartClick}
              title={!isAuthenticated ? 'Inicia sesión para ver el carrito' : 'Ver carrito de compras'}
            >
              <img src={isShoppingCartPage ? selectedCartIcon : cartIcon} alt="" />
            </button>

            <button
              className="icon-button profile-button"
              onClick={handleProfileClick}
              title={!isAuthenticated ? 'Ver opciones de perfil' : 'Ver perfil'}
            >
              <img src={profileIcon} alt="" />
            </button>
          </div>

          <button className={`hamburger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <hr className="espacio" />

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

      <UserInfoCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {menuOpen && isMobile && (
        <div className="overlay" onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default Navbar;