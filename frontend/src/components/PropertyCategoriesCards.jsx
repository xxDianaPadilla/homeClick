import React from "react";
import "../styles/PropertyCategories.css";

const PropertyCategoriesCards = ({image, description, onClick}) =>{
    return(
        <div className="property-card2" onClick={onClick}>
            <div className="image-container">
                <img src={image} alt={description} />
            </div>
            <div className="property-footer">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default PropertyCategoriesCards;