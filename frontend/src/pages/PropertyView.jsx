import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/PropertyView.css";
import house1 from "../assets/image27.png";
import house6 from "../assets/image6.png";
import house7 from "../assets/image7.png";
import house8 from "../assets/image5.png";
import saveIcon from '../assets/image23.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ContactForm from "../components/ContactForm";

const PropertyView = () => {
    const [mainImage, setMainImage] = useState(house1);
    const [detailsExpanded, setDetailsExpanded] = useState(false);
    const [dimensionsExpanded, setDimensionsExpanded] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    
    const thumbnails = [house1, house6, house7, house8];
    
    const propertyData = {
        title: "Casa en Colonia Escalón",
        price: "$150,000",
        location: "San Salvador, El Salvador",
        description: "Hermosa y lugar de lujo donde se une espectacularmente zona residencial. Disfruta una viviesta privada y accesible, con amplios espacios iluminados, comodidad y seguridad. Ideal para familias que buscan calidad de vida, cerca de centros comerciales, colegios y zonas recreativas. Acaba y detalles modernos, ofrecen un equilibrio perfecto entre estilo, funcionalidad y confort.",
        details: [
            "Habitaciones: 3",
            "Baños: 4",
            "Parqueo: Sí",
            "Patio: Sí",
            "Ubicación: Urbanización Alpes de la Escalón, San Salvador centro",
            "Número: 42",
            "Tipo de piso: Cemento pulido",
            "Año de construcción: 2021"
        ],
        dimensions: [
            "Tamaño del lote: 150 metros cuadrados",
            "Altura: 3.2 metros"
        ]
    };
    
    const similarProperties = [
        { id: 1, image: house6, title: "Casa en la zona Rosa" },
        { id: 2, image: house7, title: "Casa en santa tecla" },
        { id: 3, image: house1, title: "Casa en Colonia Escalón" }
    ];
    
    const toggleDetails = () => {
        setDetailsExpanded(!detailsExpanded);
    };
    
    const toggleDimensions = () => {
        setDimensionsExpanded(!dimensionsExpanded);
    };
    
    const center = [13.6929, -89.2182]; 

    const toggleContactForm = () => {
        setShowContactForm(!showContactForm);
    };
    
    return (
        <>
            <Navbar />
            
            <div className="property-container">
                <div className="property-header">
                    <div className="thumbnail-column">
                        {thumbnails.map((thumb, index) => (
                            <div 
                                key={index} 
                                className="thumbnail-wrapper" 
                                onClick={() => setMainImage(thumb)}
                            >
                                <img 
                                    src={thumb} 
                                    alt={`Thumbnail ${index+1}`} 
                                    className={`thumbnail ${mainImage === thumb ? 'active' : ''}`}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div className="main-content">
                        <div className="main-image-container">
                            <img src={mainImage} alt="Casa en Colonia Escalón" className="main-image" />
                            <div className="image-date">Fecha Publicación: 15 de Febrero de 2024</div>
                        </div>
                        
                        <div className="property-info">
                            <div className="property-title-section">
                                <h1>{propertyData.title}</h1>
                                <div className="bookmark">
                                    <img src={saveIcon} alt="Guardar" />
                                </div>
                            </div>
                            
                            <div className="property-location">{propertyData.location}</div>
                            <div className="property-price">{propertyData.price}</div>
                            
                            <p className="property-description">{propertyData.description}</p>
                            
                            <div className="action-buttons">
                                <button className="btn-contact" onClick={toggleContactForm}>Contactar al dueño</button>
                                <button className="btn-save">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="property-details-section">
                    <div className="details-header" onClick={toggleDetails}>
                        <h2>Detalles</h2>
                        <button className="expand-btn">{detailsExpanded ? '-' : '+'}</button>
                    </div>
                    
                    {detailsExpanded && (
                        <div className="details-content">
                            <ul>
                                {propertyData.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                
                <div className="property-dimensions-section">
                    <div className="dimensions-header" onClick={toggleDimensions}>
                        <h2>Dimensiones</h2>
                        <button className="expand-btn">{dimensionsExpanded ? '-' : '+'}</button>
                    </div>
                    
                    {dimensionsExpanded && (
                        <div className="dimensions-content">
                            <ul>
                                {propertyData.dimensions.map((dimension, index) => (
                                    <li key={index}>{dimension}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                
                <div className="property-location-section">
                    <h2>Ubicación satelital</h2>
                    <div className="map-container">
                        <MapContainer 
                            center={center} 
                            zoom={12} 
                            style={{ height: "400px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={center}>
                                <Popup>
                                    Casa en Colonia Escalón <br /> San Salvador, El Salvador
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
                
                <div className="similar-properties-section">
                    <h2>Casas similares</h2>
                    <div className="similar-properties-gallery">
                        {similarProperties.map(property => (
                            <div key={property.id} className="similar-property" onClick={() => setMainImage(property.image)}>
                                <img src={property.image} alt={property.title} />
                                <p>{property.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showContactForm && <ContactForm onClose={toggleContactForm}/>}
            
            <Footer />
        </>
    );
};

export default PropertyView;