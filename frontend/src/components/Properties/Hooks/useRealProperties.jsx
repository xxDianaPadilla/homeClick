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
        
        return `${numericPrice.toLocaleString()}`;
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('http://localhost:4000/api/properties');
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                
                // Mezclar propiedades aleatoriamente y tomar solo el límite especificado
                const shuffledData = shuffleArray(data);
                const limitedData = shuffledData.slice(0, limit);
                
                // Procesamos las propiedades
                const processedProperties = limitedData.map(property => ({
                    id: property._id,
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
                    lotSize: property.lotSize || 'No especificado'
                }));

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