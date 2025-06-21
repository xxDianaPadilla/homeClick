import React, { useRef, useState, useEffect } from "react";
import '../styles/EstiloLandingPage.css';
import useCarousel from "./Properties/Hooks/useCarousel";

const Card = ({ image, caption, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
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
            loading="lazy" // Lazy loading para mejor performance
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
  const { carouselRef, handlers, navigation } = useCarousel();
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check if carousel needs scroll buttons
  useEffect(() => {
    const checkScrollability = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        const needsScroll = scrollWidth > clientWidth;
        setShowButtons(needsScroll);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    // Check scroll position
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [carouselRef]);

  // Enhanced navigation with smooth scrolling
  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
      const scrollAmount = cardWidth + 20; // card width + gap
      carouselRef.current.scrollBy({ 
        left: -scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 300;
      const scrollAmount = cardWidth + 20; // card width + gap
      carouselRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="carousel-container">
      {showButtons && (
        <button 
          className={`carousel-button prev ${!canScrollLeft ? 'disabled' : ''}`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          &lt;
        </button>
      )}
      
      <div 
        className="descubre-grid horizontal-carousel" 
        ref={carouselRef} 
        onTouchStart={handlers.handleTouchStart} 
        onTouchMove={handlers.handleTouchMove} 
        onTouchEnd={handlers.handleTouchEnd}
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
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default LandingPageCards;