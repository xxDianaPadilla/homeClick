import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import house1 from "../assets/image5.png";
import house2 from "../assets/image6.png";
import house3 from "../assets/image7.png";
import pictureIcon from "../assets/image35.png";
import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png";
import personIcon from "../assets/image37.png";
import toiletIcon from "../assets/image40.png";
import trashcanIcon from "../assets/image36.png";
import "../styles/SavedProperties.css";

const SavedProperties = () => {
    const savedHouses = [
        {
            id: 1,
            image: house1,
            price: "$50,000",
            title: "Casa en colonia Escalón",
            description: "Descubre el hogar de tus sueños en esta impresionante casa moderna, diseñada para brindar confort y elegancia. Con amplios espacios iluminados, acabados de alta calidad y un hermoso jardín, esta propiedad es ideal para quienes buscan tranquilidad y exclusividad. Ubicada en una zona privilegiada, cerca de centros comerciales, colegios y áreas recreativas, ofrece el equilibrio perfecto entre comodidad y accesibilidad. ¡No pierdas la oportunidad de hacerla tuya!",
            publishDate: "26 de febrero de 2024",
            area: "150 metros cuadrados",
            bedrooms: 3,
            bathrooms: 4,
            pictures: 5
        },
        {
            id: 2,
            image: house2,
            price: "$50,000",
            title: "Casa en colonia Escalón",
            description: "Descubre el hogar de tus sueños en esta impresionante casa moderna, diseñada para brindar confort y elegancia. Con amplios espacios iluminados, acabados de alta calidad y un hermoso jardín, esta propiedad es ideal para quienes buscan tranquilidad y exclusividad. Ubicada en una zona privilegiada, cerca de centros comerciales, colegios y áreas recreativas, ofrece el equilibrio perfecto entre comodidad y accesibilidad. ¡No pierdas la oportunidad de hacerla tuya!",
            publishDate: "26 de febrero de 2024",
            area: "150 metros cuadrados",
            bedrooms: 3,
            bathrooms: 4,
            pictures: 4
        },
        {
            id: 3,
            image: house3,
            price: "$50,000",
            title: "Casa en colonia Escalón",
            description: "Descubre el hogar de tus sueños en esta impresionante casa moderna, diseñada para brindar confort y elegancia. Con amplios espacios iluminados, acabados de alta calidad y un hermoso jardín, esta propiedad es ideal para quienes buscan tranquilidad y exclusividad. Ubicada en una zona privilegiada, cerca de centros comerciales, colegios y áreas recreativas, ofrece el equilibrio perfecto entre comodidad y accesibilidad. ¡No pierdas la oportunidad de hacerla tuya!",
            publishDate: "26 de febrero de 2024",
            area: "150 metros cuadrados",
            bedrooms: 3,
            bathrooms: 4,
            pictures: 4
        }
    ];
    return (
        <>
            <Navbar />
            <div className="saved-properties-container">
                <h1 className="saved-properties-title">Lista de tus casas guardadas</h1>

                <div className="property-list">
                    {savedHouses.map((house) => (
                        <div key={house.id} className="property-card">
                            <div className="property-image-container">
                                <img src={house.image} alt={house.title} className="property-image" />
                                <div className="image-counter">
                                    <img src={pictureIcon} alt="Pictures" className="meta-icon" />
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
                                    Fecha Publicaciónn: {house.publishDate}
                                </div>

                                <div className="property-meta">
                                    <div className="meta-item">
                                        <img src={areaIcon} alt="Area" className="meta-icon" />
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
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SavedProperties;