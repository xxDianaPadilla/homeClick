import { useRef, useState, useEffect, useCallback } from "react";

const useEnhancedCarousel = (itemWidth = 300, gap = 20) => {
    const carouselRef = useRef(null);
    const [showButtons, setShowButtons] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Estados para gestos táctiles
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [startScrollLeft, setStartScrollLeft] = useState(0);

    const SCROLL_AMOUNT = itemWidth + gap;
    const MIN_SWIPE_DISTANCE = 50;

    // Verificar si se necesitan botones de navegación
    const checkScrollability = useCallback(() => {
        if (carouselRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
            const needsScroll = scrollWidth > clientWidth;
            setShowButtons(needsScroll);
            setCanScrollLeft(scrollLeft > 5);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    }, []);

    // Scroll suave hacia la izquierda
    const scrollLeft = useCallback(() => {
        if (carouselRef.current && !isScrolling && canScrollLeft) {
            setIsScrolling(true);
            
            const start = carouselRef.current.scrollLeft;
            const target = Math.max(0, start - SCROLL_AMOUNT);
            const duration = 300;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Función de easing suave
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
    }, [isScrolling, canScrollLeft, SCROLL_AMOUNT]);

    // Scroll suave hacia la derecha
    const scrollRight = useCallback(() => {
        if (carouselRef.current && !isScrolling && canScrollRight) {
            setIsScrolling(true);
            
            const start = carouselRef.current.scrollLeft;
            const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
            const target = Math.min(maxScroll, start + SCROLL_AMOUNT);
            const duration = 300;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Función de easing suave
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
    }, [isScrolling, canScrollRight, SCROLL_AMOUNT]);

    // Manejo de eventos táctiles
    const onTouchStart = useCallback((e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setStartScrollLeft(carouselRef.current?.scrollLeft || 0);
        setIsDragging(false);
    }, []);

    const onTouchMove = useCallback((e) => {
        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);
        
        if (touchStart && carouselRef.current && !isScrolling) {
            const diff = touchStart - currentTouch;
            const newScrollLeft = startScrollLeft + diff;
            
            // Scroll directo sin resistencia
            const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
            carouselRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
            
            setIsDragging(Math.abs(diff) > 10);
            
            // Prevenir scroll vertical durante horizontal
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }
    }, [touchStart, startScrollLeft, isScrolling]);

    const onTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd || !carouselRef.current) return;
        
        const distance = touchStart - touchEnd;
        const velocity = Math.abs(distance);
        const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
        const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

        // Aplicar momentum si el swipe es suficientemente fuerte
        if (velocity > MIN_SWIPE_DISTANCE) {
            if (isLeftSwipe && canScrollRight) {
                scrollRight();
            } else if (isRightSwipe && canScrollLeft) {
                scrollLeft();
            }
        } else {
            // Snap al elemento más cercano
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
        
        setTimeout(() => setIsScrolling(false), 300);
    }, [touchStart, touchEnd, canScrollLeft, canScrollRight, scrollLeft, scrollRight, MIN_SWIPE_DISTANCE, SCROLL_AMOUNT]);

    // Manejo de scroll con rueda del mouse
    const handleWheel = useCallback((e) => {
        if (carouselRef.current && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            const scrollAmount = e.deltaX * 2;
            carouselRef.current.scrollLeft += scrollAmount;
        }
    }, []);

    // Manejo de scroll normal
    const handleScroll = useCallback(() => {
        if (carouselRef.current && !isScrolling && !isDragging) {
            requestAnimationFrame(() => {
                if (carouselRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
                    setCanScrollLeft(scrollLeft > 5);
                    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
                }
            });
        }
    }, [isScrolling, isDragging]);

    // Configurar event listeners
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let rafId;
        const optimizedScrollHandler = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(handleScroll);
        };

        carousel.addEventListener('scroll', optimizedScrollHandler, { passive: true });
        window.addEventListener('resize', checkScrollability, { passive: true });

        // Inicialización
        checkScrollability();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            carousel.removeEventListener('scroll', optimizedScrollHandler);
            window.removeEventListener('resize', checkScrollability);
        };
    }, [handleScroll, checkScrollability]);

    return {
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
    };
};

export default useEnhancedCarousel;