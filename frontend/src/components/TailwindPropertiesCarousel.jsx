import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useRealProperties from '../components/Properties/Hooks/useRealProperties';

const TailwindPropertiesCarousel = ({ limit = 6, title = "Descubre propiedades" }) => {
    const navigate = useNavigate();
    const { properties, loading, error } = useRealProperties(limit);

    // Función para formatear precio
    const formatPrice = (price) => {
        if (!price) return 'Precio no disponible';
        if (typeof price === 'string' && price.includes('$')) {
            return price;
        }
        const numericPrice = typeof price === 'string' 
            ? parseFloat(price.replace(/[^\d.-]/g, '')) 
            : price;
        if (isNaN(numericPrice)) return 'Precio no disponible';
        return `$${numericPrice.toLocaleString()}`;
    };

    // Manejar click en propiedad
    const handlePropertyClick = (property) => {
        navigate('/property-view', {
            state: {
                propertyId: property.id,
                fromCategory: '/landingPage'
            }
        });
    };

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {title && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Trocchi, serif' }}>
                        {title}
                    </h2>
                )}
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#E9631A] mb-4"></div>
                        <p className="text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                            Cargando propiedades...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {title && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Trocchi, serif' }}>
                        {title}
                    </h2>
                )}
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-600 mb-2" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        ⚠️ Error al cargar las propiedades
                    </p>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!properties || properties.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {title && (
                    <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Trocchi, serif' }}>
                        {title}
                    </h2>
                )}
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600" style={{ fontFamily: 'Raleway, sans-serif' }}>
                        📭 No hay propiedades disponibles en este momento
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Título */}
            {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Trocchi, serif' }}>
                    {title}
                </h2>
            )}

            {/* Scroll horizontal de propiedades */}
            <div className="relative">
                {/* Contenedor con scroll horizontal */}
                <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 px-1">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            onClick={() => handlePropertyClick(property)}
                            className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden 
                                     hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                        >
                            {/* Imagen de la propiedad */}
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.name}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
                                    }}
                                />
                                
                                {/* Badge de precio */}
                                <div className="absolute top-3 right-3 bg-white bg-opacity-90 
                                              rounded-full px-3 py-1 shadow-md">
                                    <span 
                                        className="text-sm font-bold text-gray-800"
                                        style={{ fontFamily: 'Raleway, sans-serif' }}
                                    >
                                        {formatPrice(property.price)}
                                    </span>
                                </div>
                            </div>

                            {/* Información de la propiedad */}
                            <div className="p-4">
                                <h3 
                                    className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2"
                                    style={{ fontFamily: 'Trocchi, serif' }}
                                >
                                    {property.name}
                                </h3>
                                
                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <svg 
                                        className="w-4 h-4 mr-1" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                                        />
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                                        />
                                    </svg>
                                    <span 
                                        className="line-clamp-1"
                                        style={{ fontFamily: 'Raleway, sans-serif' }}
                                    >
                                        {property.location}
                                    </span>
                                </div>
                                
                                <p 
                                    className="text-sm text-gray-600 line-clamp-2 mb-3"
                                    style={{ fontFamily: 'Raleway, sans-serif' }}
                                >
                                    {property.description}
                                </p>

                                {/* Detalles de la propiedad */}
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                    <div className="flex items-center">
                                        <span className="mr-3">🛏️ {property.rooms} hab.</span>
                                        <span className="mr-3">🚿 {property.bathrooms} baños</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicadores de scroll (gradientes en los bordes) */}
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
            </div>

            {/* Información adicional */}
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500" style={{ fontFamily: 'Raleway, sans-serif' }}>
                    Mostrando {properties.length} propiedades seleccionadas aleatoriamente
                </p>
            </div>
        </div>
    );
};

export default TailwindPropertiesCarousel;