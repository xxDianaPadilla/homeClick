import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/EstiloNav.css";
import homeClickLogo from '../assets/naranja.png';
import searchIcon from '../assets/image1.png';
import saveIcon from '../assets/image23.png';
import cartIcon from '../assets/image24.png';
import profileIcon from '../assets/image3.png';
import UserInfoCard from "./UserInfoCard";

const Navbar = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
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
                </div>

                <hr className="espacio" />

                <div className="navbar-menu">
                    <ul className="navbar-options">
                        <li><a className="active" href="/casa-de-campo">Casa de campo</a></li>
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
        </>
    );
};

export default Navbar;