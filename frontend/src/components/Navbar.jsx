import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/EstiloNav.css";
import homeClickLogo from '../assets/naranja.png';
import searchIcon from '../assets/image1.png';
import saveIcon from '../assets/image23.png';
import cartIcon from '../assets/image24.png';
import profileIcon from '../assets/image3.png';
import UserInfoCard from "./UserInfoCard";

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

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

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const isActive = (path) =>{
        if(location.pathname === path){
            return "active";
        }

        if (location.pathname === '/propertyView' && location.state && location.state.fromCategory === path) {
            return "active";
        }

        return "";
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <a href="/">
                            <img src={homeClickLogo} alt="HomeClick Logo" />
                        </a>
                    </div>

                    <div className="search-container">
                        <input type="text" placeholder="Buscar..." />
                        <button className="search-button">
                            <img src={searchIcon} alt="" />
                        </button>
                    </div>

                    <div className="navbar-icons">
                        <button className="icon-button bookmark-button">
                            <img src={saveIcon} alt="" />
                        </button>
                        <button className="icon-button cart-button">
                            <img src={cartIcon} alt="" />
                        </button>
                        <button className="icon-button profile-button" onClick={toggleProfile}>
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

            <UserInfoCard isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            
            {menuOpen && isMobile && (
                <div className="overlay" onClick={toggleMenu}></div>
            )}
        </>
    );
};

export default Navbar;