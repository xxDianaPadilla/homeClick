import { useState, useEffect } from "react";

const useRealProperties = (limit = 6) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para mezclar array aleatoriamente (Fisher-Yates shuffle)
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Función para formatear precio
    const formatPrice = (price) => {
        if (!price) return 'Precio no disponible';
        
        // Si es número o string sin formato, agregamos el símbolo
        const numericPrice = typeof price === 'string' 
            ? parseFloat(price.replace(/[^\d.-]/g, '')) 
            : price;
            
        if (isNaN(numericPrice)) return 'Precio no disponible';
        
        return `$${numericPrice.toLocaleString()}`;
    };

    // Función para extraer el ID correcto de la propiedad
    const extractPropertyId = (property) => {
        // Priorizar _id que es el formato principal de MongoDB
        if (property._id) {
            // Si _id es un objeto con $oid (formato serializado de MongoDB)
            if (typeof property._id === 'object' && property._id.$oid) {
                return property._id.$oid;
            }
            // Si _id es un string directo
            if (typeof property._id === 'string') {
                return property._id;
            }
        }
        
        // Fallback a id si existe
        if (property.id) {
            return property.id;
        }
        
        // Si no encuentra ID válido, generar uno temporal
        console.warn('Property without valid ID found:', property);
        return `temp-${Date.now()}-${Math.random()}`;
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log('Fetching properties from API...');
                const response = await fetch('http://localhost:4000/api/properties');
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Raw API response:', data);
                
                // Verificar la estructura de los datos
                if (!Array.isArray(data)) {
                    console.error('API response is not an array:', data);
                    throw new Error('Formato de respuesta inválido');
                }

                // Mezclar propiedades aleatoriamente y tomar solo el límite especificado
                const shuffledData = shuffleArray(data);
                const limitedData = shuffledData.slice(0, limit);
                
                // Procesamos las propiedades
                const processedProperties = limitedData.map(property => {
                    const propertyId = extractPropertyId(property);
                    
                    console.log('Processing property:', {
                        originalId: property._id,
                        extractedId: propertyId,
                        name: property.name
                    });

                    return {
                        id: propertyId, // ID procesado correctamente
                        name: property.name || property.description || 'Propiedad sin nombre',
                        description: property.description || property.name || 'Sin descripción disponible',
                        image: property.images && property.images.length > 0 
                            ? property.images[0].image 
                            : 'https://via.placeholder.com/300x200?text=Sin+Imagen',
                        caption: property.name || property.description || 'Propiedad sin nombre',
                        location: property.location || 'Ubicación no especificada',
                        price: formatPrice(property.price),
                        originalPrice: property.price, // Precio original para cálculos
                        propertyData: property, // Datos completos para navegación
                        // Campos adicionales para la card
                        rooms: property.rooms || property.bedrooms || 0,
                        bathrooms: property.bathrooms || 0,
                        lotSize: property.lotSize || 'No especificado',
                        // Mantener referencia al objeto original
                        _originalProperty: property
                    };
                });

                console.log('Processed properties:', processedProperties.map(p => ({
                    id: p.id,
                    name: p.name
                })));

                setProperties(processedProperties);
            } catch (err) {
                console.error('Error fetching properties:', err);
                setError(err.message);
                // Datos de fallback si hay error
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [limit]);

    return { properties, loading, error };
};

export default useRealProperties;