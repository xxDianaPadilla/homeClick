import React, { useEffect, useState } from "react";
import NavBarAdminSearch from "../components/NavBarAdminSearch";
import "../styles/PropertyViewAdmin.css";
import house1 from "../assets/image27.png";
import house6 from "../assets/image6.png";
import house7 from "../assets/image7.png";
import EditPropertyCard from "../components/EditPropertyCard";
import { usePropertyData } from '../components/Properties/Hooks/usePropertyData';
import { useExpandableSections } from '../components/Properties/Hooks/useExpandableSections';
import useEditProperty from "../components/Properties/Hooks/useEditProperty";

// Definición del componente principal PropertyViewAdmin
const PropertyViewAdmin = () => {

    const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyAdmin', propertyId: '1' };

    const { mainImage, setMainImage, thumbnails, propertyData } = usePropertyData(propertyId);
    const { detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions } = useExpandableSections();
    const {isEditModalOpen, openEditModal, closeEditModal} = useEditProperty();

    // Array de propiedades similares para recomendaciones
    const similarProperties = [
        { id: 1, image: house6, title: "Casa en la zona Rosa" },
        { id: 2, image: house7, title: "Casa en santa tecla" },
        { id: 3, image: house1, title: "Casa en Colonia Escalón" }
    ];

    const center = [13.6929, -89.2182];

    // Estructura JSX del componente
    return (
        <>
            {/* Barra de navegación para administradores con función de búsqueda */}
            <NavBarAdminSearch />

            {/* Contenedor principal de la vista de propiedad */}
            <div className="property-container3">
                {/* Sección superior que muestra la imagen principal y la información básica */}
                <div className="property-header3">
                    {/* Columna lateral con miniaturas de imágenes */}
                    <div className="thumbnail-column">
                        {/* Mapeo del array de miniaturas para crear elementos clickeables */}
                        {thumbnails.map((thumb, index) => (
                            <div
                                key={index}
                                className="thumbnail-wrapper"
                                onClick={() => setMainImage(thumb)} // Cambia la imagen principal al hacer clic
                            >
                                <img
                                    src={thumb}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`thumbnail ${mainImage === thumb ? 'active' : ''}`} // Añade clase 'active' si es la miniatura activa
                                />
                            </div>
                        ))}
                    </div>

                    {/* Contenido principal con imagen e información */}
                    <div className="main-content">
                        {/* Contenedor de la imagen principal con fecha de publicación */}
                        <div className="main-image-container">
                            <img src={mainImage} alt="Casa en Colonia Escalón" className="main-image" />
                            <div className="image-date">Fecha Publicación: 15 de Febrero de 2024</div>
                        </div>

                        {/* Sección con información detallada de la propiedad */}
                        <div className="property-info3">
                            {/* Título de la propiedad */}
                            <div className="property-title-section3">
                                <h1>{propertyData.title}</h1>
                            </div>

                            {/* Ubicación de la propiedad */}
                            <div className="property-location3">{propertyData.location}</div>
                            {/* Precio de la propiedad */}
                            <div className="property-price3">{propertyData.price}</div>

                            {/* Descripción completa de la propiedad */}
                            <p className="property-description3">{propertyData.description}</p>

                            {/* Botones de acción para administradores */}
                            <div className="action-buttons3">
                                <button className="btn-edit" onClick={openEditModal}>Editar publicación</button>
                                <button className="btn-delete">Eliminar publicación</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección expandible con detalles de la propiedad */}
                <div className="property-details-section3">
                    {/* Encabezado de sección clickeable para expandir/contraer */}
                    <div className="details-header3" onClick={toggleDetails}>
                        <h2>Detalles</h2>
                        <button className="expand-btn">{detailsExpanded ? '-' : '+'}</button> {/* Muestra - o + según el estado */}
                    </div>

                    {/* Contenido de detalles que se muestra solo si detailsExpanded es true */}
                    {detailsExpanded && (
                        <div className="details-content3">
                            <ul>
                                {/* Mapeo de la lista de detalles de la propiedad */}
                                {propertyData.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Sección expandible con dimensiones de la propiedad */}
                <div className="property-dimensions-section3">
                    {/* Encabezado de sección clickeable para expandir/contraer */}
                    <div className="dimensions-header3" onClick={toggleDimensions}>
                        <h2>Dimensiones</h2>
                        <button className="expand-btn">{dimensionsExpanded ? '-' : '+'}</button> {/* Muestra - o + según el estado */}
                    </div>

                    {/* Contenido de dimensiones que se muestra solo si dimensionsExpanded es true */}
                    {dimensionsExpanded && (
                        <div className="dimensions-content3">
                            <ul>
                                {/* Mapeo de la lista de dimensiones de la propiedad */}
                                {propertyData.dimensions.map((dimension, index) => (
                                    <li key={index}>{dimension}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <EditPropertyCard isOpen={isEditModalOpen} onClose={closeEditModal} property={propertyData} />

        </>
    );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default PropertyViewAdmin;