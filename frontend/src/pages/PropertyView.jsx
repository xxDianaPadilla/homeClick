import React, { useEffect, useState } from "react"; // Importa React, useEffect para efectos secundarios y useState para gestionar el estado local.
import Navbar from '../components/Navbar'; // Importa el componente Navbar para la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer para el pie de página.
import "../styles/PropertyView.css"; // Importa los estilos CSS específicos para la vista de propiedad.
import house1 from "../assets/image27.png"; // Importa una imagen de casa.
import house6 from "../assets/image6.png"; // Importa otra imagen de casa.
import house7 from "../assets/image7.png"; // Importa una tercera imagen de casa.
import house8 from "../assets/image5.png"; // Importa una cuarta imagen de casa (usada como imagen principal inicial).
import saveIcon from '../assets/image23.png'; // Importa el icono de "guardar".
import savedIcon from '../assets/image41.png'; // Importa el icono de "guardado".
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importa componentes de react-leaflet para la visualización de mapas.
import ContactForm from "../components/ContactForm"; // Importa el componente ContactForm para el formulario de contacto.
import { useLocation, useNavigate } from 'react-router-dom'; // Importa hooks para acceder a la ubicación actual y para la navegación.

// Define el componente funcional PropertyView, que muestra los detalles de una propiedad específica.
const PropertyView = () => {
  // Estado para la imagen principal mostrada. Inicialmente establecida en house8.
  const [mainImage, setMainImage] = useState(house8);
  // Estado para controlar la expansión de la sección de detalles.
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  // Estado para controlar la expansión de la sección de dimensiones.
  const [dimensionsExpanded, setDimensionsExpanded] = useState(false);
  // Estado para controlar la visibilidad del formulario de contacto.
  const [showContactForm, setShowContactForm] = useState(false);
  // Estado para controlar si la propiedad está guardada en la lista de deseos del usuario.
  const [isSaved, setIsSaved] = useState(false);

  // Función para cambiar el estado de guardado de la propiedad.
  const toggleSaved = () =>{
    setIsSaved(!isSaved);
  }

  // Hook para acceder al objeto de ubicación actual, que contiene el estado pasado durante la navegación.
  const location = useLocation();
  // Hook para obtener la función 'navigate' para la navegación programática.
  const navigate = useNavigate();

  // Desestructura el estado de la ubicación para obtener 'fromCategory' (la ruta de la página anterior) y 'propertyId' (el ID de la propiedad a mostrar).
  // Si no se pasa estado durante la navegación, se establecen valores por defecto.
  const {fromCategory, propertyId} = location.state || {fromCategory: '/propertyCategories', propertyId: '1'};

  // Hook useEffect que se ejecuta cuando cambia 'propertyId' o 'fromCategory'.
  useEffect(() =>{
    console.log(`Cargando propiedad ID: ${propertyId} desde la categoría: ${fromCategory}`);

    // Simula la carga de diferentes imágenes principales basadas en el ID de la propiedad.
    if (propertyId === '2' || propertyId === '5' || propertyId === '8') {
      setMainImage(house6);
    } else if (propertyId === '3' || propertyId === '6' || propertyId === '9') {
      setMainImage(house7);
    }
  }, [propertyId, fromCategory]);

  // Array de imágenes en miniatura para la galería de la propiedad.
  const thumbnails = [house1, house6, house7, house1];

  // Objeto con los datos de la propiedad mostrada.
  const propertyData = {
    title: "Casa en Colonia Escalón",
    price: "$150,000",
    location: "San Salvador, El Salvador",
    description: "Hermosa y lugar de lujo donde se une espectacularmente zona residencial. Disfruta una viviesta privada y accesible, con amplios espacios iluminados, comodidad y seguridad. Ideal para familias que buscan calidad de vida, cerca de centros comerciales, colegios y zonas recreativas. Acaba y detalles modernos, ofrecen un equilibrio perfecto entre estilo, funcionalidad y confort.",
    details: [
      "Habitaciones: 3",
      "Baños: 4",
      "Parqueo: Sí",
      "Patio: Sí",
      "Ubicación: Urbanización Alpes de la Escalón, San Salvador centro",
      "Número: 42",
      "Tipo de piso: Cemento pulido",
      "Año de construcción: 2021"
    ],
    dimensions: [
      "Tamaño del lote: 150 metros cuadrados",
      "Altura: 3.2 metros"
    ]
  };

  // Array de propiedades similares para mostrar en la parte inferior.
  const similarProperties = [
    { id: 1, image: house6, title: "Casa en la zona Rosa" },
    { id: 2, image: house7, title: "Casa en santa tecla" },
    { id: 3, image: house1, title: "Casa en Colonia Escalón" }
  ];

  // Función para alternar la visibilidad de la sección de detalles.
  const toggleDetails = () => {
    setDetailsExpanded(!detailsExpanded);
  };

  // Función para alternar la visibilidad de la sección de dimensiones.
  const toggleDimensions = () => {
    setDimensionsExpanded(!dimensionsExpanded);
  };

  // Coordenadas de latitud y longitud para centrar el mapa.
  const center = [13.6929, -89.2182];

  // Función para alternar la visibilidad del formulario de contacto.
  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

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
                <h1>{propertyData.title}</h1>
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

        {/* Sección de propiedades similares. */}
        <div className="similar-properties-section">
          <h2>Casas similares</h2>
          <div className="similar-properties-gallery">
            {similarProperties.map(property => (
              <div key={property.id} className="similar-property" onClick={() => setMainImage(property.image)}>
                <img src={property.image} alt={property.title} />
                <p>{property.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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