import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBarAdminSearch from "../components/NavBarAdminSearch";
import "../styles/PropertyViewAdmin.css";
import EditPropertyCard from "../components/EditPropertyCard";
import { usePropertyData } from '../components/Properties/Hooks/usePropertyData';
import { useExpandableSections } from '../components/Properties/Hooks/useExpandableSections';
import useEditProperty from "../components/Properties/Hooks/useEditProperty";
import useFetchProperties from "../components/Properties/Hooks/useFetchProperties";

const PropertyViewAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyAdmin', propertyId: '1' };

    const { mainImage, setMainImage, thumbnails, propertyData, loading, error } = usePropertyData(propertyId);
    const { detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions } = useExpandableSections();
    const { isEditModalOpen, openEditModal, closeEditModal } = useEditProperty();
    const { deleteProperty } = useFetchProperties();

    const [isDeleting, setIsDeleting] = useState(false);

    const center = [13.6929, -89.2182];

    const extractRoomsAndFloors = (details) => {
        let rooms = null;
        let floors = null;

        if (details && Array.isArray(details)) {
            details.forEach(detail => {
                if (typeof detail === 'string') {
                    const roomMatch = detail.match(/habitaciones?:\s*(\d+)/i) || detail.match(/cuartos?:\s*(\d+)/i);
                    if (roomMatch) {
                        rooms = parseInt(roomMatch[1]);
                    }

                    const floorMatch = detail.match(/pisos?:\s*(\d+)/i) || detail.match(/niveles?:\s*(\d+)/i);
                    if (floorMatch) {
                        floors = parseInt(floorMatch[1]);
                    }
                }
            });
        }

        return { rooms, floors };
    };

    const { rooms, floors } = extractRoomsAndFloors(propertyData.details);

    const completePropertyData = {
        ...propertyData,
        _id: propertyData._id || propertyData.id || propertyId,
        id: propertyData.id || propertyData._id || propertyId,
        thumbnails: thumbnails,
        images: thumbnails,
        rooms: rooms,
        floors: floors,
    };

    console.log('PropertyViewAdmin - Debug Info:', {
        propertyId,
        propertyData_id: propertyData._id,
        propertyData_id_type: typeof propertyData._id,
        completePropertyData_id: completePropertyData._id,
        completePropertyData_id_type: typeof completePropertyData._id
    });

    const handleDeleteProperty = async () => {
        const validId = completePropertyData._id || completePropertyData.id || propertyId;

        if (!validId || validId === 'undefined' || validId === 'null') {
            alert('Error: No se puede eliminar la propiedad. ID inválido.');
            return;
        }

        const confirmDelete = window.confirm(
            `¿Estás seguro de que deseas eliminar la propiedad "${propertyData.name}"? Esta acción no se puede deshacer.`
        );

        if (confirmDelete) {
            try {
                setIsDeleting(true); 
                await deleteProperty(validId);
                navigate('/propertyAdmin', { replace: true });
            } catch (error) {
                console.error('Error al eliminar la propiedad:', error);
                alert('Error al eliminar la propiedad. Por favor, inténtalo de nuevo.');
                setIsDeleting(false); 
            }
        }
    };

    if (loading) {
        return (
            <>
                <NavBarAdminSearch />
                <div className="property-container3">
                    <div className="loading-message" style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Cargando información de la propiedad...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBarAdminSearch />
                <div className="property-container3">
                    <div className="error-message" style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
                        <p>Error al cargar la propiedad: {error}</p>
                        <button onClick={() => window.history.back()}>Volver atrás</button>
                    </div>
                </div>
            </>
        );
    }

    const handleOpenEditModal = () => {
        const validId = completePropertyData._id || completePropertyData.id || propertyId;

        console.log('Opening edit modal with ID:', validId);

        if (!validId || validId === 'undefined' || validId === 'null') {
            alert('Error: No se puede editar la propiedad. ID inválido.');
            return;
        }

        if (typeof validId === 'string' && !/^[0-9a-fA-F]{24}$/.test(validId)) {
            console.warn('ID format may be invalid:', validId);
        }

        openEditModal();
    };

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
                        {thumbnails.length > 0 ? (
                            thumbnails.map((thumb, index) => (
                                <div
                                    key={index}
                                    className="thumbnail-wrapper"
                                    onClick={() => setMainImage(thumb)} // Cambia la imagen principal al hacer clic
                                >
                                    <img
                                        src={thumb}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`thumbnail ${mainImage === thumb ? 'active' : ''}`} // Añade clase 'active' si es la miniatura activa
                                        onError={(e) => {
                                            e.target.src = '/default-house.png'; // Imagen por defecto si falla la carga
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="no-images-message">
                                <p>No hay imágenes disponibles</p>
                            </div>
                        )}
                    </div>

                    {/* Contenido principal con imagen e información */}
                    <div className="main-content">
                        {/* Contenedor de la imagen principal con fecha de publicación */}
                        <div className="main-image-container">
                            <img
                                src={mainImage || '/default-house.png'}
                                alt={propertyData.name}
                                className="main-image"
                                onError={(e) => {
                                    e.target.src = '/default-house.png'; // Imagen por defecto si falla la carga
                                }}
                            />
                            <div className="image-date">Fecha Publicación: 15 de Febrero de 2024</div>
                        </div>

                        {/* Sección con información detallada de la propiedad */}
                        <div className="property-info3">
                            {/* Título de la propiedad */}
                            <div className="property-title-section3">
                                <h1>{propertyData.name}</h1>
                            </div>

                            {/* Ubicación de la propiedad */}
                            <div className="property-location3">{propertyData.location}</div>
                            {/* Precio de la propiedad */}
                            <div className="property-price3">{propertyData.price}</div>

                            {/* Descripción completa de la propiedad */}
                            <p className="property-description3">{propertyData.description}</p>

                            {/* Botones de acción para administradores */}
                            <div className="action-buttons3">
                                <button 
                                    className="btn-edit" 
                                    onClick={openEditModal}
                                    disabled={isDeleting}
                                >
                                    Editar publicación
                                </button>
                                <button 
                                    className="btn-delete" 
                                    onClick={handleDeleteProperty}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar publicación'}
                                </button>
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
                                {propertyData.details && propertyData.details.map((detail, index) => (
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
                                {propertyData.dimensions && propertyData.dimensions.map((dimension, index) => (
                                    <li key={index}>{dimension}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Pasar el objeto completo con todas las imágenes y datos */}
            <EditPropertyCard
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                property={completePropertyData}
            />

            {/* Modal de carga durante la eliminación */}
            {isDeleting && (
                <div className="delete-loading-overlay">
                    <div className="delete-loading-modal">
                        <div className="loading-spinner"></div>
                        <h3>Eliminando propiedad...</h3>
                        <p>Por favor espera mientras se elimina la propiedad y sus imágenes.</p>
                        <div className="loading-bar">
                            <div className="loading-bar-fill"></div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default PropertyViewAdmin;