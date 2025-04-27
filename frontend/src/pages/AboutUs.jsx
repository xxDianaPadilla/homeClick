import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="about-container">
                <div className="about-content">
                    <h1 className="about-title">Acerca de nosotros - HomeClick</h1>

                    <div className="about-text">
                        <p>
                            En HomeClick, transformamos la compra de viviendas en una experiencia sencilla, segura y eficiente. Somos una plataforma
                            innovadora diseñada para facilitar la adquisición de propiedades de manera digital, eliminando barreras y optimizando el proceso de
                            compra para nuestros usuarios.
                        </p>

                        <p>
                            Nuestra misión es brindar una solución moderna y confiable a quienes buscan su hogar ideal, ofreciendo una plataforma intuitiva,
                            transparente y respaldada por tecnología de vanguardia. Nos enfocamos en la comodidad de nuestros clientes, permitiendo que
                            exploren, seleccionen y adquieran propiedades de manera segura desde cualquier lugar.
                        </p>

                        <p>
                            En HomeClick, nos comprometemos a garantizar un servicio de calidad, proporcionando información detallada y verificada de cada
                            propiedad, así como asesoramiento para facilitar la toma de decisiones. Trabajamos constantemente para innovar y mejorar la
                            experiencia de compra inmobiliaria, asegurando que cada usuario encuentre su hogar de manera ágil y sin complicaciones.
                        </p>

                        <p>
                            Nuestro equipo está formado por especialistas en tecnología e inmobiliaria que entienden las necesidades del mercado y buscan redefinir
                            la forma en que las personas adquieren propiedades. Confiamos en la digitalización y la accesibilidad para ofrecer una experiencia
                            única y personalizada a cada usuario.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;