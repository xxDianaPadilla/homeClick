import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyView = () => {
    const [mainImage, setMainImage] = useState(house1);
    const [detailsExpanded, setDetailsExpanded] = useState(false);
    const [dimensionsExpanded, setDimensionsExpanded] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const {fromCategory, propertyId} = location.state || {fromCategory: '/propertyCategories', propertyId: '1'};

    useEffect(() =>{
        console.log(`Cargando propiedad ID: ${propertyId} desde la categoría: ${fromCategory}`);

        if (propertyId === '2' || propertyId === '5' || propertyId === '8') {
            setMainImage(house6);
        } else if (propertyId === '3' || propertyId === '6' || propertyId === '9') {
            setMainImage(house7);
        }
    }, [propertyId, fromCategory]);
    
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

    const handleSimilarPropertyClick = (propertyId) =>{
        navigate('/propertyView', {
            state: {
                fromCategory,
                propertyId
            },
            replace: true
        });
    };
    
    return (
        <>
            <Navbar />
            
            <div className="property-container3">
                <div className="property-header3">
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
                        
                        <div className="property-info3">
                            <div className="property-title-section3">
                                <h1>{propertyData.title}</h1>
                                <div className="bookmark3">
                                    <img src={saveIcon} alt="Guardar" />
                                </div>
                            </div>
                            
                            <div className="property-location3">{propertyData.location}</div>
                            <div className="property-price3">{propertyData.price}</div>
                            
                            <p className="property-description3">{propertyData.description}</p>
                            
                            <div className="action-buttons3">
                                <button className="btn-contact3" onClick={toggleContactForm}>Contactar al dueño</button>
                                <button className="btn-save3">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="property-details-section3">
                    <div className="details-header3" onClick={toggleDetails}>
                        <h2>Detalles</h2>
                        <button className="expand-btn">{detailsExpanded ? '-' : '+'}</button>
                    </div>
                    
                    {detailsExpanded && (
                        <div className="details-content3">
                            <ul>
                                {propertyData.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                
                <div className="property-dimensions-section3">
                    <div className="dimensions-header3" onClick={toggleDimensions}>
                        <h2>Dimensiones</h2>
                        <button className="expand-btn">{dimensionsExpanded ? '-' : '+'}</button>
                    </div>
                    
                    {dimensionsExpanded && (
                        <div className="dimensions-content3">
                            <ul>
                                {propertyData.dimensions.map((dimension, index) => (
                                    <li key={index}>{dimension}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                
                <div className="property-location-section3">
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

function getCategoryName(categoryPath){
    const categoryNames = {
        '/propertyCategories': 'Casas de Campo',
    };

    return categoryNames[categoryPath] || 'Categoría';
}

export default PropertyView;