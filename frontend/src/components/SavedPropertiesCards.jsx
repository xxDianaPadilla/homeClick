import React, { useState } from "react";
import "../styles/SavedProperties.css";
import pictureIcon from "../assets/image35.png"; 
import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png"; 
import personIcon from "../assets/image37.png"; 
import toiletIcon from "../assets/image40.png"; 
import trashcanIcon from "../assets/image36.png";

const SavedPropertiesCard = ({ house, onClick, onRemove }) => {
    const [imageError, setImageError] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleRemoveClick = async (event) => {
        event.stopPropagation(); // Evitar que se dispare el onClick del card
        
        if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad de tus guardados?')) {
            setIsRemoving(true);
            
            // Pequeña animación antes de remover
            setTimeout(() => {
                onRemove && onRemove(event);
            }, 300);
        }
    };

    const handleContactClick = (event) => {
        event.stopPropagation(); // Evitar que se dispare el onClick del card
        // Aquí podrías implementar lógica de contacto específica
        alert('Funcionalidad de contacto - Por implementar');
    };

    return (
        <div className={`property-card ${isRemoving ? 'removing' : ''}`} onClick={onClick}>
            <div className="property-image-container">
                {!imageError ? (
                    <img 
                        src={house.image} 
                        alt={house.title}
                        className="property-image"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="property-image-placeholder">
                        <span>Sin imagen</span>
                    </div>
                )}
                
                <div className="image-counter">
                    <img src={pictureIcon} alt="Pictures" className="meta-icon"/>
                    <span>{house.pictures || 1}</span>
                </div>
            </div>

            <div className="property-details">
                <div className="property-header">
                    <span className="property-price">{house.price}</span>
                    <h2 className="property-title">{house.title}</h2>
                </div>

                <p className="property-description">{house.description}</p>

                <div className="publish-date">
                    Fecha Guardado: {house.publishDate}
                </div>

                {house.location && (
                    <div className="property-location-info">
                        📍 {house.location}
                    </div>
                )}

                <div className="property-meta">
                    <div className="meta-item">
                        <img src={areaIcon} alt="Area" className="meta-icon"/>
                        <span className="meta-text">{house.area}</span>
                    </div>

                    <div className="meta-item">
                        <img src={bedIcon} alt="Bedrooms" className="meta-icon"/>
                        <span className="meta-text">{house.bedrooms} hab.</span>
                    </div>

                    <div className="meta-item">
                        <img src={toiletIcon} alt="Bathrooms" className="meta-icon"/>
                        <span className="meta-text">{house.bathrooms} baños</span>
                    </div>

                    <div className="meta-item">
                        <img src={personIcon} alt="Contact" className="meta-icon"/>
                        <button 
                            className="contact-button"
                            onClick={handleContactClick}
                            title="Contactar vendedor"
                        >
                            Contactar ahora
                        </button>
                    </div>

                    <div className="meta-item">
                        <img src={trashcanIcon} alt="Delete" className="meta-icon"/>
                        <button 
                            className="delete-button"
                            onClick={handleRemoveClick}
                            disabled={isRemoving}
                            title="Eliminar de guardados"
                        >
                            {isRemoving ? 'Eliminando...' : 'Eliminar guardado'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedPropertiesCard;