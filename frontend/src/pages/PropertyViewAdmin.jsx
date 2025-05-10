import React, { useEffect, useState } from "react";
import NavBarAdminSearch from "../components/NavBarAdminSearch";
import "../styles/PropertyViewAdmin.css";
import house1 from "../assets/image27.png";
import house6 from "../assets/image6.png";
import house7 from "../assets/image7.png";
import house8 from "../assets/image5.png";

const PropertyViewAdmin = () => {

    const [mainImage, setMainImage] = useState(house8);

    const [detailsExpanded, setDetailsExpanded] = useState(false);

    const [dimensionsExpanded, setDimensionsExpanded] = useState(false);

    const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyAdmin', propertyId: '1' };

    useEffect(() => {
        console.log(`Cargando propiedad ID: ${propertyId} desde la categoría: ${fromCategory}`);

        if (propertyId === '2' || propertyId === '5' || propertyId === '8') {
            setMainImage(house6);
        } else if (propertyId === '3' || propertyId === '6' || propertyId === '9') {
            setMainImage(house7);
        }
    }, [propertyId, fromCategory]);

    const thumbnails = [house1, house6, house7, house1];

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

    return (
        <>
            <NavBarAdminSearch />

            <div className="property-container3">
                {/* Sección superior que muestra la imagen principal y la información básica de la propiedad. */}
                <div className="property-header3">
                    {/* Columna para las imágenes en miniatura. */}
                    <div className="thumbnail-column">
                        {thumbnails.map((thumb, index) => (
                            <div
                                key={index}
                                className="thumbnail-wrapper"
                                onClick={() => setMainImage(thumb)}
                            >
                                <img
                                    src={thumb}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${mainImage === thumb ? 'active' : ''}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Contenido principal con la imagen principal y la información de la propiedad. */}
                    <div className="main-content">
                        {/* Contenedor para la imagen principal y la fecha de publicación. */}
                        <div className="main-image-container">
                            <img src={mainImage} alt="Casa en Colonia Escalón" className="main-image" />
                            <div className="image-date">Fecha Publicación: 15 de Febrero de 2024</div>
                        </div>

                        {/* Sección con el título, ubicación, precio y descripción de la propiedad, así como los botones de acción. */}
                        <div className="property-info3">
                            {/* Sección para el título de la propiedad y el botón de guardar. */}
                            <div className="property-title-section3">
                                <h1>{propertyData.title}</h1>
                            </div>

                            {/* Ubicación de la propiedad. */}
                            <div className="property-location3">{propertyData.location}</div>
                            {/* Precio de la propiedad. */}
                            <div className="property-price3">{propertyData.price}</div>

                            {/* Descripción de la propiedad. */}
                            <p className="property-description3">{propertyData.description}</p>

                            {/* Botones de "Contactar al dueño" y "Agregar al carrito". */}
                            <div className="action-buttons3">
                                <button className="btn-edit">Editar publicación</button>
                                <button className="btn-delete" >Eliminar publicación</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de detalles de la propiedad (habitaciones, baños, etc.). */}
                <div className="property-details-section3">
                    {/* Encabezado de la sección de detalles con botón de expansión. */}
                    <div className="details-header3" onClick={toggleDetails}>
                        <h2>Detalles</h2>
                        <button className="expand-btn">{detailsExpanded ? '-' : '+'}</button>
                    </div>

                    {/* Contenido de la sección de detalles, mostrado condicionalmente. */}
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

                {/* Sección de dimensiones de la propiedad (tamaño del lote, altura, etc.). */}
                <div className="property-dimensions-section3">
                    {/* Encabezado de la sección de dimensiones con botón de expansión. */}
                    <div className="dimensions-header3" onClick={toggleDimensions}>
                        <h2>Dimensiones</h2>
                        <button className="expand-btn">{dimensionsExpanded ? '-' : '+'}</button>
                    </div>

                    {/* Contenido de la sección de dimensiones, mostrado condicionalmente. */}
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
            </div>
        </>
    );
};

export default PropertyViewAdmin;