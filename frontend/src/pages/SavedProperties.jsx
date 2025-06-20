import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import "../styles/SavedProperties.css";
import SavedPropertiesCard from "../components/SavedPropertiesCards";
import { useSavedProperties as useSavedPropertiesContext } from '../context/SavedPropertiesContext';

const SavedProperties = () => {
  const navigate = useNavigate();
  const { savedProperties, removeProperty, savedCount } = useSavedPropertiesContext();

  const handlePropertyViewClick = (property) => {
    navigate('/propertyView', {
      state: {
        fromCategory: '/savedProperties',
        propertyId: property._id || property.id
      }
    });
  };

  const handleRemoveProperty = (propertyId, event) => {
    event.stopPropagation(); // Evitar que se dispare el click del card
    removeProperty(propertyId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price.startsWith('$') ? price : `$${price}`;
    }
    return `$${price?.toLocaleString() || '0'}`;
  };

  // Convertir datos de propiedad al formato esperado por SavedPropertiesCard
  const convertPropertyToCardFormat = (property) => {
    const mainImage = property.images?.[0]?.image || 
                     property.thumbnails?.[0] || 
                     '/default-house.png';
    
    return {
      id: property._id || property.id,
      image: mainImage,
      price: formatPrice(property.originalPrice || property.price),
      title: property.originalName || property.name || 'Propiedad sin nombre',
      description: property.originalDescription || property.description || 'Sin descripción disponible',
      publishDate: formatDate(property.savedAt || new Date()),
      area: property.lotSize || 'No especificado',
      bedrooms: property.rooms || property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      pictures: property.images?.length || property.thumbnails?.length || 1,
      location: property.originalLocation || property.location || 'Ubicación no especificada'
    };
  };

  return (
    <>
      <Navbar />
      <div className="saved-properties-container">
        <div className="saved-properties-header">
          <h1 className="saved-properties-title">
            Lista de tus casas guardadas 
            {savedCount > 0 && <span className="saved-count">({savedCount})</span>}
          </h1>
          
          {savedCount === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🏠</div>
              <h3>No tienes propiedades guardadas</h3>
              <p>Explora nuestro catálogo y guarda las propiedades que más te interesen</p>
              <button 
                className="explore-button"
                onClick={() => navigate('/propertyCategories')}
              >
                Explorar Propiedades
              </button>
            </div>
          )}
        </div>

        {savedCount > 0 && (
          <>
            <div className="saved-properties-summary">
              <p>Has guardado {savedCount} propiedad{savedCount !== 1 ? 'es' : ''}</p>
              <div className="saved-properties-actions">
                <button 
                  className="clear-all-button"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar todas las propiedades guardadas?')) {
                      // Implementar clear all si es necesario
                      savedProperties.forEach(prop => removeProperty(prop._id || prop.id));
                    }
                  }}
                >
                  Limpiar Todo
                </button>
              </div>
            </div>

            <div className="property-list">
              {savedProperties.map((property) => {
                const cardData = convertPropertyToCardFormat(property);
                
                return (
                  <SavedPropertiesCard 
                    key={cardData.id} 
                    house={cardData} 
                    onClick={() => handlePropertyViewClick(property)}
                    onRemove={(event) => handleRemoveProperty(cardData.id, event)}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SavedProperties;