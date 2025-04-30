import React from "react"; // Importa la biblioteca React para la creación de componentes.
import Navbar from '../components/Navbar'; // Importa el componente Navbar, que probablemente representa la barra de navegación de la aplicación. La ruta '../components/Navbar' sugiere que el archivo Navbar.js se encuentra en la carpeta 'components' dentro del mismo directorio o un directorio superior.
import Footer from "../components/Footer"; // Importa el componente Footer, que probablemente representa el pie de página de la aplicación. La ruta "../components/Footer" sugiere que el archivo Footer.js se encuentra en la carpeta 'components' dentro del mismo directorio.
import '../styles/AboutUs.css'; // Importa el archivo CSS que contiene los estilos específicos para la página "Acerca de nosotros".

// Define el componente funcional AboutUs, que representa la página "Acerca de nosotros" de la aplicación.
const AboutUs = () => {
  // Renderiza la estructura de la página "Acerca de nosotros".
  return (
    <>
      {/* Renderiza el componente Navbar en la parte superior de la página. */}
      <Navbar />
      {/* Contenedor principal para el contenido de la sección "Acerca de nosotros". */}
      <div className="about-container">
        {/* Contenedor para el texto y otros elementos de contenido dentro de la sección "Acerca de nosotros". */}
        <div className="about-content">
          {/* Título principal de la página "Acerca de nosotros". */}
          <h1 className="about-title">Acerca de nosotros - HomeClick</h1>

          {/* Contenedor para los párrafos de texto que describen la empresa. */}
          <div className="about-text">
            {/* Primer párrafo que introduce HomeClick y su misión de simplificar la compra de viviendas. */}
            <p>
              En HomeClick, transformamos la compra de viviendas en una experiencia sencilla, segura y eficiente. Somos una plataforma
              innovadora diseñada para facilitar la adquisición de propiedades de manera digital, eliminando barreras y optimizando el proceso de
              compra para nuestros usuarios.
            </p>

            {/* Segundo párrafo que detalla la misión de HomeClick de ofrecer una solución moderna y confiable con tecnología avanzada. */}
            <p>
              Nuestra misión es brindar una solución moderna y confiable a quienes buscan su hogar ideal, ofreciendo una plataforma intuitiva,
              transparente y respaldada por tecnología de vanguardia. Nos enfocamos en la comodidad de nuestros clientes, permitiendo que
              exploren, seleccionen y adquieran propiedades de manera segura desde cualquier lugar.
            </p>

            {/* Tercer párrafo que destaca el compromiso de HomeClick con la calidad del servicio, la información detallada y el asesoramiento. */}
            <p>
              En HomeClick, nos comprometemos a garantizar un servicio de calidad, proporcionando información detallada y verificada de cada
              propiedad, así como asesoramiento para facilitar la toma de decisiones. Trabajamos constantemente para innovar y mejorar la
              experiencia de compra inmobiliaria, asegurando que cada usuario encuentre su hogar de manera ágil y sin complicaciones.
            </p>

            {/* Cuarto párrafo que presenta al equipo detrás de HomeClick, su experiencia y su visión de digitalizar el mercado inmobiliario. */}
            <p>
              Nuestro equipo está formado por especialistas en tecnología e inmobiliaria que entienden las necesidades del mercado y buscan redefinir
              la forma en que las personas adquieren propiedades. Confiamos en la digitalización y la accesibilidad para ofrecer una experiencia
              única y personalizada a cada usuario.
            </p>
          </div>
        </div>
      </div>
      {/* Renderiza el componente Footer en la parte inferior de la página. */}
      <Footer />
    </>
  );
};

export default AboutUs;