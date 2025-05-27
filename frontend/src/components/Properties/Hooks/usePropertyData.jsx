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
        dimensions: []
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
                
                // AQUÍ ESTÁ EL FIX: Incluir TODOS los datos originales + los procesados
                const processedPropertyData = {
                    // ✅ PRIMERO: Incluir TODOS los datos originales de la propiedad
                    ...property,
                    
                    // ✅ SEGUNDO: Sobrescribir solo los campos que necesitas procesar para la vista
                    name: property.name || 'Propiedad sin nombre',
                    price: property.price ? `$${property.price.toLocaleString()}` : 'Precio no disponible',
                    location: property.location || 'Ubicación no especificada',
                    description: property.description || 'Sin descripción disponible',
                    
                    // ✅ TERCERO: Agregar arrays procesados para la vista
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
                    
                    // ✅ CUARTO: Mantener los datos originales para edición con nombres alternativos
                    originalName: property.name,
                    originalPrice: property.price,
                    originalLocation: property.location,
                    originalDescription: property.description
                };
                
                console.log('Processed property data with _id:', {
                    _id: processedPropertyData._id,
                    id: processedPropertyData.id,
                    name: processedPropertyData.name
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
                    dimensions: ['Información no disponible']
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