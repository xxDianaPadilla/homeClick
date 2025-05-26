import React, {useState} from "react";
import '../styles/HouseCardsAdmin.css';
import infoIcon from '../assets/infoIcon.png';

const HouseCardsAdmin = ({image, location, onClick}) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return(
        <div className="house-card" onClick={onClick}>
            <div className="house-image-container">
                {!imageError ? (
                    <img 
                        src={image} 
                        alt={location} 
                        className="house-image"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="house-image-placeholder">
                        <p>Sin imagen</p>
                    </div>
                )}
                <div className="info-icon-container">
                    <img src={infoIcon} alt="info" className="info-icon"/>
                </div>
            </div>
            <div className="house-location">
                <p>{location}</p>
            </div>
        </div>
    );
};

export default HouseCardsAdmin;