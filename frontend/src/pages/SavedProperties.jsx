import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import "../styles/SavedProperties.css";
import { useSavedProperties as useSavedPropertiesContext } from '../context/SavedPropertiesContext';
import { useAuth } from "../context/AuthContext";

const SavedProperties = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { savedProperties, removeProperty, savedCount } = useSavedPropertiesContext();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [removingProperty, setRemovingProperty] = useState(null);

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProperties(savedProperties);
    } else {
      const filtered = savedProperties.filter(property => {
        const name = property.originalName || property.name || '';
        const location = property.originalLocation || property.location || '';
        const searchLower = searchTerm.toLowerCase();

        return (
          name.toLowerCase().includes(searchLower) ||
          location.toLowerCase().includes(searchLower)
        );
      });
      setFilteredProperties(filtered);
    }
  }, [savedProperties, searchTerm]);

  const handlePropertyViewClick = (property) => {
    navigate('/propertyView', {
      state: {
        fromCategory: '/savedProperties',
        propertyId: property._id || property.id
      }
    });
  };

  const handleRemoveProperty = (propertyId, propertyName, event) => {
    event.stopPropagation();
    setRemovingProperty(propertyId);
    
    // Animación de eliminación
    setTimeout(() => {
      removeProperty(propertyId);
      setRemovingProperty(null);
    }, 300);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toLocaleString()}`;
    }
    if (typeof price === 'string') {
      return price.startsWith('$') ? price : `$${price}`;
    }
    return 'Precio no disponible';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
        <div className="saved-properties-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando propiedades guardadas...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
      
      <div className="saved-properties-container">
        <div className="saved-properties-header">
          <h1 className="saved-properties-title">
            🏠 Lista de tus casas guardadas
            {savedCount > 0 && <span className="saved-count">({savedCount})</span>}
          </h1>
          
          {savedCount === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🏠</div>
              <h3>No tienes propiedades guardadas</h3>
              <p>Explora nuestro catálogo y guarda las propiedades que más te interesen haciendo clic en el ícono de guardar</p>
              <button 
                className="explore-button"
                onClick={() => navigate('/propertyCategories')}
              >
                Explorar Propiedades
              </button>
            </div>
          ) : (
            <>
              <div className="saved-properties-summary">
                <div className="summary-info">
                  <div className="summary-stats">
                    <span className="properties-count">
                      {filteredProperties.length} de {savedCount} propiedad{savedCount !== 1 ? 'es' : ''}
                    </span>
                    {searchTerm && (
                      <span className="search-results">
                        Resultados para "{searchTerm}"
                      </span>
                    )}
                  </div>
                  {searchTerm && filteredProperties.length === 0 && (
                    <p className="no-results-text">
                      ❌ No se encontraron propiedades que coincidan con tu búsqueda
                    </p>
                  )}
                </div>
                
                <div className="saved-properties-actions">
                  {searchTerm && (
                    <button 
                      className="clear-search-button"
                      onClick={() => setSearchTerm('')}
                    >
                      🔍 Limpiar búsqueda
                    </button>
                  )}
                </div>
              </div>

              <div className="property-list">
                {filteredProperties.map((property) => (
                  <div 
                    key={property._id || property.id} 
                    className={`property-card ${removingProperty === (property._id || property.id) ? 'removing' : ''}`}
                    onClick={() => handlePropertyViewClick(property)}
                  >
                    <div className="property-image-container">
                      <img 
                        src={property.images?.[0]?.image || property.thumbnails?.[0] || '/default-house.png'} 
                        alt={property.originalName || property.name}
                        className="property-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="property-image-placeholder" style={{display: 'none'}}>
                        <span>🏠</span>
                        <span>Sin imagen</span>
                      </div>
                      
                      <div className="image-counter">
                        <span className="pictures-icon">📷</span>
                        <span>{property.images?.length || property.thumbnails?.length || 1}</span>
                      </div>

                      <div className="property-status">
                        <button 
                          className="remove-property-btn"
                          onClick={(e) => handleRemoveProperty(
                            property._id || property.id, 
                            property.originalName || property.name || 'esta propiedad',
                            e
                          )}
                          title="Eliminar de guardados"
                          disabled={removingProperty === (property._id || property.id)}
                        >
                          {removingProperty === (property._id || property.id) ? '⏳' : '❌'}
                        </button>
                      </div>
                    </div>

                    <div className="property-details">
                      <div className="property-header">
                        <span className="property-price">
                          {formatPrice(property.originalPrice || property.price)}
                        </span>
                        <h2 className="property-title">
                          {property.originalName || property.name || 'Propiedad sin nombre'}
                        </h2>
                      </div>

                      <p className="property-description">
                        {property.originalDescription || property.description || 'Sin descripción disponible'}
                      </p>

                      <div className="publish-date">
                        📅 Fecha Guardado: {formatDate(property.savedAt)}
                      </div>

                      {(property.originalLocation || property.location) && (
                        <div className="property-location-info">
                          📍 {property.originalLocation || property.location}
                        </div>
                      )}

                      <div className="property-meta">
                        <div className="meta-item">
                          <span className="meta-icon">📐</span>
                          <span className="meta-text">{property.lotSize || 'No especificado'}</span>
                        </div>

                        <div className="meta-item">
                          <span className="meta-icon">🛏️</span>
                          <span className="meta-text">{property.rooms || property.bedrooms || 0} hab.</span>
                        </div>

                        <div className="meta-item">
                          <span className="meta-icon">🚿</span>
                          <span className="meta-text">{property.bathrooms || 0} baños</span>
                        </div>

                        <div className="meta-item">
                          <span className="meta-icon">👥</span>
                          <button 
                            className="contact-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePropertyViewClick(property);
                            }}
                          >
                            Ver detalles
                          </button>
                        </div>

                        <div className="meta-item">
                          <span className="meta-icon">🗑️</span>
                          <button 
                            className="delete-button"
                            onClick={(e) => handleRemoveProperty(
                              property._id || property.id, 
                              property.originalName || property.name || 'esta propiedad',
                              e
                            )}
                            title="Eliminar de guardados"
                            disabled={removingProperty === (property._id || property.id)}
                          >
                            {removingProperty === (property._id || property.id) ? 'Eliminando...' : 'Eliminar guardado'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SavedProperties;