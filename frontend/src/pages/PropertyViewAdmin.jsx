import { useLocation } from "react-router-dom";
import NavBarAdminSearch from "../components/NavBarAdminSearch";
import "../styles/PropertyViewAdmin.css";
import EditPropertyCard from "../components/EditPropertyCard";
import { usePropertyData } from '../components/Properties/Hooks/usePropertyData';
import { useExpandableSections } from '../components/Properties/Hooks/useExpandableSections';
import useEditProperty from "../components/Properties/Hooks/useEditProperty";

// Definición del componente principal PropertyViewAdmin
const PropertyViewAdmin = () => {
    const location = useLocation();
    const { fromCategory, propertyId } = location.state || { fromCategory: '/propertyAdmin', propertyId: '1' };

    const { mainImage, setMainImage, thumbnails, propertyData, loading, error } = usePropertyData(propertyId);
    const { detailsExpanded, dimensionsExpanded, toggleDetails, toggleDimensions } = useExpandableSections();
    const { isEditModalOpen, openEditModal, closeEditModal } = useEditProperty();

    const center = [13.6929, -89.2182];

    const extractRoomsAndFloors = (details) => {
        let rooms = null;
        let floors = null;

        if (details && Array.isArray(details)) {
            details.forEach(detail => {
                if (typeof detail === 'string') {
                    // Buscar habitaciones
                    const roomMatch = detail.match(/habitaciones?:\s*(\d+)/i) || detail.match(/cuartos?:\s*(\d+)/i);
                    if (roomMatch) {
                        rooms = parseInt(roomMatch[1]);
                    }

                    // Buscar pisos/niveles
                    const floorMatch = detail.match(/pisos?:\s*(\d+)/i) || detail.match(/niveles?:\s*(\d+)/i);
                    if (floorMatch) {
                        floors = parseInt(floorMatch[1]);
                    }
                }
            });
        }

        return { rooms, floors };
    };

    // Usar la función para extraer los datos
    const { rooms, floors } = extractRoomsAndFloors(propertyData.details);

    // Crear objeto completo de la propiedad para pasar al modal
    // AQUÍ ESTÁ EL FIX PRINCIPAL: Asegurar que el ID esté presente
    const completePropertyData = {
        ...propertyData,
        // Asegurar que el ID esté presente en el formato correcto
        _id: propertyData._id || propertyData.id || propertyId,
        id: propertyData.id || propertyData._id || propertyId,
        thumbnails: thumbnails,
        images: thumbnails,
        rooms: rooms,           // ← Agregar rooms extraído
        floors: floors,         // ← Agregar floors extraído
    };

    // Debug log para verificar el ID
    console.log('PropertyViewAdmin - Debug Info:', {
        propertyId,
        propertyData_id: propertyData._id,
        propertyData_id_type: typeof propertyData._id,
        completePropertyData_id: completePropertyData._id,
        completePropertyData_id_type: typeof completePropertyData._id
    });

    // Mostrar loading mientras se cargan los datos
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

    // Mostrar error si hay problemas al cargar
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

    // Función para manejar la apertura del modal con validación adicional
    const handleOpenEditModal = () => {
        // Validar que tenemos un ID válido antes de abrir el modal
        const validId = completePropertyData._id || completePropertyData.id || propertyId;

        console.log('Opening edit modal with ID:', validId);

        if (!validId || validId === 'undefined' || validId === 'null') {
            alert('Error: No se puede editar la propiedad. ID inválido.');
            return;
        }

        // Verificar formato de ObjectId (24 caracteres hexadecimales)
        if (typeof validId === 'string' && !/^[0-9a-fA-F]{24}$/.test(validId)) {
            console.warn('ID format may be invalid:', validId);
        }

        openEditModal();
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

        </>
    );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default PropertyViewAdmin;