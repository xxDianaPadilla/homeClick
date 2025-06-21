import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import ObjectiveCard from "../components/ObjectiveCard";
import LandingPageCards from "../components/LandingPageCards";
import '../styles/EstiloLandingPage.css';
import bgImage from "../assets/xd1.png";
import house1 from "../assets/image5.png";
import house2 from "../assets/image6.png";
import house3 from "../assets/image7.png";

const LandingPage = () => {
  // Data para las cards del carousel
  const cardData = [
    { image: house1, caption: "Casa en Colonia Escalón" },
    { image: house2, caption: "Casa en zona rosa" },
    { image: house3, caption: "Casa en santa tecla" },
    { image: house1, caption: "Casa en Colonia Escalón" },
    { image: house2, caption: "Casa en zona rosa" },
    { image: house3, caption: "Casa en santa tecla" },
    { image: house1, caption: "Casa en Merliot" },
    { image: house2, caption: "Casa en San Salvador" },
    { image: house3, caption: "Casa en Antiguo Cuscatlán" },
    { image: house1, caption: "Casa en Santa Elena" }
  ];

  // Data para los objetivos
  const objectives = [
    {
      id: 1,
      title: "Objetivo Clase #1",
      description: "Facilitar el acceso a la oferta inmobiliaria brindando a los usuarios una plataforma intuitiva y accesible que les permita explorar, comparar y adquirir viviendas en diferentes ubicaciones sin la necesidad de desplazarse físicamente, optimizando así su tiempo y recursos.",
      icon: "🏠"
    },
    {
      id: 2,
      title: "Objetivo Clase #2", 
      description: "Optimizar la gestión de ventas y usuarios proporcionando a los administradores herramientas eficientes para gestionar la venta de propiedades, supervisar transacciones y administrar perfiles de usuarios, asegurando un proceso transparente, seguro y organizado.",
      icon: "⚙️"
    },
    {
      id: 3,
      title: "Objetivo clave #3",
      description: "Mejorar la experiencia de compra de viviendas integrando funcionalidades innovadoras en el sitio web y la aplicación móvil para ofrecer a los compradores una experiencia fluida, segura y confiable, permitiéndoles interactuar con la plataforma a través de reseñas, notificaciones y un proceso de compra simplificado.",
      icon: "📱"
    }
  ];

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section con imagen de fondo a ancho completo */}
      <div className="hero-section-fullwidth">
        {/* Imagen de fondo con la nueva clase específica */}
        <img 
          src={bgImage} 
          alt="Fondo de casas" 
          className="landing-background-hero" 
        />
        
        {/* Contenido superpuesto */}
        <div className="content2">
          <h1>
            La Casa de Tus Sueños
            <span className="subtitle">A Un Solo Click</span>
          </h1>
          <button className="btn" type="button">
            Leer más
          </button>
        </div>
        
        {/* Texto informativo en la parte inferior */}
        <p className="footer-text">
          HomeClick es una tienda en línea que ofrece una solución integral para el mercado inmobiliario, 
          brindando acceso a una amplia variedad de casas en diferentes ubicaciones.
        </p>
      </div>

      {/* Objectives Section */}
      <section className="container2">
        <div className="objetivos">
          {objectives.map((objective, index) => (
            <ObjectiveCard
              key={objective.id}
              title={objective.title}
              description={objective.description}
              icon={objective.icon}
              delay={index * 200} // Stagger animation
            />
          ))}
        </div>
      </section>

      {/* Discovery Section con carousel optimizado */}
      <section className="container2">
        <h3 className="descubre-title">Descubre</h3>
        <LandingPageCards cards={cardData} />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;