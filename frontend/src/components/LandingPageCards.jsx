import React, { useRef, useState, useEffect } from "react";
import '../styles/EstiloLandingPage.css';

const Card = ({ image, caption, index }) => {
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
        transition: 'opacity 0.3s ease'
      }}
    >
      <div className="image-container">
        {!imageError ? (
          <img 
            src={image} 
            alt={caption}
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
      <p className="descubre-caption">{caption}</p>
    </div>
  );
};

const LandingPageCards = ({ cards }) => {
  const carouselRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // Verificar si se necesitan botones de scroll
  useEffect(() => {
    const checkScrollability = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        const needsScroll = scrollWidth > clientWidth;
        setShowButtons(needsScroll);
        setCanScrollLeft(scrollLeft > 5); // Pequeño margen para evitar parpadeo
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    const handleScroll = () => {
      if (carouselRef.current && !isScrolling) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [carouselRef, isScrolling]);

  // Navegación mejorada con scroll suave
  const scrollLeft = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const cardWidth = 300; // Ancho fijo de las cards
      const gap = 20; // Gap entre cards
      const scrollAmount = cardWidth + gap;
      
      carouselRef.current.scrollBy({ 
        left: -scrollAmount, 
        behavior: 'smooth' 
      });

      // Reset scrolling flag después de la animación
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current && !isScrolling) {
      setIsScrolling(true);
      const cardWidth = 300; // Ancho fijo de las cards
      const gap = 20; // Gap entre cards
      const scrollAmount = cardWidth + gap;
      
      carouselRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });

      // Reset scrolling flag después de la animación
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  // Touch gestures para móviles
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canScrollRight) {
      scrollRight();
    }
    if (isRightSwipe && canScrollLeft) {
      scrollLeft();
    }
  };

  // Scroll con rueda del mouse
  const handleWheel = (e) => {
    if (carouselRef.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      carouselRef.current.scrollLeft += e.deltaX;
    }
  };

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
      >
        {cards.map((card, index) => (
          <Card 
            key={`${card.caption}-${index}`} 
            image={card.image} 
            caption={card.caption}
            index={index}
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