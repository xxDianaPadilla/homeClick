import React from "react";
import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png";
import personIcon from "../assets/image37.png";
import toiletIcon from "../assets/image40.png";
import trashcanIcon from "../assets/image36.png";
import "../styles/ShoppingCart.css";

const ShoppingCartCards = ({ image, title, price, description, area, bedrooms, bathrooms, showContactAgent, onRemove }) => {
    return (
        <div className="cart-item">
            <div className="item-image">
                <img src={image} alt={title} />
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
                            <>
                                <img src={personIcon} alt="Contactar agente" />
                                <span>1</span>
                            </>
                        ) : (
                            <>
                                <img src={trashcanIcon} alt="Eliminar" onClick={onRemove} />
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