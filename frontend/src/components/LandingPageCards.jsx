import React, {useRef, useEffect, useState} from "react";
import '../styles/EstiloLandingPage.css';

const Card = ({image, caption}) => {
    return(
        <div className="descubre-item">
            <img src={image} alt={caption} />
            <p className="descubre-caption">{caption}</p>
        </div>
    );
};

const LandingPageCards = ({cards}) => {

    const carouselRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [scrolling, setScrolling] = useState(false);

    const handleWheel = (e) =>{
        if(carouselRef.current){
            carouselRef.current.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setScrolling(true);
    };

    const handleTouchMove = (e) =>{
        if(!scrolling) return;

        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if(carouselRef.current){
            carouselRef.current.scrollTop += diff * 0.5;
            setStartX(currentX);
        }
    };

    const handleTouchEnd = () => {
        setScrolling(false);
    };

    const scrollLeft = () => {
        if(carouselRef.current){
            carouselRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if(carouselRef.current){
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

    return(
        <div className="carousel-container">
            <button className="carousel-button prev" onClick={scrollLeft}>&lt;</button>
            <div className="descubre-grid horizontal-carousel" ref={carouselRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                {cards.map((card, index) => (
                    <Card key={index} image={card.image} caption={card.caption}/>
                ))}
            </div>
            <button className="carousel-button next" onClick={scrollRight}>&gt;</button>
        </div>
    );
};

export default LandingPageCards;