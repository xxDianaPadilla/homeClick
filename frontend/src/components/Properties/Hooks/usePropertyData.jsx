import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const usePropertyData = (propertyId) => {
    const [mainImage, setMainImage] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [propertyData, setPropertyData] = useState({
        name: '',
        price: '',
        location: '',
        description: '',
        details: [],
        dimensions: [],
        coordinates: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = "http://localhost:4000/api/properties";

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!propertyId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log('Fetching property with ID:', propertyId);
                const response = await fetch(`${API}/${propertyId}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(`Propiedad no encontrada (ID: ${propertyId})`);
                    }
                    throw new Error(`Error del servidor: ${response.status}`);
                }
                
                const property = await response.json();
                console.log('Property data received:', property);
                console.log('Property _id:', property._id);
                console.log('Property _id type:', typeof property._id);
                
                const imageUrls = property.images?.map(img => img.image) || [];
                setThumbnails(imageUrls);
                setMainImage(imageUrls[0] || '');

                let coordinates = null;
                if (property.latitude && property.longitude) {
                    coordinates = [parseFloat(property.latitude), parseFloat(property.longitude)];
                } else if (property.coordinates) {
                    if (Array.isArray(property.coordinates) && property.coordinates.length === 2) {
                        coordinates = [parseFloat(property.coordinates[0]), parseFloat(property.coordinates[1])];
                    } else if (property.coordinates.lat && property.coordinates.lng) {
                        coordinates = [parseFloat(property.coordinates.lat), parseFloat(property.coordinates.lng)];
                    }
                }
                
                const processedPropertyData = {
                    ...property,
                    
                    name: property.name || 'Propiedad sin nombre',
                    price: property.price ? `$${property.price.toLocaleString()}` : 'Precio no disponible',
                    location: property.location || 'Ubicación no especificada',
                    description: property.description || 'Sin descripción disponible',
                    
                    details: [
                        `Habitaciones: ${property.rooms || 'No especificado'}`,
                        `Baños: ${property.bathrooms || 'No especificado'}`,
                        `Pisos: ${property.floors || 'No especificado'}`,
                        `Parqueo: ${property.parkingLot ? 'Sí' : 'No'}`,
                        `Patio: ${property.patio ? 'Sí' : 'No'}`,
                        `Año de construcción: ${property.constructionYear || 'No especificado'}`
                    ],
                    dimensions: [
                        `Tamaño del lote: ${property.lotSize || 'No especificado'}`,
                        `Altura: ${property.height || 'No especificado'}`
                    ],

                    coordinates: coordinates,
                    
                    originalName: property.name,
                    originalPrice: property.price,
                    originalLocation: property.location,
                    originalDescription: property.description
                };
                
                console.log('Processed property data with _id:', {
                    _id: processedPropertyData._id,
                    id: processedPropertyData.id,
                    name: processedPropertyData.name,
                    coordinates: processedPropertyData.coordinates
                });
                
                setPropertyData(processedPropertyData);
                setError(null);
                
            } catch (err) {
                console.error('Error fetching property data:', err);
                setError(err.message);
                toast.error(`Error al cargar la propiedad: ${err.message}`);
                
                setPropertyData({
                    name: 'Error al cargar propiedad',
                    price: 'No disponible',
                    location: 'No disponible',
                    description: 'No se pudo cargar la información de esta propiedad.',
                    details: ['Información no disponible'],
                    dimensions: ['Información no disponible'],
                    coordinates: null
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [propertyId]);

    return {
        mainImage,
        setMainImage,
        thumbnails,
        propertyData,
        loading,
        error
    };
};