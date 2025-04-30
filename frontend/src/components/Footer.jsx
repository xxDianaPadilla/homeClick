import React from "react";
import '../styles/EstiloLandingPage.css'; // Importa los estilos CSS para el footer
import tikTok from "../assets/image20.png"; // Importa el logo de TikTok
import faceBook from "../assets/image18.png"; // Importa el logo de Facebook
import whatsApp from "../assets/image16.png"; // Importa el logo de WhatsApp
import instagram from "../assets/image15.png"; // Importa el logo de Instagram
import { useNavigate, useLocation } from 'react-router-dom'; // Importa hooks para la navegación

// Define el componente funcional Footer
const Footer = () => {
  // Obtiene la ubicación actual para posibles usos futuros (no utilizado en este código)
  const location = useLocation();
  // Obtiene la función 'navigate' para la navegación entre rutas
  const navigate = useNavigate();

  // Función para navegar a la página "Acerca de nosotros"
  const handleAboutUsClick = () => {
    navigate('/aboutUs');
  };

  // Función para navegar a la página de políticas de privacidad
  const handlePrivacyPoliciesClick = () => {
    navigate('/privacyPolicies');
  };

  // Función para navegar a la página de términos y condiciones
  const handleTermsConditionsClick = () => {
    navigate('/termsConditions');
  };

  // Función para navegar a la página de inicio (LandingPage)
  const handleLandingPageClick = () => {
    navigate('/landingPage');
  };

  // Renderiza el componente del footer
  return (
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