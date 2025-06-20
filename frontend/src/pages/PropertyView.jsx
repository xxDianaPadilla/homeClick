import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/PropertyView.css";
import house1 from "../assets/image5.png";
import house2 from "../assets/image6.png";
import house3 from "../assets/image7.png";
import saveIcon from '../assets/image23.png';
import savedIcon from '../assets/image41.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ContactForm from "../components/ContactForm";
import { useLocation, useNavigate } from 'react-router-dom';
import LandingPageCards from "../components/LandingPageCards";
import { usePropertyData } from '../components/Properties/Hooks/usePropertyData';
import { useExpandableSections } from '../components/Properties/Hooks/useExpandableSections';
import { useSavedProperties } from '../components/Properties/Hooks/useSavedProperties';
import useContactForm from '../components/Customers/Hooks/useContactForm';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext'; // Importar el hook del carrito
import { toast } from 'react-hot-toast'; // Para mostrar notificaciones
import ConfirmationModal from '../components/ConfirmationModal'; // Importar el modal de confirmación

const PropertyView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  // Estado para controlar el modal de confirmación
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyCategories', propertyId: '1' };

  const { mainImage, setMainImage, thumbnails, propertyData, loading, error } = usePropertyData(propertyId);
  const { detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions } = useExpandableSections();
  const { isSaved, toggleSaved } = useSavedProperties();
  const { showContactForm, toggleContactForm } = useContactForm();
  
  // Usar el contexto del carrito
  const { addToCart, isInCart } = useCart();

  // Coordenadas por defecto (San Salvador)
  const defaultCenter = [13.6929, -89.2182];
  
  // Usar las coordenadas de la propiedad si están disponibles, de lo contrario usar las por defecto
  const mapCenter = propertyData.coordinates || defaultCenter;
  const zoom = propertyData.coordinates ? 15 : 12; // Zoom más cercano si tenemos coordenadas específicas

  // Función para centrar el mapa cuando cambien las coordenadas
  useEffect(() => {
    if (mapRef.current && propertyData.coordinates) {
      const map = mapRef.current;
      map.setView(propertyData.coordinates, 15);
    }
  }, [propertyData.coordinates]);

  // Array de propiedades similares
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
    { image: house1, caption: "Casa en Santa Elene" }
  ];

  // Función para agregar al carrito sin mostrar modal (para propiedades ya en carrito)
  const goToCartDirectly = () => {
    navigate('/shoppingCart');
  };

  // Función para manejar el modal de confirmación
  const handleConfirmationResponse = (continueShopping) => {
    if (continueShopping) {
      // Si quiere seguir comprando, solo mostrar toast de éxito
      toast.success('Propiedad agregada al carrito exitosamente');
    } else {
      // Si no quiere seguir comprando, ir al carrito (sin toast adicional)
      navigate('/shoppingCart');
    }
  };

  // Función actualizada para manejar el click del carrito
  const handleShoppingCartClick = () => {
    // Verificar si la propiedad ya está en el carrito
    if (isInCart(propertyId)) {
      // Si ya está en el carrito, ir directamente al carrito
      toast.success('Esta propiedad ya está en tu carrito');
      goToCartDirectly();
    } else {
      // Si no está en el carrito, agregarla primero
      const propertyToAdd = {
        id: propertyId,
        name: propertyData.name,
        originalPrice: propertyData.originalPrice,
        price: propertyData.price,
        description: propertyData.description,
        thumbnails: thumbnails,
        lotSize: propertyData.lotSize,
        rooms: propertyData.rooms,
        bathrooms: propertyData.bathrooms
      };
      
      // Agregar al carrito
      addToCart(propertyToAdd);
      
      // Mostrar modal de confirmación
      setShowConfirmationModal(true);
    }
  };

  // Función para obtener el texto del popup del mapa
  const getPopupText = () => {
    if (propertyData.coordinates) {
      return `${propertyData.name} - ${propertyData.location}`;
    }
    return "Ubicación aproximada - San Salvador, El Salvador";
  };

  // Función para obtener el estado de la ubicación
  const getLocationStatus = () => {
    if (loading) return "Cargando ubicación...";
    if (error) return "Error al cargar ubicación";
    if (!propertyData.coordinates) return "Ubicación aproximada";
    return "Ubicación exacta";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="property-container3">
          <div className="loading-message">Cargando información de la propiedad...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="property-container3">
        <div className="property-header3">
          <div className="thumbnail-column">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className="thumbnail-wrapper"
                onClick={() => setMainImage(thumb)}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${mainImage === thumb ? 'active' : ''}`}
                />
              </div>
            ))}
          </div>

          <div className="main-content">
            <div className="main-image-container">
              <img src={mainImage} alt={propertyData.name} className="main-image" />
              <div className="image-date">Fecha Publicación: 15 de Febrero de 2024</div>
            </div>

            <div className="property-info3">
              <div className="property-title-section3">
                <h1>{propertyData.name}</h1>
                <div className="bookmark3" onClick={toggleSaved}>
                  <img src={isSaved ? savedIcon : saveIcon} alt={isSaved ? "Guardado" : "Guardar"} />
                </div>
              </div>

              <div className="property-location3">{propertyData.location}</div>
              <div className="property-price3">{propertyData.price}</div>

              <p className="property-description3">{propertyData.description}</p>

              <div className="action-buttons3">
                <button className="btn-contact3" onClick={toggleContactForm}>Contactar al dueño</button>
                {/* Botón actualizado con nueva funcionalidad de modal */}
                <button className="btn-save3" onClick={handleShoppingCartClick}>
                  {isInCart(propertyId) ? 'Ver en carrito' : 'Agregar al carrito'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="property-details-section3">
          <div className="details-header3" onClick={toggleDetails}>
            <h2>Detalles</h2>
            <button className="expand-btn">{detailsExpanded ? '-' : '+'}</button>
          </div>

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

        <div className="property-dimensions-section3">
          <div className="dimensions-header3" onClick={toggleDimensions}>
            <h2>Dimensiones</h2>
            <button className="expand-btn">{dimensionsExpanded ? '-' : '+'}</button>
          </div>

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

        {/* Sección mejorada del mapa con información de estado */}
        <div className="property-location-section3">
          <div className="location-header">
            <h2>Ubicación satelital</h2>
            <div className="location-status">
              <span className={`status-indicator ${propertyData.coordinates ? 'exact' : 'approximate'}`}>
                {getLocationStatus()}
              </span>
            </div>
          </div>
          
          <div className="map-container">
            <MapContainer
              key={`${mapCenter[0]}-${mapCenter[1]}`} // Key para forzar re-render cuando cambien las coordenadas
              center={mapCenter}
              zoom={zoom}
              style={{ height: "400px", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapCenter}>
                <Popup>
                  <div className="custom-popup">
                    <strong>{propertyData.name}</strong><br />
                    {propertyData.location}<br />
                    {propertyData.price}
                    {!propertyData.coordinates && (
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        * Ubicación aproximada
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <br />
          {/* Información adicional del mapa */}
          <div className="map-info">
            {propertyData.coordinates ? (
              <p>📍 Coordenadas: {propertyData.coordinates[0].toFixed(6)}, {propertyData.coordinates[1].toFixed(6)}</p>
            ) : (
              <p>ℹ️ La ubicación mostrada es aproximada. Contacta al propietario para obtener la dirección exacta.</p>
            )}
          </div>
        </div>
      </div>

      <section className="container2">
        <h3 className="descubre-title2">Propiedades similares</h3>
        <LandingPageCards cards={cardData} />
      </section>

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmationResponse}
        propertyName={propertyData.name}
      />

      {showContactForm && <ContactForm onClose={toggleContactForm} />}

      <Footer />
    </>
  );
};

export default PropertyView;