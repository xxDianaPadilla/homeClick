import React, { useRef, useEffect, useState } from "react";

const useCarousel = () => {
    const carouselRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [scrolling, setScrolling] = useState(false);

    const handleWheel = (e) => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setScrolling(true);
    };

    const handleTouchMove = (e) => {
        if (!scrolling) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (carouselRef.current) {
            carouselRef.current.scrollTop += diff * 0.5;
            setStartX(currentX);
        }
    };

    const handleTouchEnd = () => {
        setScrolling(false);
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if(carousel){
            carousel.addEventListener('wheel', handleWheel, {passive: false});

            return () => {
                carousel.removeEventListener('wheel', handleWheel);
            };
        }
    }, []);

    return {
        carouselRef,
        handlers: {
            handleTouchStart,
            handleTouchMove,
            handleTouchEnd
        },
        navigation: {
            scrollLeft,
            scrollRight
        }
    };
};

export default useCarousel;