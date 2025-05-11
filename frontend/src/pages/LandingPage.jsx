import React from "react"; // Importa la biblioteca React para la creación de componentes.
import Navbar from '../components/Navbar'; // Importa el componente Navbar, que representa la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer, que representa el pie de página.
import '../styles/EstiloLandingPage.css'; // Importa los estilos CSS específicos para la página de inicio (landing page).
import bgImage from "../assets/xd1.png"; // Importa la imagen de fondo principal para la sección superior.
import house1 from "../assets/image5.png"; // Importa una imagen de una casa para la sección de descubrimiento.
import house2 from "../assets/image6.png"; // Importa otra imagen de una casa para la sección de descubrimiento.
import house3 from "../assets/image7.png"; // Importa una tercera imagen de una casa para la sección de descubrimiento.
import LandingPageCards from "../components/LandingPageCards";

// Define el componente funcional LandingPage, que representa la página de inicio de la aplicación.
const LandingPage = () => {

  const cardData = [
    {image: house1, caption: "Casa en Colonia Escalón"},
    {image: house2, caption: "Casa en zona rosa"},
    {image: house3, caption: "Casa en santa tecla"},
    {image: house1, caption: "Casa en Colonia Escalón"},
    {image: house2, caption: "Casa en zona rosa"},
    {image: house3, caption: "Casa en santa tecla"},
    {image: house1, caption: "Casa en Merliot"},
    {image: house2, caption: "Casa en San Salvador"},
    {image: house3, caption: "Casa en Antiguo Cuscatlán"},
    {image: house1, caption: "Casa en Santa Elene"}
  ];
  
  // Renderiza la estructura de la página de inicio.
  return(
    <div className="landing-page">
      {/* Renderiza el componente de la barra de navegación en la parte superior. */}
      <Navbar/>
      {/* Contenedor principal para la sección superior de la página de inicio. */}
      <div className="container">
        {/* Imagen de fondo para la sección principal. */}
        <img src={bgImage} alt="" className="background-image"/>
        {/* Contenido superpuesto en la imagen de fondo, incluyendo el título y el botón. */}
        <div className="content2">
          {/* Título principal de la página de inicio con un subtítulo estilizado. */}
          <h1>La Casa de Tus Sueños
            <span className="subtitle">A Un Solo Click</span>
          </h1>
          {/* Botón de "Leer más". */}
          <button className="btn" type="button">Leer más</button>
        </div>
        {/* Texto descriptivo que aparece en la parte inferior de la sección principal. */}
        <p className="footer-text">
          HomeClick es un tienda en línea que ofrece una solución integral para el mercado inmobiliario, brindando acceso a una amplia variedad de casas en diferentes ubicaciones.
        </p>
      </div>
      {/* Sección que describe los objetivos de HomeClick. */}
      <section className="container2">
        {/* Contenedor para los diferentes objetivos. */}
        <div className="objetivos">
          {/* Primer objetivo de la plataforma. */}
          <div className="objetivo">
            <h2>Objetivo Clase #1</h2>
            <p>Facilitar el acceso a la oferta inmobiliaria brindando a los usuarios una plataforma intuitiva y accesible que les permita explorar, comparar y adquirir viviendas en diferentes ubicaciones sin la necesidad de desplazarse físicamente, optimizando así su tiempo y recursos.</p>
          </div>
          {/* Segundo objetivo de la plataforma. */}
          <div className="objetivo">
            <h2>Objetivo Clase #2</h2>
            <p>Optimizar la gestión de ventas y usuarios proporcionando a los administradores herramientas eficientes para gestionar la venta de propiedades, supervisar transacciones y administrar perfiles de usuarios, asegurando un proceso transparente, seguro y organizado.</p>
          </div>
          {/* Tercer objetivo de la plataforma. */}
          <div className="objetivo">
            <h2>Objetivo clave #3</h2>
            <p>Mejorar la experiencia de compra de viviendas integrando funcionalidades innovadoras en el sitio web y la aplicación móvil para ofrecer a los compradores una experiencia fluida, segura y confiable, permitiéndoles interactuar con la plataforma a través de reseñas, notificaciones y un proceso de compra simplificado.</p>
          </div>
        </div>
      </section>
      {/* Sección que muestra una selección de casas para descubrir. */}
      <section className="container2">
        {/* Título de la sección de descubrimiento. */}
        <h3 className="descubre-title">Descubre</h3>
        
        <LandingPageCards cards={cardData}/>

      </section>
      {/* Renderiza el componente del pie de página en la parte inferior. */}
      <Footer/>
    </div>
  );
};

export default LandingPage;