import React, { useEffect, useState } from "react"; // Importa React, useEffect para efectos secundarios y useState para gestionar el estado local.
import Navbar from '../components/Navbar'; // Importa el componente Navbar para la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer para el pie de página.
import "../styles/PropertyView.css"; // Importa los estilos CSS específicos para la vista de propiedad.
import house1 from "../assets/image5.png"; // Importa una imagen de casa.
import house2 from "../assets/image6.png"; // Importa otra imagen de una casa para la sección de descubrimiento.
import house3 from "../assets/image7.png"; 
import saveIcon from '../assets/image23.png'; // Importa el icono de "guardar".
import savedIcon from '../assets/image41.png'; // Importa el icono de "guardado".
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa componentes de react-leaflet para la visualización de mapas.
import ContactForm from "../components/ContactForm"; // Importa el componente ContactForm para el formulario de contacto.
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks para acceder a la ubicación actual y para la navegación.
import LandingPageCards from "../components/LandingPageCards";
import {usePropertyData} from '../components/Properties/Hooks/usePropertyData';
import {useExpandableSections} from '../components/Properties/Hooks/useExpandableSections';
import {useSavedProperties} from '../components/Properties/Hooks/useSavedProperties';
import useContactForm from '../components/Customers/Hooks/useContactForm';

// Define el componente funcional PropertyView, que muestra los detalles de una propiedad específica.
const PropertyView = () => {

  // Hook para acceder al objeto de ubicación actual, que contiene el estado pasado durante la navegación.
  const location = useLocation();
  // Hook para obtener la función 'navigate' para la navegación programática.
  const navigate = useNavigate();

  // Desestructura el estado de la ubicación para obtener 'fromCategory' (la ruta de la página anterior) y 'propertyId' (el ID de la propiedad a mostrar).
  // Si no se pasa estado durante la navegación, se establecen valores por defecto.
  const {fromCategory, propertyId} = location.state || {fromCategory: '/propertyCategories', propertyId: '1'};

  const {mainImage, setMainImage, thumbnails, propertyData} = usePropertyData(propertyId);
  const {detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions} = useExpandableSections();
  const {isSaved, toggleSaved} = useSavedProperties();
  const {showContactForm, toggleContactForm} = useContactForm();

  // Array de propiedades similares para mostrar en la parte inferior.
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

  // Coordenadas de latitud y longitud para centrar el mapa.
  const center = [13.6929, -89.2182];

  // Función para navegar al carrito de compras.
  const handleShoppingCartClick = () => {
    navigate('/shoppingCart');
  };

  // Renderiza la estructura de la página de vista de propiedad.
  return (
    <>
      {/* Renderiza el componente Navbar en la parte superior. */}
      <Navbar />

      {/* Contenedor principal para la vista de la propiedad. */}
      <div className="property-container3">
        {/* Sección superior que muestra la imagen principal y la información básica de la propiedad. */}
        <div className="property-header3">
          {/* Columna para las imágenes en miniatura. */}
          <div className="thumbnail-column">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className="thumbnail-wrapper"
                onClick={() => setMainImage(thumb)}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${index+1}`}
                  className={`thumbnail ${mainImage === thumb ? 'active' : ''}`}
                />
              </div>
            ))}
          </div>

          {/* Contenido principal con la imagen principal y la información de la propiedad. */}
          <div className="main-content">
            {/* Contenedor para la imagen principal y la fecha de publicación. */}
            <div className="main-image-container">
              <img src={mainImage} alt="Casa en Colonia Escalón" className="main-image" />
              <div className="image-date">Fecha Publicación: 15 de Febrero de 2024</div>
            </div>

            {/* Sección con el título, ubicación, precio y descripción de la propiedad, así como los botones de acción. */}
            <div className="property-info3">
              {/* Sección para el título de la propiedad y el botón de guardar. */}
              <div className="property-title-section3">
                <h1>{propertyData.name}</h1>
                <div className="bookmark3" onClick={toggleSaved}>
                  <img src={isSaved ? savedIcon : saveIcon} alt={isSaved ? "Guardado" : "Guardar"} />
                </div>
              </div>

              {/* Ubicación de la propiedad. */}
              <div className="property-location3">{propertyData.location}</div>
              {/* Precio de la propiedad. */}
              <div className="property-price3">{propertyData.price}</div>

              {/* Descripción de la propiedad. */}
              <p className="property-description3">{propertyData.description}</p>

              {/* Botones de "Contactar al dueño" y "Agregar al carrito". */}
              <div className="action-buttons3">
                <button className="btn-contact3" onClick={toggleContactForm}>Contactar al dueño</button>
                <button className="btn-save3" onClick={handleShoppingCartClick}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de detalles de la propiedad (habitaciones, baños, etc.). */}
        <div className="property-details-section3">
          {/* Encabezado de la sección de detalles con botón de expansión. */}
          <div className="details-header3" onClick={toggleDetails}>
            <h2>Detalles</h2>
            <button className="expand-btn">{detailsExpanded ? '-' : '+'}</button>
          </div>

          {/* Contenido de la sección de detalles, mostrado condicionalmente. */}
          {detailsExpanded && (
            <div className="details-content3">
              <ul>
                {propertyData.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sección de dimensiones de la propiedad (tamaño del lote, altura, etc.). */}
        <div className="property-dimensions-section3">
          {/* Encabezado de la sección de dimensiones con botón de expansión. */}
          <div className="dimensions-header3" onClick={toggleDimensions}>
            <h2>Dimensiones</h2>
            <button className="expand-btn">{dimensionsExpanded ? '-' : '+'}</button>
          </div>

          {/* Contenido de la sección de dimensiones, mostrado condicionalmente. */}
          {dimensionsExpanded && (
            <div className="dimensions-content3">
              <ul>
                {propertyData.dimensions.map((dimension, index) => (
                  <li key={index}>{dimension}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sección de ubicación satelital de la propiedad utilizando react-leaflet. */}
        <div className="property-location-section3">
          <h2>Ubicación satelital</h2>
          <div className="map-container">
            <MapContainer
              center={center}
              zoom={12}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={center}>
                <Popup>
                  Casa en Colonia Escalón <br /> San Salvador, El Salvador
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>

      <section className="container2">
        {/* Título de la sección de descubrimiento. */}
        <h3 className="descubre-title2">Propiedades similares</h3>
        
        <LandingPageCards cards={cardData}/>

      </section>

      {/* Renderiza el componente ContactForm condicionalmente si 'showContactForm' es true. */}
      {showContactForm && <ContactForm onClose={toggleContactForm}/>}

      {/* Renderiza el componente Footer en la parte inferior. */}
      <Footer />
    </>
  );
};

// Función auxiliar para obtener el nombre de la categoría basado en la ruta (no utilizada en el componente principal).
function getCategoryName(categoryPath){
  const categoryNames = {
    '/propertyCategories': 'Casas de Campo',
  };

  return categoryNames[categoryPath] || 'Categoría';
}

export default PropertyView;