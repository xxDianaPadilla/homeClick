import React, { useMemo } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import ObjectiveCard from "../components/ObjectiveCard";
import TailwindPropertiesCarousel from "../components/TailwindPropertiesCarousel";
import useResponsive from "../components/Customers/Hooks/useResponsive";
import '../styles/EstiloLandingPage.css';
import bgImage from "../assets/xd1.png";

const LandingPage = () => {
  // Hook responsive para obtener información del viewport
  const {
    viewport,
    deviceCapabilities,
    getResponsiveClasses,
    getResponsiveValue,
    isMobile,
    isTablet,
    isDesktop,
    hasTouch,
    prefersReducedMotion
  } = useResponsive();

  /**
   * Datos para los objetivos con números en lugar de iconos
   * Se adaptan según el tipo de dispositivo
   */
  const objectives = useMemo(() => [
    {
      id: 1,
      title: "Objetivo Clase #1",
      description: "Facilitar el acceso a la oferta inmobiliaria brindando a los usuarios una plataforma intuitiva y accesible que les permita explorar, comparar y adquirir viviendas en diferentes ubicaciones sin la necesidad de desplazarse físicamente, optimizando así su tiempo y recursos.",
      number: 1,
      delay: 0
    },
    {
      id: 2,
      title: "Objetivo Clase #2", 
      description: "Optimizar la gestión de ventas y usuarios proporcionando a los administradores herramientas eficientes para gestionar la venta de propiedades, supervisar transacciones y administrar perfiles de usuarios, asegurando un proceso transparente, seguro y organizado.",
      number: 2,
      delay: 200
    },
    {
      id: 3,
      title: "Objetivo clave #3",
      description: "Mejorar la experiencia de compra de viviendas integrando funcionalidades innovadoras en el sitio web y la aplicación móvil para ofrecer a los compradores una experiencia fluida, segura y confiable, permitiéndoles interactuar con la plataforma a través de reseñas, notificaciones y un proceso de compra simplificado.",
      number: 3,
      delay: 400
    }
  ], []);

  /**
   * Configuración responsiva del texto del botón principal
   * Se adapta según el tamaño de pantalla
   */
  const buttonText = getResponsiveValue({
    xs: "Leer más",
    sm: "Leer más",
    md: "Leer más",
    lg: "Leer más",
    xl: "Leer más"
  });

  /**
   * Configuración responsiva del texto del footer hero
   * Se oculta en móviles muy pequeños para mejorar la legibilidad
   */
  const shouldShowFooterText = getResponsiveValue({
    xs: false,
    sm: true,
    md: true,
    lg: true,
    xl: true
  });

  /**
   * Configuración de clases CSS responsivas para el contenedor principal
   */
  const containerClasses = getResponsiveClasses({
    xs: 'landing-mobile-xs',
    sm: 'landing-mobile-sm',
    md: 'landing-tablet',
    lg: 'landing-desktop',
    xl: 'landing-desktop-large'
  });

  /**
   * Maneja el click del botón principal con analytics opcional
   */
  const handleButtonClick = () => {
    // Aquí se puede agregar tracking de analytics
    console.log('Landing button clicked', {
      viewport: viewport.width,
      device: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      hasTouch: hasTouch
    });
    
    // Scroll suave hacia la sección de objetivos
    const objetivosSection = document.querySelector('.objetivos');
    if (objetivosSection) {
      objetivosSection.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  /**
   * Genera el estilo dinámico para la imagen de fondo del hero
   * Optimiza la carga según la densidad de píxeles
   */
  const heroBackgroundStyle = useMemo(() => {
    const isHighDensity = viewport.devicePixelRatio > 1.5;
    
    return {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      // Optimización para pantallas de alta densidad
      imageRendering: isHighDensity ? 'auto' : 'crisp-edges'
    };
  }, [viewport.devicePixelRatio]);

  return (
    <div className={`landing-page ${containerClasses}`}>
      <Navbar />
      
      {/* Hero Section con imagen de fondo optimizada */}
      <section 
        className="hero-section-fullwidth"
        role="banner"
        aria-label="Sección principal - La casa de tus sueños"
      >
        {/* Imagen de fondo con lazy loading optimizado */}
        <img 
          src={bgImage} 
          alt="Fondo de casas - HomeClick" 
          className="landing-background-hero"
          loading="eager" // Carga inmediata para hero image
          decoding="async"
          fetchpriority="high" // Prioridad alta para el hero
        />
        
        {/* Contenido superpuesto del hero */}
        <div className="content2" role="main">
          <h1>
            La Casa de Tus Sueños
            <span className="subtitle">A Un Solo Click</span>
          </h1>
          
          <button 
            className="btn" 
            type="button"
            onClick={handleButtonClick}
            aria-label="Leer más sobre HomeClick"
          >
            {buttonText}
          </button>
        </div>
        
        {/* Texto informativo en la parte inferior - Responsivo */}
        {shouldShowFooterText && (
          <p className="footer-text" role="contentinfo">
            HomeClick es una tienda en línea que ofrece una solución integral para el mercado inmobiliario, 
            brindando acceso a una amplia variedad de casas en diferentes ubicaciones.
          </p>
        )}
      </section>

      {/* Sección de Objetivos con animaciones responsivas */}
      <section className="container2" aria-labelledby="objetivos-title">
        <h2 id="objetivos-title" className="sr-only">
          Nuestros Objetivos Principales
        </h2>
        
        <div className="objetivos">
          {objectives.map((objective, index) => (
            <div
              key={objective.id}
              className="objetivo"
              style={{ 
                animationDelay: prefersReducedMotion ? '0ms' : `${objective.delay}ms`
              }}
            >
              {/* Icono numerado */}
              <div className="objetivo-icon">
                {objective.number}
              </div>
              
              {/* Contenido del objetivo */}
              <h2>{objective.title}</h2>
              <p>{objective.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Descubre con carousel optimizado y datos reales */}
      <section aria-labelledby="descubre-title">
        <TailwindPropertiesCarousel 
          limit={6}
          title="Descubre"
        />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage; 