import React, { useRef, useState, useEffect, useCallback } from "react";
import '../styles/EstiloLandingPage.css';

/**
 * Componente Card individual optimizado para el carousel
 * @param {Object} props - Propiedades del componente
 * @param {string} props.image - URL de la imagen
 * @param {string} props.caption - Texto descriptivo de la card
 * @param {number} props.index - Índice de la card para animaciones escalonadas
 * @param {boolean} props.isVisible - Si la card está visible en el viewport
 */
const Card = ({ image, caption, index, isVisible }) => {
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
        img.src = image;
      }, 1000 * imageAttempts); // Delay incremental
    } else {
      setImageError(true);
      setIsLoaded(true);
    }
  }, [image, imageAttempts]);

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
  }, [image]);

  return (
    <div 
      className="descubre-item"
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
      role="article"
      aria-label={`Propiedad: ${caption}`}
    >
      <div className="image-container">
        {!imageError ? (
          <img 
            src={image} 
            alt={caption}
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
      <p className="descubre-caption">{caption}</p>
    </div>
  );
};

/**
 * Carousel horizontal mejorado con soporte táctil avanzado
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.cards - Array de objetos con datos de las cards
 */
const EnhancedLandingPageCards = ({ cards }) => {
  const carouselRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());

  // Estados para gestos táctiles avanzados
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Configuración de parámetros
  const CARD_WIDTH = 300;
  const CARD_GAP = 20;
  const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;
  const MIN_SWIPE_DISTANCE = 50;
  const SCROLL_MOMENTUM = 0.95; // Factor de momentum para scroll suave

  /**
   * Verifica si es necesario mostrar los botones de navegación
   * y actualiza el estado de los botones
   */
  const checkScrollability = useCallback(() => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
      const needsScroll = scrollWidth > clientWidth;
      setShowButtons(needsScroll);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  /**
   * Maneja el evento de scroll con throttling optimizado para mejor rendimiento
   */
  const handleScroll = useCallback(() => {
    if (carouselRef.current && !isScrolling && !isDragging) {
      // RAF para mejor performance en el scroll
      requestAnimationFrame(() => {
        if (carouselRef.current) {
          const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
          setCanScrollLeft(scrollLeft > 5);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
      });
    }
  }, [isScrolling, isDragging]);

  /**
   * Detecta qué cards están visibles con intersection observer para mayor eficiencia
   */
  const updateVisibleCards = useCallback(() => {
    if (carouselRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const newVisibleCards = new Set(visibleCards);
          entries.forEach((entry) => {
            const index = parseInt(entry.target.dataset.cardIndex || '0');
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

      const cards = carouselRef.current.querySelectorAll('.descubre-item');
      cards.forEach((card) => observer.observe(card));

      return () => observer.disconnect();
    }
  }, [visibleCards]);

  /**
   * Navegación hacia la izquierda con animación más fluida
   */
  const scrollLeft = useCallback(() => {
    if (carouselRef.current && !isScrolling && canScrollLeft) {
      setIsScrolling(true);
      
      // Scroll más suave con easing personalizado
      const start = carouselRef.current.scrollLeft;
      const target = start - SCROLL_AMOUNT;
      const duration = 300;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavidad
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentPosition = start + (target - start) * easeOutCubic;
        
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = currentPosition;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  }, [isScrolling, canScrollLeft]);

  /**
   * Navegación hacia la derecha con animación más fluida
   */
  const scrollRight = useCallback(() => {
    if (carouselRef.current && !isScrolling && canScrollRight) {
      setIsScrolling(true);
      
      // Scroll más suave con easing personalizado
      const start = carouselRef.current.scrollLeft;
      const target = start + SCROLL_AMOUNT;
      const duration = 300;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavidad
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentPosition = start + (target - start) * easeOutCubic;
        
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = currentPosition;
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
        }
      };
      
      requestAnimationFrame(animateScroll);
    }
  }, [isScrolling, canScrollRight]);

  /**
   * Manejo de inicio de toque para gestos táctiles
   */
  const onTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setStartScrollLeft(carouselRef.current?.scrollLeft || 0);
    setIsDragging(false);
  }, []);

  /**
   * Manejo de movimiento táctil optimizado sin resistencia
   */
  const onTouchMove = useCallback((e) => {
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    if (touchStart && carouselRef.current && !isScrolling) {
      const diff = touchStart - currentTouch;
      const newScrollLeft = startScrollLeft + diff;
      
      // Scroll directo sin resistencia para mayor fluidez
      carouselRef.current.scrollLeft = Math.max(0, 
        Math.min(newScrollLeft, carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
      );
      
      setIsDragging(Math.abs(diff) > 10);
      
      // Prevenir el scroll vertical durante el horizontal
      if (Math.abs(diff) > 10) {
        e.preventDefault();
      }
    }
  }, [touchStart, startScrollLeft, isScrolling]);

  /**
   * Manejo de fin de toque con momentum y snap
   */
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd || !carouselRef.current) return;
    
    const distance = touchStart - touchEnd;
    const velocity = Math.abs(distance);
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    // Snap al card más cercano o aplica momentum
    if (velocity > MIN_SWIPE_DISTANCE) {
      if (isLeftSwipe && canScrollRight) {
        scrollRight();
      } else if (isRightSwipe && canScrollLeft) {
        scrollLeft();
      }
    } else {
      // Snap al card más cercano
      const currentScroll = carouselRef.current.scrollLeft;
      const snapPosition = Math.round(currentScroll / SCROLL_AMOUNT) * SCROLL_AMOUNT;
      
      carouselRef.current.scrollTo({
        left: snapPosition,
        behavior: 'smooth'
      });
    }

    // Reset estados
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    
    // Pequeño delay para evitar clicks accidentales
    setTimeout(() => setIsScrolling(false), 300);
  }, [touchStart, touchEnd, canScrollLeft, canScrollRight, scrollLeft, scrollRight]);

  /**
   * Manejo de scroll con rueda del mouse (horizontal)
   */
  const handleWheel = useCallback((e) => {
    if (carouselRef.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      const scrollAmount = e.deltaX * 2; // Amplifica el scroll horizontal
      carouselRef.current.scrollLeft += scrollAmount;
    }
  }, []);

  /**
   * Navegación por teclado para accesibilidad
   */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRight();
    }
  }, [scrollLeft, scrollRight]);

  // Effect para configurar event listeners optimizados
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Optimizado con RAF para mejor performance
    let rafId;
    const optimizedScrollHandler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        handleScroll();
        updateVisibleCards();
      });
    };

    // Event listeners optimizados
    carousel.addEventListener('scroll', optimizedScrollHandler, { 
      passive: true,
      capture: false 
    });
    window.addEventListener('resize', checkScrollability, { passive: true });

    // Inicialización
    checkScrollability();
    updateVisibleCards();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      carousel.removeEventListener('scroll', optimizedScrollHandler);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [handleScroll, checkScrollability, updateVisibleCards]);

  /**
   * Auto-scroll en intervalos (opcional, se puede activar)
   */
  useEffect(() => {
    // Descomenta para habilitar auto-scroll
    /*
    const autoScrollInterval = setInterval(() => {
      if (!isDragging && !isScrolling && canScrollRight) {
        scrollRight();
      } else if (!isDragging && !isScrolling && !canScrollRight && canScrollLeft) {
        // Reset al inicio cuando llega al final
        carouselRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(autoScrollInterval);
    */
  }, [isDragging, isScrolling, canScrollRight, canScrollLeft, scrollRight]);

  return (
    <div className="carousel-container">
      {/* Botón de navegación izquierdo */}
      {showButtons && (
        <button 
          className={`carousel-button prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft || isScrolling}
          aria-label="Anterior"
          onKeyDown={handleKeyDown}
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
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Galería de propiedades destacadas"
        tabIndex={0}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto'
        }}
      >
        {cards.map((card, index) => (
          <div
            key={`${card.caption}-${index}`}
            data-card-index={index}
            className="descubre-item-wrapper"
          >
            <Card 
              image={card.image} 
              caption={card.caption}
              index={index}
              isVisible={visibleCards.has(index)}
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
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <span aria-hidden="true">→</span>
        </button>
      )}

      {/* Indicadores de posición (opcional) */}
      {cards.length > 3 && (
        <div className="carousel-indicators" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: 'var(--spacing-md)',
          opacity: showButtons ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          {Array.from({ length: Math.ceil(cards.length / 3) }, (_, i) => (
            <button
              key={i}
              className="carousel-indicator"
              onClick={() => {
                const targetScroll = i * SCROLL_AMOUNT * 3;
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
                backgroundColor: i === Math.floor((carouselRef.current?.scrollLeft || 0) / (SCROLL_AMOUNT * 3)) 
                  ? 'var(--color-primary)' 
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

export default EnhancedLandingPageCards;