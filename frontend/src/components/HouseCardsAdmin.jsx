import React from "react";
import '../styles/HouseCardsAdmin.css';
import infoIcon from '../assets/infoIcon.png';

const HouseCardsAdmin = ({image, location}) =>{
    return(
        <div className="house-card">
            <div className="house-image-container">
                <img src={image} alt="location" className="house-image"/>
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