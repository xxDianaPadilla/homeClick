import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useRealProperties from '../components/Properties/Hooks/useRealProperties';
import useEnhancedCarousel from '../components/Carousel/Hooks/useEnhancedCarousel';
import '../styles/EstiloLandingPage.css';

const PropertyCard = ({ property, index, isVisible, onClick }) => {
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
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={onClick}
      role="article"
      aria-label={`Propiedad: ${property.caption}`}
    >
      <div className="image-container">
        {!imageError ? (
          <img 
            src={property.image} 
            alt={property.caption}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading={isVisible ? "eager" : "lazy"}
            decoding="async"
            style={{
              transition: 'transform 0.3s ease'
            }}
          />
        ) : (
          <div className="image-placeholder" role="img" aria-label="Imagen no disponible">
            <span aria-hidden="true">🏠</span>
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

const RealPropertiesCarousel = ({ limit = 10, title = "Descubre" }) => {
  const navigate = useNavigate();
  const { properties, loading, error } = useRealProperties(limit);
  
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

  const handlePropertyClick = (property) => {
    if (isDragging) return; // No navegar si se está arrastrando
    
    console.log('Navegando a PropertyView con ID:', property.id);
    
    navigate('/propertyView', {
      state: {
        fromCategory: window.location.pathname, // Usar la ruta actual como origen
        propertyId: property.id, // ID de la propiedad
        selectedCategory: null // No hay categoría específica en carouseles generales
      }
    });
  };

  if (loading) {
    return (
      <div className="carousel-container">
        <h2 className="descubre-title">{title}</h2>
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

  if (error) {
    return (
      <div className="carousel-container">
        <h2 className="descubre-title">{title}</h2>
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

  if (!properties || properties.length === 0) {
    return (
      <div className="carousel-container">
        <h2 className="descubre-title">{title}</h2>
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
      {/* Botón de navegación izquierdo */}
      {showButtons && (
        <button 
          className={`carousel-button prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft || isScrolling}
          aria-label="Anterior"
          tabIndex={0}
        >
          <span aria-hidden="true">←</span>
        </button>
      )}
      
      {/* Contenedor principal del carousel */}
      <div 
        className="horizontal-carousel" 
        ref={carouselRef} 
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onWheel={handleWheel}
        role="region"
        aria-label={`Galería de propiedades - ${title}`}
        tabIndex={0}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto',
          // Optimizaciones para scroll fluido
          transform: 'translateZ(0)',
          willChange: 'scroll-position',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          overscrollBehaviorX: 'contain',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {properties.map((property, index) => (
          <div
            key={property.id}
            data-property-index={index}
            className="descubre-item-wrapper"
            style={{
              scrollSnapAlign: 'start',
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              contain: 'layout style paint'
            }}
          >
            <PropertyCard 
              property={property}
              index={index}
              isVisible={index < 5} // Cargar las primeras 5 imágenes eagerly
              onClick={() => handlePropertyClick(property)}
            />
          </div>
        ))}
      </div>
      
      {/* Botón de navegación derecho */}
      {showButtons && (
        <button 
          className={`carousel-button next ${!canScrollRight ? 'disabled' : ''}`}
          onClick={scrollRight}
          disabled={!canScrollRight || isScrolling}
          aria-label="Siguiente"
          tabIndex={0}
        >
          <span aria-hidden="true">→</span>
        </button>
      )}

      {/* Indicadores de posición (opcional) */}
      {properties.length > 3 && (
        <div className="carousel-indicators" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: 'var(--spacing-md)',
          opacity: showButtons ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          {Array.from({ length: Math.ceil(properties.length / 3) }, (_, i) => (
            <button
              key={i}
              className="carousel-indicator"
              onClick={() => {
                const targetScroll = i * 900; // 3 items * 300px width
                carouselRef.current?.scrollTo({
                  left: targetScroll,
                  behavior: 'smooth'
                });
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: i === Math.floor((carouselRef.current?.scrollLeft || 0) / 900) 
                  ? 'var(--color-primary, #E9631A)' 
                  : 'rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              aria-label={`Ir a la sección ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RealPropertiesCarousel;