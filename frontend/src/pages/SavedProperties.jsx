import React, { useState } from "react"; // Importa React y el hook useState para la gestión del estado.
import Navbar from '../components/Navbar'; // Importa el componente Navbar para la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer para el pie de página.
import house1 from "../assets/image5.png"; // Importa una imagen de casa.
import house2 from "../assets/image6.png"; // Importa otra imagen de casa.
import house3 from "../assets/image7.png"; // Importa una tercera imagen de casa.
import pictureIcon from "../assets/image35.png"; // Importa un icono de imagen.
import areaIcon from "../assets/image38.png"; // Importa un icono de área.
import bedIcon from "../assets/image39.png"; // Importa un icono de cama.
import personIcon from "../assets/image37.png"; // Importa un icono de persona.
import toiletIcon from "../assets/image40.png"; // Importa un icono de inodoro.
import trashcanIcon from "../assets/image36.png"; // Importa un icono de bote de basura.
import { useNavigate, useLocation } from 'react-router-dom'; // Importa hooks para la navegación y la ubicación.
import "../styles/SavedProperties.css"; // Importa los estilos CSS específicos para la página de propiedades guardadas.

// Define el componente funcional SavedProperties, que muestra la lista de propiedades que el usuario ha guardado.
const SavedProperties = () => {
  // Hook para obtener la función 'navigate' para la navegación programática.
  const navigate = useNavigate();
  // Hook para acceder al objeto de ubicación actual (no se utiliza directamente en este componente, pero podría ser útil en otros contextos).
  const location = useLocation();

  // Función que se ejecuta al hacer clic en una tarjeta de propiedad. Navega a la página de vista de propiedad.
  const handlePropertyViewClick = () => {
    navigate('/propertyView');
  };

  // Array de objetos que representan las casas guardadas. En una aplicación real, estos datos provendrían de una API o del estado de la aplicación.
  const savedHouses = [
    {
      id: 1,
      image: house1,
      price: "$50,000",
      title: "Casa en colonia Escalón",
      description: "Descubre el hogar de tus sueños en esta impresionante casa moderna, diseñada para brindar confort y elegancia. Con amplios espacios iluminados, acabados de alta calidad y un hermoso jardín, esta propiedad es ideal para quienes buscan tranquilidad y exclusividad. Ubicada en una zona privilegiada, cerca de centros comerciales, colegios y áreas recreativas, ofrece el equilibrio perfecto entre comodidad y accesibilidad. ¡No pierdas la oportunidad de hacerla tuya!",
      publishDate: "26 de febrero de 2024",
      area: "150 metros cuadrados",
      bedrooms: 3,
      bathrooms: 4,
      pictures: 5
    },
    {
      id: 2,
      image: house2,
      price: "$50,000",
      title: "Casa en colonia Escalón",
      description: "Descubre el hogar de tus sueños en esta impresionante casa moderna, diseñada para brindar confort y elegancia. Con amplios espacios iluminados, acabados de alta calidad y un hermoso jardín, esta propiedad es ideal para quienes buscan tranquilidad y exclusividad. Ubicada en una zona privilegiada, cerca de centros comerciales, colegios y áreas recreativas, ofrece el equilibrio perfecto entre comodidad y accesibilidad. ¡No pierdas la oportunidad de hacerla tuya!",
      publishDate: "26 de febrero de 2024",
      area: "150 metros cuadrados",
      bedrooms: 3,
      bathrooms: 4,
      pictures: 4
    },
    {
      id: 3,
      image: house3,
      price: "$50,000",
      title: "Casa en colonia Escalón",
      description: "Descubre el hogar de tus sueños en esta impresionante casa moderna, diseñada para brindar confort y elegancia. Con amplios espacios iluminados, acabados de alta calidad y un hermoso jardín, esta propiedad es ideal para quienes buscan tranquilidad y exclusividad. Ubicada en una zona privilegiada, cerca de centros comerciales, colegios y áreas recreativas, ofrece el equilibrio perfecto entre comodidad y accesibilidad. ¡No pierdas la oportunidad de hacerla tuya!",
      publishDate: "26 de febrero de 2024",
      area: "150 metros cuadrados",
      bedrooms: 3,
      bathrooms: 4,
      pictures: 4
    }
  ];

  // Renderiza la estructura de la página de propiedades guardadas.
  return (
    <>
      {/* Renderiza el componente Navbar en la parte superior. */}
      <Navbar />
      {/* Contenedor principal para la lista de propiedades guardadas. */}
      <div className="saved-properties-container">
        {/* Título de la página. */}
        <h1 className="saved-properties-title">Lista de tus casas guardadas</h1>

        {/* Contenedor para la lista de tarjetas de propiedad. */}
        <div className="property-list">
          {/* Mapea el array 'savedHouses' para renderizar una tarjeta por cada casa guardada. */}
          {savedHouses.map((house) => (
            <div key={house.id} className="property-card" onClick={handlePropertyViewClick}>
              {/* Contenedor para la imagen de la propiedad y el contador de imágenes. */}
              <div className="property-image-container">
                <img src={house.image} alt={house.title} className="property-image" />
                <div className="image-counter">
                  <img src={pictureIcon} alt="Pictures" className="meta-icon" />
                  <span>{house.pictures}</span>
                </div>
              </div>

              {/* Contenedor para los detalles de la propiedad. */}
              <div className="property-details">
                {/* Encabezado con el precio y el título de la propiedad. */}
                <div className="property-header">
                  <span className="property-price">{house.price}</span>
                  <h2 className="property-title">{house.title}</h2>
                </div>

                {/* Descripción breve de la propiedad. */}
                <p className="property-description">{house.description}</p>

                {/* Fecha de publicación de la propiedad. */}
                <div className="publish-date">
                  Fecha Publicaciónn: {house.publishDate}
                </div>

                {/* Contenedor para los metadatos de la propiedad (área, habitaciones, etc.). */}
                <div className="property-meta">
                  {/* Metadato del área de la propiedad. */}
                  <div className="meta-item">
                    <img src={areaIcon} alt="Area" className="meta-icon" />
                    <span className="meta-text">{house.area}</span>
                  </div>

                  {/* Metadato del número de habitaciones. */}
                  <div className="meta-item">
                    <img src={bedIcon} alt="Bedrooms" className="meta-icon"/>
                    <span className="meta-text">{house.bedrooms}</span>
                  </div>

                  {/* Botón para contactar sobre la propiedad. */}
                  <div className="meta-item">
                    <img src={personIcon} alt="Contact" className="meta-icon"/>
                    <button className="contact-button">Contactar ahora</button>
                  </div>

                  {/* Metadato del número de baños. */}
                  <div className="meta-item">
                    <img src={toiletIcon} alt="Bathrooms" className="meta-icon"/>
                    <span className="meta-text">{house.bathrooms}</span>
                  </div>

                  {/* Botón para eliminar la propiedad de los guardados. */}
                  <div className="meta-item">
                    <img src={trashcanIcon} alt="Delete" className="meta-icon"/>
                    <button className="delete-button">Eliminar guardado</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Renderiza el componente Footer en la parte inferior. */}
      <Footer />
    </>
  );
};

export default SavedProperties;