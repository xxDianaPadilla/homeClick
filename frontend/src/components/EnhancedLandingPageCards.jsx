import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import useRealProperties from '../Properties/Hooks/useRealProperties';
import useEnhancedCarousel from '../Carousel/Hooks/useEnhancedCarousel';
import '../styles/EstiloLandingPage.css';
import '../styles/EnhancedCarousel.css';

/**
 * Componente Card individual optimizado para el carousel
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.property - Datos de la propiedad
 * @param {number} props.index - Índice de la card para animaciones escalonadas
 * @param {boolean} props.isVisible - Si la card está visible en el viewport
 * @param {Function} props.onClick - Función de click
 */
const PropertyCard = ({ property, index, isVisible, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageAttempts, setImageAttempts] = useState(0);

  /**
   * Maneja errores de carga de imagen con sistema de reintentos
   */
  const handleImageError = useCallback(() => {
    if (imageAttempts < 3) {
      // Reintenta cargar la imagen hasta 3 veces
      setImageAttempts(prev => prev + 1);
      setTimeout(() => {
        const img = new Image();
        img.onload = () => {
          setIsLoaded(true);
          setImageError(false);
        };
        img.onerror = () => {
          setImageError(true);
          setIsLoaded(true);
        };
        img.src = property.image;
      }, 1000 * imageAttempts); // Delay incremental
    } else {
      setImageError(true);
      setIsLoaded(true);
    }
  }, [property.image, imageAttempts]);

  /**
   * Maneja la carga exitosa de la imagen
   */
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setImageError(false);
  }, []);

  // Reset cuando cambia la imagen
  useEffect(() => {
    setImageError(false);
    setIsLoaded(false);
    setImageAttempts(0);
  }, [property.image]);

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
            loading={isVisible ? "eager" : "lazy"} // Lazy loading inteligente
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
        <div className="property-location" style={{ fontSize: '0.8em', opacity: 0.9 }}>
          📍 {property.location}
        </div>
        {property.price && (
          <div className="property-price" style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '4px', color: '#E9631A' }}>
            {typeof property.price === 'string' && !property.price.includes('$') 
              ? `$${property.price}` 
              : property.price}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Carousel horizontal mejorado con soporte táctil avanzado y propiedades reales
 * @param {Object} props - Propiedades del componente
 * @param {number} props.limit - Límite de propiedades a mostrar
 */
const EnhancedLandingPageCards = ({ limit = 10 }) => {
  const navigate = useNavigate();
  const { properties, loading, error } = useRealProperties(limit);
  const [visibleCards, setVisibleCards] = useState(new Set());
  
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

  /**
   * Detecta qué cards están visibles con intersection observer para mayor eficiencia
   */
  const updateVisibleCards = useCallback(() => {
    if (carouselRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const newVisibleCards = new Set(visibleCards);
          entries.forEach((entry) => {
            const index = parseInt(entry.target.dataset.propertyIndex || '0');
            if (entry.isIntersecting) {
              newVisibleCards.add(index);
            } else {
              newVisibleCards.delete(index);
            }
          });
          setVisibleCards(newVisibleCards);
        },
        {
          root: carouselRef.current,
          rootMargin: '0px',
          threshold: 0.1
        }
      );

      const cards = carouselRef.current.querySelectorAll('.descubre-item-wrapper');
      cards.forEach((card) => observer.observe(card));

      return () => observer.disconnect();
    }
  }, [visibleCards]);

  /**
   * Maneja el click en una propiedad - MISMO PATRÓN QUE PROPERTYCATEGORIES
   */
  const handlePropertyClick = useCallback((property) => {
    if (isDragging) return; // No navegar si se está arrastrando
    
    console.log('Navegando a PropertyView con ID:', property.id);
    
    navigate('/propertyView', {
      state: {
        fromCategory: window.location.pathname, // Usar la ruta actual como origen
        propertyId: property.id, // ID de la propiedad
        selectedCategory: null // No hay categoría específica en carouseles generales
      }
    });
  }, [navigate, isDragging]);

  // Effect para configurar intersection observer
  useEffect(() => {
    const cleanup = updateVisibleCards();
    return cleanup;
  }, [updateVisibleCards, properties]);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="carousel-container">
        <div className="carousel-loading">
          <div>
            <div className="loading-spinner"></div>
            <div>Cargando propiedades...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carousel-container">
        <div className="carousel-error">
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
        <div className="carousel-error">
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
        aria-label="Galería de propiedades destacadas"
        tabIndex={0}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto'
        }}
      >
        {properties.map((property, index) => (
          <div
            key={property.id}
            data-property-index={index}
            className="descubre-item-wrapper"
          >
            <PropertyCard 
              property={property}
              index={index}
              isVisible={visibleCards.has(index)}
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
        <div className="carousel-indicators">
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
                backgroundColor: i === Math.floor((carouselRef.current?.scrollLeft || 0) / 900) 
                  ? 'var(--color-primary, #E9631A)' 
                  : 'rgba(0, 0, 0, 0.3)'
              }}
              aria-label={`Ir a la sección ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedLandingPageCards;