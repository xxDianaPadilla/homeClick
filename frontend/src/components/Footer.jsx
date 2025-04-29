import React from "react";
import '../styles/EstiloLandingPage.css';
import tikTok from "../assets/image20.png";
import faceBook from "../assets/image18.png";
import whatsApp from "../assets/image16.png";
import instagram from "../assets/image15.png";
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () =>{
    const location = useLocation();
    const navigate = useNavigate();

    const handleAboutUsClick = () => {
        navigate('/aboutUs');
    };

    const handlePrivacyPoliciesClick = () => {
        navigate('/privacyPolicies');
    };

    const handleTermsConditionsClick = () => {
        navigate('/termsConditions');
    };

    const handleLandingPageClick = () => {
        navigate('/landingPage');
      };

    return(
        <footer>
                <div className="footer-top">
                    <div className="footer-column">
                        <p className="title2">HomeClick</p>
                        <p onClick={handleAboutUsClick}>Acerca de nosotros</p>
                        <p onClick={handleLandingPageClick}>HomeClick Business</p>
                    </div>
                    <div className="footer-column">
                        <p className="title2">Soporte técnico</p>
                        <p>Facebook Messenger</p>
                        <p>WhatsApp Messenger</p>
                        <p>Contáctanos</p>
                    </div>
                    <div className="footer-column">
                        <p className="title2">Términos legales</p>
                        <p onClick={handlePrivacyPoliciesClick}>Centro de seguridad</p>
                        <p onClick={handlePrivacyPoliciesClick}>Políticas de privacidad</p>
                        <p onClick={handleTermsConditionsClick}>Términos y condiciones</p>
                    </div>
                    <div className="social-icons" aria-label="Redes sociales">
                        <a href="#" aria-label="TikTok"><img src={tikTok} alt="" /></a>
                        <a href="#" aria-label="Facebook"><img src={faceBook} alt="" /></a>
                        <a href="#" aria-label="WhatsApp"><img src={whatsApp} alt="" /></a>
                        <a href="#" aria-label="Instagram"><img src={instagram} alt="" /></a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2023 HomeClick. Todos los derechos reservados</span>
                    <span>Políticas de Privacidad</span>
                    <span>Términos y condiciones</span>
                </div>
            </footer>
    );
};

export default Footer;