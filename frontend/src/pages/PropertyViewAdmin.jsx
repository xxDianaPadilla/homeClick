import React, { useEffect, useState } from "react";
import NavBarAdminSearch from "../components/NavBarAdminSearch";
import "../styles/PropertyViewAdmin.css";
import house1 from "../assets/image27.png";
import house6 from "../assets/image6.png";
import house7 from "../assets/image7.png";
import house8 from "../assets/image5.png";
import EditPropertyCard from "../components/EditPropertyCard";
import { useLocation, useNavigate } from "react-router-dom";

// Definición del componente principal PropertyViewAdmin
const PropertyViewAdmin = () => {

    // Estado para controlar qué imagen se muestra como principal
    const [mainImage, setMainImage] = useState(house8);

    // Estado para controlar si la sección de detalles está expandida
    const [detailsExpanded, setDetailsExpanded] = useState(false);

    // Estado para controlar si la sección de dimensiones está expandida
    const [dimensionsExpanded, setDimensionsExpanded] = useState(false);

    // Estado para controlar la visibilidad del componente de edición
    const [showEditPropertyCard, setShowEditPropertyCard] = useState(false);

    // Hooks de React Router para obtener la ubicación actual y permitir navegación
    const location = useLocation();
    const navigate = useNavigate();

    // Extracción de parámetros de la ubicación con valores predeterminados
    const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyAdmin', propertyId: '1' };

    // Efecto que se ejecuta cuando cambian propertyId o fromCategory
    useEffect(() => {
        // Mensaje de depuración en consola
        console.log(`Cargando propiedad ID: ${propertyId} desde la categoría: ${fromCategory}`);

        // Cambia la imagen principal según el ID de la propiedad
        if (propertyId === '2' || propertyId === '5' || propertyId === '8') {
            setMainImage(house6);
        } else if (propertyId === '3' || propertyId === '6' || propertyId === '9') {
            setMainImage(house7);
        }
    }, [propertyId, fromCategory]); // Dependencias del efecto

    // Array de imágenes en miniatura para la galería
    const thumbnails = [house1, house6, house7, house1];

    // Objeto con todos los datos de la propiedad
    const propertyData = {
        title: "Casa en Colonia Escalón",
        price: "$150,000",
        location: "San Salvador, El Salvador",
        description: "Hermosa y lugar de lujo donde se une espectacularmente zona residencial. Disfruta una viviesta privada y accesible, con amplios espacios iluminados, comodidad y seguridad. Ideal para familias que buscan calidad de vida, cerca de centros comerciales, colegios y zonas recreativas. Acaba y detalles modernos, ofrecen un equilibrio perfecto entre estilo, funcionalidad y confort.",
        // Array con detalles de la propiedad
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
        // Array con dimensiones de la propiedad
        dimensions: [
            "Tamaño del lote: 150 metros cuadrados",
            "Altura: 3.2 metros"
        ]
    };

    // Array de propiedades similares para recomendaciones
    const similarProperties = [
        { id: 1, image: house6, title: "Casa en la zona Rosa" },
        { id: 2, image: house7, title: "Casa en santa tecla" },
        { id: 3, image: house1, title: "Casa en Colonia Escalón" }
    ];

    // Función para alternar la visibilidad de la sección de detalles
    const toggleDetails = () => {
        setDetailsExpanded(!detailsExpanded);
    };

    // Función para alternar la visibilidad de la sección de dimensiones
    const toggleDimensions = () => {
        setDimensionsExpanded(!dimensionsExpanded);
    };

    // Coordenadas para un posible mapa (no utilizado en el código renderizado)
    const center = [13.6929, -89.2182];

    // Función para mostrar/ocultar el formulario de edición de propiedades
    const toggleEditPropertyCard = () => {
        setShowEditPropertyCard(!showEditPropertyCard);
    };

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
                                <button className="btn-edit" onClick={toggleEditPropertyCard}>Editar publicación</button>
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

            {/* Componente para editar la propiedad que se muestra condicionalmente */}
            {showEditPropertyCard && <EditPropertyCard onClose={toggleEditPropertyCard} />}
        </>
    );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default PropertyViewAdmin;