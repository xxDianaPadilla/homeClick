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
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../components/ConfirmationModal';
import useCustomerInfo from "../components/Customers/Hooks/useCustomerInfo";
import { useAuth } from "../context/AuthContext";

const PropertyView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const { isAuthenticated, userInfo, user } = useAuth();
  const { customerInfo, loading: customerLoading, isCustomer } = useCustomerInfo();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  const [showContactForm, setShowContactForm] = useState(false);

  const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyCategories', propertyId: null };

  if (!propertyId) {
    console.error('No propertyId found in location.state');
    navigate('/propertyCategories');
    return <div>Error: No se encontró ID de propiedad</div>;
  }

  const { mainImage, setMainImage, thumbnails, propertyData, loading, error } = usePropertyData(propertyId);
  const { detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions } = useExpandableSections();
  const { isSaved, toggleSaved } = useSavedProperties(propertyId);

  const { addToCart, isInCart } = useCart();

  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const defaultCenter = [13.6929, -89.2182];
  const mapCenter = propertyData.coordinates || defaultCenter;
  const zoom = propertyData.coordinates ? 15 : 12;

  useEffect(() => {
    if (mapRef.current && propertyData.coordinates) {
      const map = mapRef.current;
      map.setView(propertyData.coordinates, 15);
    }
  }, [propertyData.coordinates]);

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

  const handleSaveProperty = () => {
    if (!loading && propertyData) {
      const wasAdded = toggleSaved(propertyData);
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 2000);
      console.log(wasAdded ? 'Propiedad guardada' : 'Propiedad removida de guardados');
    }
  };

  const goToCartDirectly = () => {
    navigate('/shoppingCart');
  };

  const handleConfirmationResponse = (continueShopping) => {
    if (continueShopping) {
      toast.success('Propiedad agregada al carrito exitosamente');
    } else {
      navigate('/shoppingCart');
    }
  };

  const handleShoppingCartClick = () => {
    if (isInCart(propertyId)) {
      toast.success('Esta propiedad ya está en tu carrito');
      goToCartDirectly();
    } else {
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

      addToCart(propertyToAdd);
      setShowConfirmationModal(true);
    }
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  const handleContactOwner = () => {

    if (isAuthenticated && customerLoading) {
      toast.loading('Cargando información del usuario...', { duration: 1000 });
      return;
    }

    const isActuallyCustomer = user?.userType === 'Customer' || user?.userType === 'customer';
    
    if (isAuthenticated && !isActuallyCustomer) {
      toast.error(`Solo los clientes pueden contactar propietarios. Tu tipo: ${user?.userType}`);
      return;
    }

    setShowContactForm(true);
    
    if (isActuallyCustomer && userInfo) {
      toast.success('Formulario pre-llenado con tu información', { duration: 2000 });
    } else if (isAuthenticated) {
      toast('Formulario de contacto abierto', { duration: 1500 });
    }
  };

  const getLocationStatus = () => {
    if (loading) return "Cargando ubicación...";
    if (error) return "Error al cargar ubicación";
    if (!propertyData.coordinates) return "Ubicación aproximada";
    return "Ubicación exacta";
  };

  const getContactButtonText = () => {
    if (isAuthenticated && customerLoading) {
      return 'Cargando...';
    }
    if (isCustomer) {
      return 'Contactar al dueño';
    }
    return 'Contactar al dueño';
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
        {showSaveMessage && (
          <div className={`save-feedback ${isSaved ? 'saved' : 'removed'}`}>
            {isSaved ? '✓ Propiedad guardada' : '✗ Propiedad removida de guardados'}
          </div>
        )}

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
                <div
                  className={`bookmark3 ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveProperty}
                  title={isSaved ? "Remover de guardados" : "Guardar propiedad"}
                >
                  <img
                    src={isSaved ? savedIcon : saveIcon}
                    alt={isSaved ? "Guardado" : "Guardar"}
                  />
                </div>
              </div>

              <div className="property-location3">{propertyData.location}</div>
              <div className="property-price3">{propertyData.price}</div>

              <p className="property-description3">{propertyData.description}</p>

              {isAuthenticated && user?.userType === 'Customer' && userInfo && (
                <div className="customer-info-display">
                  <small className="customer-greeting">
                    👋 Hola {userInfo.firstName || userInfo.name || 'Usuario'}, tu información se llenará automáticamente en el formulario
                  </small>
                </div>
              )}
              <br />

              <div className="action-buttons3">
                <button 
                  className="btn-contact3" 
                  onClick={handleContactOwner}
                  disabled={isAuthenticated && customerLoading}
                >
                  {getContactButtonText()}
                </button>
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
              key={`${mapCenter[0]}-${mapCenter[1]}`}
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

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleConfirmationResponse}
        propertyName={propertyData.name}
      />

      {showContactForm && (
        <ContactForm
          onClose={closeContactForm}
          propertyName={propertyData.name}
        />
      )}

      <Footer />
    </>
  );
};

export default PropertyView;