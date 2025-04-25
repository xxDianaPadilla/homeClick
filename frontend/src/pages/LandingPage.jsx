import React from "react";
import Navbar from '../components/Navbar';
import '../styles/EstiloLandingPage.css';
import bgImage from "../assets/xd1.png";
import house1 from "../assets/image5.png";
import house2 from "../assets/image6.png";
import house3 from "../assets/image7.png";
import tikTok from "../assets/image20.png";
import faceBook from "../assets/image18.png";
import whatsApp from "../assets/image16.png";
import instagram from "../assets/image15.png";

const LandingPage = () => {
    return(
        <div className="landing-page">
            <Navbar/>
            <div className="container">
                <img src={bgImage} alt="" className="background-image"/>
                <div className="content">
                    <h1>La Casa de Tus Sueños
                    <span className="subtitle">A Un Solo Click</span>
                    </h1>
                    <button className="btn" type="button">Leer más</button>
                </div>
                <p className="footer-text">
                    HomeClick es un tienda en línea que ofrece una solución integral para el mercado inmobiliario, brindando acceso a una amplia variedad de casas en diferentes ubicaciones.
                </p>
            </div>
            <section className="container2">
                <div className="objetivos">
                    <div className="objetivo">
                        <h2>Objetivo Clase #1</h2>
                        <p>Facilitar el acceso a la oferta inmobiliaria brindando a los usuarios una plataforma intuitiva y accesible que les permita explorar, comparar y adquirir viviendas en diferentes ubicaciones sin la necesidad de desplazarse físicamente, optimizando así su tiempo y recursos.</p>
                    </div>
                    <div className="objetivo">
                        <h2>Objetivo Clase #2</h2>
                        <p>Optimizar la gestión de ventas y usuarios proporcionando a los administradores herramientas eficientes para gestionar la venta de propiedades, supervisar transacciones y administrar perfiles de usuarios, asegurando un proceso transparente, seguro y organizado.</p>
                    </div>
                    <div className="objetivo">
                        <h2>Objetivo clave #3</h2>
                        <p>Mejorar la experiencia de compra de viviendas integrando funcionalidades innovadoras en el sitio web y la aplicación móvil para ofrecer a los compradores una experiencia fluida, segura y confiable, permitiéndoles interactuar con la plataforma a través de reseñas, notificaciones y un proceso de compra simplificado.</p>
                    </div>
                </div>
            </section>
            <section className="container2">
                <h3 className="descubre-title">Descubre</h3>
                <div className="descubre-grid">
                    <div className="descubre-item">
                        <img src={house1} alt="" />
                        <p className="descubre-caption">Casa en Colonia Escalón</p>
                    </div>
                    <div className="descubre-item">
                        <img src={house2} alt="" />
                        <p className="descubre-caption">Casa en zona rosa</p>
                    </div>
                    <div className="descubre-item">
                        <img src={house3} alt="" />
                        <p className="descubre-caption">Casa en santa tecla</p>
                    </div>
                    <div className="descubre-item">
                        <img src={house1} alt="" />
                        <p className="descubre-caption">Casa en Colonia Escalón</p>
                    </div>
                </div>
            </section>
            <footer>
                <div className="footer-top">
                    <div className="footer-column">
                        <p className="title">HomeClick</p>
                        <p>Acerca de nosotros</p>
                        <p>HomeClick Business</p>
                    </div>
                    <div className="footer-column">
                        <p className="title">Soporte técnico</p>
                        <p>Facebook Messenger</p>
                        <p>WhatsApp Messenger</p>
                        <p>Contáctanos</p>
                    </div>
                    <div className="footer-column">
                        <p className="title">Términos legales</p>
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
        </div>
    );
};

export default LandingPage;