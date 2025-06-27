import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import useRealProperties from '../Properties/Hooks/useRealProperties';
import useEnhancedCarousel from '../Carousel/Hooks/useEnhancedCarousel';
import '../styles/EstiloLandingPage.css';

const PropertyCard = ({ property, index, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setIsLoaded(true);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className="descubre-item"
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <div className="image-container">
        {!imageError ? (
          <img 
            src={property.image} 
            alt={property.caption}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <span>🏠</span>
            <p>Imagen no disponible</p>
          </div>
        )}
      </div>
      <div className="descubre-caption">
        <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
          {property.caption}
        </div>
        <div style={{ fontSize: '0.8em', opacity: 0.9 }}>
          📍 {property.location}
        </div>
        {property.price && (
          <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '4px', color: '#E9631A' }}>
            {typeof property.price === 'string' && !property.price.includes('$') 
              ? `$${property.price}` 
              : property.price}
          </div>
        )}
      </div>
    </div>
  );
};

const LandingPageCards = ({ cards, limit = 10 }) => {
  const navigate = useNavigate();
  
  // Si se pasan cards como prop (modo fallback), úsalas. Si no, carga propiedades reales
  const { properties: realProperties, loading, error } = useRealProperties(limit);
  const cardsToShow = cards || realProperties;
  
  const {
    carouselRef,
    showButtons,
    canScrollLeft,
    canScrollRight,
    isScrolling,
    isDragging,
    scrollLeft,
    scrollRight,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    handleWheel
  } = useEnhancedCarousel(300, 20);

  const handlePropertyClick = useCallback((property) => {
    if (isDragging) return; // No navegar si se está arrastrando
    
    // Si es una propiedad real (tiene id), navegar a la vista de propiedad
    if (property.id) {
      navigate('/property-view', {
        state: {
          propertyId: property.id,
          fromCategory: '/landingPage'
        }
      });
    }
    // Si es una card estática, no hacer nada por ahora
  }, [navigate, isDragging]);

  // Estados de carga y error (solo si no se pasaron cards como prop)
  if (!cards && loading) {
    return (
      <div className="carousel-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '300px',
          color: '#666'
        }}>
          <div>
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Cargando propiedades...
            </div>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #E9631A',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!cards && error) {
    return (
      <div className="carousel-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <p>⚠️ Error al cargar las propiedades</p>
          <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!cardsToShow || cardsToShow.length === 0) {
    return (
      <div className="carousel-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <p>📭 No hay propiedades disponibles en este momento</p>
        </div>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      {showButtons && (
        <button 
          className={`carousel-button prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft || isScrolling}
          aria-label="Scroll hacia la izquierda"
        >
          ←
        </button>
      )}
      
      <div 
        className="horizontal-carousel" 
        ref={carouselRef} 
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={handleWheel}
        role="region"
        aria-label="Propiedades destacadas"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto'
        }}
      >
        {cardsToShow.map((card, index) => (
          <PropertyCard 
            key={card.id || `${card.caption}-${index}`} 
            property={card}
            index={index}
            onClick={() => handlePropertyClick(card)}
          />
        ))}
      </div>
      
      {showButtons && (
        <button 
          className={`carousel-button next ${!canScrollRight ? 'disabled' : ''}`}
          onClick={scrollRight}
          disabled={!canScrollRight || isScrolling}
          aria-label="Scroll hacia la derecha"
        >
          →
        </button>
      )}
    </div>
  );
};

export default LandingPageCards;