import React from "react";
import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png";
import personIcon from "../assets/image37.png";
import toiletIcon from "../assets/image40.png";
import trashcanIcon from "../assets/image36.png";
import "../styles/ShoppingCart.css";

const ShoppingCartCards = ({ 
    image, 
    title, 
    price, 
    description, 
    area, 
    bedrooms, 
    bathrooms, 
    showContactAgent, 
    onRemove 
}) => {
    // Función para manejar el click del botón de eliminar
    const handleRemoveClick = (e) => {
        e.stopPropagation(); // Evitar que se propague el evento
        if (onRemove) {
            onRemove(); // Llamar la función de eliminación pasada como prop
        }
    };

    return (
        <div className="cart-item">
            <div className="item-image">
                <img src={image} alt={title} />
                {/* Contador de imágenes (opcional, puedes mantenerlo o quitarlo) */}
                <div className="image-counter2">
                    <img src={areaIcon} alt="Pictures" className="meta-icon"/>
                    <span>1</span>
                </div>
            </div>
            <div className="item-details">
                <div className="item-header">
                    <h3>{title}</h3>
                    <span className="item-price">${price}</span>
                </div>
                <p className="item-description">{description}</p>
                <div className="item-features">
                    <div className="feature">
                        <img src={areaIcon} alt="Área" />
                        <span>{area}</span>
                    </div>
                    <div className="feature">
                        <img src={bedIcon} alt="Dormitorios" />
                        <span>{bedrooms}</span>
                    </div>
                    <div className="feature">
                        <img src={toiletIcon} alt="Baños" />
                        <span>{bathrooms}</span>
                    </div>
                    <div className="feature">
                        {showContactAgent ? (
                            // Mostrar icono de contacto si showContactAgent es true
                            <>
                                <img src={personIcon} alt="Contactar agente" />
                                <span>1</span>
                            </>
                        ) : (
                            // Mostrar icono de eliminar si showContactAgent es false
                            <>
                                <img 
                                    src={trashcanIcon} 
                                    alt="Eliminar" 
                                    onClick={handleRemoveClick}
                                    style={{ 
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                                />
                                <span>1</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartCards;