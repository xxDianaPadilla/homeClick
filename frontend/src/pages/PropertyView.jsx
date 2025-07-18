import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/PropertyView.css";
import saveIcon from '../assets/image23.png';
import savedIcon from '../assets/image41.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ContactForm from "../components/ContactForm";
import { useLocation, useNavigate } from 'react-router-dom';
import TailwindPropertiesCarousel from "../components/TailwindPropertiesCarousel";
import { usePropertyData } from '../components/Properties/Hooks/usePropertyData';
import { useExpandableSections } from '../components/Properties/Hooks/useExpandableSections';
import { useSavedProperties } from '../components/Properties/Hooks/useSavedProperties';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../components/ConfirmationModal';
import useCustomerInfo from "../components/Customers/Hooks/useCustomerInfo";
import { useAuth } from "../context/AuthContext";
import ReviewsSection from '../components/ReviewSection';

const PropertyView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const { isAuthenticated, userInfo, user } = useAuth();
  const { customerInfo, loading: customerLoading, isCustomer } = useCustomerInfo();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { fromCategory, propertyId } = useMemo(() => {
    const state = location.state || {};
    return {
      fromCategory: state.fromCategory || '/propertyCategories',
      propertyId: state.propertyId || null
    };
  }, [location.state]);

  useEffect(() => {
    if (!propertyId) {
      console.error('No propertyId found in location.state');
      toast.error('No se encontró información de la propiedad');
      navigate('/propertyCategories');
    }
  }, [propertyId, navigate]);

  const { mainImage, setMainImage, thumbnails, propertyData, loading, error } = usePropertyData(propertyId);
  const { detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions } = useExpandableSections();
  const { isSaved, toggleSaved } = useSavedProperties(propertyId);
  const { addToCart, isInCart } = useCart();

  const defaultCenter = [13.6929, -89.2182];
  const mapCenter = useMemo(() => {
    return propertyData?.coordinates || defaultCenter;
  }, [propertyData?.coordinates]);

  const zoom = useMemo(() => {
    return propertyData?.coordinates ? 15 : 12;
  }, [propertyData?.coordinates]);

  useEffect(() => {
    if (mapRef.current && propertyData?.coordinates && mapLoaded) {
      const map = mapRef.current;
      try {
        map.setView(propertyData.coordinates, 15);
      } catch (error) {
        console.warn('Error updating map view:', error);
      }
    }
  }, [propertyData?.coordinates, mapLoaded]);

  const requiresAuth = useCallback((action) => {
    if (!isAuthenticated) {
      toast.error(`Debes iniciar sesión para ${action}`);
      sessionStorage.setItem('redirectAfterLogin', location.pathname);
      navigate('/inicio-sesion', {
        state: {
          from: location.pathname,
          propertyId: propertyId
        }
      });
      return false;
    }
    return true;
  }, [isAuthenticated, navigate, location.pathname, propertyId]);

  const handleSaveProperty = useCallback(() => {
    if (!requiresAuth('guardar propiedades')) return;

    if (loading || !propertyData) {
      toast.error('No se puede guardar la propiedad en este momento');
      return;
    }

    try {
      const wasAdded = toggleSaved(propertyData);
      setShowSaveMessage(true);

      setTimeout(() => setShowSaveMessage(false), 2000);

      const message = wasAdded ? 'Propiedad guardada exitosamente' : 'Propiedad removida de guardados';
      toast.success(message);

      console.log(`${wasAdded ? 'Guardada' : 'Removida'}: ${propertyData.name}`);
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Error al guardar la propiedad');
    }
  }, [requiresAuth, loading, propertyData, toggleSaved]);

  const goToCartDirectly = useCallback(() => {
    if (!requiresAuth('acceder al carrito')) return;
    navigate('/shoppingCart');
  }, [requiresAuth, navigate]);

  const handleConfirmationResponse = useCallback((continueShopping) => {
    setShowConfirmationModal(false);

    if (continueShopping) {
      toast.success('Propiedad agregada al carrito exitosamente');
    } else {
      navigate('/shoppingCart');
    }
  }, [navigate]);

  const addToCartDB = useCallback(async (propertyData) => {
    try {
      const customerId = user?.id;

      if (!customerId) {
        toast.error('Error: No se pudo identificar el usuario');
        return false;
      }

      let propertyPrice = propertyData.price;
      if (typeof propertyPrice === 'string') {
        propertyPrice = parseFloat(propertyPrice.replace(/[$,]/g, ''));
      }

      const cartItem = {
        customerId: customerId,
        propertyId: propertyId,
        quantity: 1,
        subtotal: propertyPrice
      };

      console.log('Enviando al carrito: ', cartItem);

      const response = await fetch('http://localhost:4000/api/shoppingCart/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(cartItem)
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Item agregado a la BD exitosamente: ', result);
        return true;
      } else {
        console.error('Error del servidor: ', result);
        toast.error(result.message || 'Error al agregar al carrito');
        return false;
      }
    } catch (error) {
      console.error('Error agregando al carrito: ', error);
      toast.error('Error de conexión al agregar al carrito');
      return false;
    }
  }, [user?.id, propertyId]);

  const checkIfInCartDB = useCallback(async () => {
    try {
      const customerId = user?.id;

      if (!customerId) {
        return false;
      }

      const response = await fetch(`http://localhost:4000/api/shoppingCart/customer/${customerId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const cartData = await response.json();

        const isInCart = cartData.items?.some(item =>
          item.propertyId._id === propertyId || item.propertyId === propertyId
        );

        return isInCart;
      }

      return false;
    } catch (error) {
      console.error('Error verificando carrito: ', error);
      return false;
    }
  }, [user?.id, propertyId]);

  const handleShoppingCartClick = useCallback(async () => {
    if (!requiresAuth('agregar al carrito')) return;

    if (!propertyData) {
      toast.error('Información de propiedad no disponible');
      return;
    }

    const alreadyInCart = await checkIfInCartDB();

    if (alreadyInCart) {
      toast.success('Esta propiedad ya está en tu carrito');
      navigate('/shoppingCart');
      return;
    }

    try {
      const loadingToast = toast.loading('Agregando al carrito...');

      const success = await addToCartDB(propertyData);

      toast.dismiss(loadingToast);

      if (success) {
        const propertyToAdd = {
          id: propertyId,
          name: propertyData.name,
          originalPrice: propertyData.originalPrice,
          price: propertyData.price,
          description: propertyData.description,
          thumbnails: thumbnails,
          lotSize: propertyData.lotSize,
          rooms: propertyData.rooms,
          bathrooms: propertyData.bathrooms,
          location: propertyData.location
        };

        addToCart(propertyToAdd);
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error('Error adding to cart: ', error);
      toast.error('Error al agregar al carrito');
    }
  }, [requiresAuth, propertyData, propertyId, checkIfInCartDB, addToCartDB, addToCart, thumbnails, navigate]);

  const closeContactForm = useCallback(() => {
    setShowContactForm(false);
  }, []);

  const handleContactOwner = useCallback(() => {
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

    if (isAuthenticated && isActuallyCustomer && userInfo) {
      toast.success('Formulario pre-llenado con tu información', { duration: 2000 });
    } else if (isAuthenticated) {
      toast('Formulario de contacto abierto', { duration: 1500 });
    } else {
      toast('Puedes contactar sin iniciar sesión, pero tendrás que llenar todos los datos manualmente', {
        duration: 3000
      });
    }
  }, [isAuthenticated, customerLoading, user?.userType, userInfo]);

  const getLocationStatus = useCallback(() => {
    if (loading) return "Cargando ubicación...";
    if (error) return "Error al cargar ubicación";
    if (!propertyData?.coordinates) return "Ubicación aproximada";
    return "Ubicación exacta";
  }, [loading, error, propertyData?.coordinates]);

  const getContactButtonText = useCallback(() => {
    if (isAuthenticated && customerLoading) {
      return 'Cargando...';
    }
    return 'Contactar al dueño';
  }, [isAuthenticated, customerLoading]);

  const getSaveButtonText = useCallback(() => {
    if (!isAuthenticated) {
      return 'Iniciar sesión para guardar';
    }
    return isSaved ? 'Guardado' : 'Guardar propiedad';
  }, [isAuthenticated, isSaved]);

  const getCartButtonText = useCallback(() => {
    if (!isAuthenticated) {
      return 'Iniciar sesión para agregar';
    }
    return 'Agregar al carrito';
  }, [isAuthenticated]);

  useEffect(() => {
    const syncCartWithDB = async () => {
      if(isAuthenticated && user?.id && propertyId){
        const inCart = await checkIfInCartDB();
        console.log(`Propiedad ${propertyId} está en carrito:`, inCart);
      }
    };

    syncCartWithDB();
  }, [isAuthenticated, user?.id, propertyId, checkIfInCartDB]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="property-container3">
          <div className="error-message">
            <h2>Error al cargar la propiedad</h2>
            <p>{error.message || 'Ha ocurrido un error inesperado'}</p>
            <button
              onClick={() => navigate('/propertyCategories')}
              className="btn-primary"
            >
              Volver a propiedades
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (loading || !propertyData) {
    return (
      <>
        <Navbar />
        <div className="property-container3">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-message">Cargando información de la propiedad...</div>
          </div>
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
            {thumbnails?.map((thumb, index) => (
              <div
                key={index}
                className="thumbnail-wrapper"
                onClick={() => setMainImage(thumb)}
              >
                <img
                  src={thumb}
                  alt={`Vista ${index + 1} de ${propertyData.name}`}
                  className={`thumbnail ${mainImage === thumb ? 'active' : ''}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="main-content">
            <div className="main-image-container">
              <img
                src={mainImage}
                alt={propertyData.name}
                className="main-image"
                loading="eager"
              />
              <div className="image-date">
                Fecha Publicación: {propertyData.publishDate || '15 de Febrero de 2024'}
              </div>
            </div>

            <div className="property-info3">
              <div className="property-title-section3">
                <h1>{propertyData.name}</h1>
                <button
                  className={`bookmark3 ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveProperty}
                  title={getSaveButtonText()}
                  aria-label={getSaveButtonText()}
                >
                  <img
                    src={isSaved ? savedIcon : saveIcon}
                    alt={isSaved ? "Guardado" : "Guardar"}
                  />
                </button>
              </div>

              <div className="property-location3">{propertyData.location}</div>
              <div className="property-price3">{propertyData.price}</div>

              <p className="property-description3">{propertyData.description}</p>

              {isAuthenticated && user?.userType === 'Customer' && userInfo && (
                <div className="customer-info-display">
                  <small className="customer-greeting">
                    👋 Hola {userInfo.firstName || userInfo.name || 'Usuario'},
                    tu información se llenará automáticamente en el formulario
                  </small>
                </div>
              )}

              <div className="action-buttons3">
                <button
                  className="btn-contact3"
                  onClick={handleContactOwner}
                  disabled={isAuthenticated && customerLoading}
                >
                  {getContactButtonText()}
                </button>
                <button
                  className="btn-save3"
                  onClick={handleShoppingCartClick}
                  disabled={loading}
                >
                  {getCartButtonText()}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="property-details-section3">
          <div className="details-header3" onClick={toggleDetails}>
            <h2>Detalles</h2>
            <button className="expand-btn" aria-label="Expandir detalles">
              {detailsExpanded ? '−' : '+'}
            </button>
          </div>

          {detailsExpanded && (
            <div className="details-content3">
              <ul>
                {propertyData.details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                )) || <li>No hay detalles disponibles</li>}
              </ul>
            </div>
          )}
        </div>

        <div className="property-dimensions-section3">
          <div className="dimensions-header3" onClick={toggleDimensions}>
            <h2>Dimensiones</h2>
            <button className="expand-btn" aria-label="Expandir dimensiones">
              {dimensionsExpanded ? '−' : '+'}
            </button>
          </div>

          {dimensionsExpanded && (
            <div className="dimensions-content3">
              <ul>
                {propertyData.dimensions?.map((dimension, index) => (
                  <li key={index}>{dimension}</li>
                )) || <li>No hay dimensiones disponibles</li>}
              </ul>
            </div>
          )}
        </div>

        <div className="property-reviews-section3">
          <ReviewsSection
            propertyId={propertyId}
            propertyName={propertyData.name}
            isAuthenticated={isAuthenticated}
            customerInfo={customerInfo}
            isCustomer={isCustomer}
          />
        </div>

        <br />

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
              whenReady={() => setMapLoaded(true)}
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

          <div className="map-info">
            {propertyData.coordinates ? (
              <p>📍 Coordenadas: {propertyData.coordinates[0].toFixed(6)}, {propertyData.coordinates[1].toFixed(6)}</p>
            ) : (
              <p>ℹ️ La ubicación mostrada es aproximada. Contacta al propietario para obtener la dirección exacta.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sección de propiedades similares con carousel mejorado */}
      <section className="container2">
        <TailwindPropertiesCarousel 
          limit={6}
          title="Propiedades similares"
        />
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
          propertyId={propertyId}
          userInfo={isAuthenticated ? userInfo : null}
        />
      )}

      <Footer />
    </>
  );
};

export default PropertyView;