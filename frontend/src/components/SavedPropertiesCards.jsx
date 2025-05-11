import React from "react";
import "../styles/SavedProperties.css";
import pictureIcon from "../assets/image35.png"; 
import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png"; 
import personIcon from "../assets/image37.png"; 
import toiletIcon from "../assets/image40.png"; 
import trashcanIcon from "../assets/image36.png";

const SavedPropertiesCard = ({house, onClick}) => {
    return(
        <div className="property-card" onClick={onClick}>
            <div className="property-image-container">
                <img src={house.image} alt={house.title} className="property-image"/>
                <div className="image-counter">
                    <img src={pictureIcon} alt="Pictures" className="meta-icon"/>
                    <span>{house.pictures}</span>
                </div>
            </div>

            <div className="property-details">
                <div className="property-header">
                    <span className="property-price">{house.price}</span>
                    <h2 className="property-title">{house.title}</h2>
                </div>

                <p className="property-description">{house.description}</p>

                <div className="publish-date">
                    Fecha Publicación: {house.publishDate}
                </div>

                <div className="property-meta">
                    <div className="meta-item">
                        <img src={areaIcon} alt="Area" className="meta-icon"/>
                        <span className="meta-text">{house.area}</span>
                    </div>

                    <div className="meta-item">
                        <img src={bedIcon} alt="Bedrooms" className="meta-icon"/>
                        <span className="meta-text">{house.bedrooms}</span>
                    </div>

                    <div className="meta-item">
                        <img src={personIcon} alt="Contact" className="meta-icon"/>
                        <button className="contact-button">Contactar ahora</button>
                    </div>

                    <div className="meta-item">
                        <img src={toiletIcon} alt="Bathrooms" className="meta-icon"/>
                        <span className="meta-text">{house.bathrooms}</span>
                    </div>

                    <div className="meta-item">
                        <img src={trashcanIcon} alt="Delete" className="meta-icon"/>
                        <button className="delete-button">Eliminar guardado</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedPropertiesCard;