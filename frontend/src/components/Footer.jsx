import React from "react";
import '../styles/EstiloLandingPage.css';
import tikTok from "../assets/image20.png";
import faceBook from "../assets/image18.png";
import whatsApp from "../assets/image16.png";
import instagram from "../assets/image15.png";

const Footer = () =>{
    return(
        <footer>
                <div className="footer-top">
                    <div className="footer-column">
                        <p className="title2">HomeClick</p>
                        <p>Acerca de nosotros</p>
                        <p>HomeClick Business</p>
                    </div>
                    <div className="footer-column">
                        <p className="title2">Soporte técnico</p>
                        <p>Facebook Messenger</p>
                        <p>WhatsApp Messenger</p>
                        <p>Contáctanos</p>
                    </div>
                    <div className="footer-column">
                        <p className="title2">Términos legales</p>
                        <p>Centro de seguridad</p>
                        <p>Políticas de privacidad</p>
                        <p>Condiciones del servicio</p>
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