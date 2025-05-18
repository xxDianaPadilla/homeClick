import React, {useRef, useEffect, useState} from "react";
import '../styles/EstiloLandingPage.css';
import useCarousel from "./Properties/Hooks/useCarousel";

const Card = ({image, caption}) => {
    return(
        <div className="descubre-item">
            <img src={image} alt={caption} />
            <p className="descubre-caption">{caption}</p>
        </div>
    );
};

const LandingPageCards = ({cards}) => {

    const {carouselRef, handlers, navigation} = useCarousel();

    return(
        <div className="carousel-container">
            <button className="carousel-button prev" onClick={navigation.scrollLeft}>&lt;</button>
            <div className="descubre-grid horizontal-carousel" ref={carouselRef} onTouchStart={handlers.handleTouchStart} onTouchMove={handlers.handleTouchMove} onTouchEnd={handlers.handleTouchEnd}>
                {cards.map((card, index) => (
                    <Card key={index} image={card.image} caption={card.caption}/>
                ))}
            </div>
            <button className="carousel-button next" onClick={navigation.scrollRight}>&gt;</button>
        </div>
    );
};

export default LandingPageCards;