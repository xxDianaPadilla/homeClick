import React, { useState, useEffect } from 'react';
import NavBarAdminSearch from '../components/NavBarAdminSearch';
import HouseCardsAdmin from '../components/HouseCardsAdmin';
import CategoryFilterDropdown from '../components/CategoryFilterDropdown';
import '../styles/PropertyAdmin.css';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetchProperties from '../components/Properties/Hooks/useFetchProperties';
import { useCategories } from '../components/Categories/hooks/useCategories';

const PropertyAdmin = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const { properties, loading, error, selectedCategory, handleCategoryFilter, clearCategoryFilter } = useFetchProperties();

    const { categories } = useCategories();

    const [searchValue, setSearchValue] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);

    const filterProperties = (searchTerm) => {
        // Asegurar que searchTerm sea siempre una cadena
        const term = searchTerm || '';

        if (!term.trim()) {
            setFilteredProperties(properties);
            return;
        }

        const filtered = properties.filter(property => {
            const location = property.location || '';
            const name = property.name || '';

            return (
                location.toLowerCase().includes(term.toLowerCase()) ||
                name.toLowerCase().includes(term.toLowerCase())
            );
        });

        setFilteredProperties(filtered);
    };

    const handleSearch = (searchTerm) => {
        const term = searchTerm || '';
        setSearchValue(term);
        filterProperties(term);
    };

    const handleClearSearch = () => {
        setSearchValue('');
        filterProperties('');
    };

    useEffect(() => {
        if (properties.length > 0) {
            filterProperties(searchValue);
        }
    }, [properties, searchValue]);

    const handlePropertyViewAdminClick = (propertyId) => {
        navigate('/propertyViewAdmin', {
            state: {
                fromPropertyAdmin: location.pathname,
                propertyId: propertyId
            }
        });
    };

    const handleCategorySelect = (categoryId) => {
        setSearchValue('');
        handleCategoryFilter(categoryId);
    };

    const handleClearCategoryFilter = () => {
        setSearchValue('');
        clearCategoryFilter();
    };

    const getSelectedCategoryName = () => {
        if (!selectedCategory) return null;
        const category = categories.find(cat => cat._id === selectedCategory);
        return category ? category.propertyType : null;
    };

    if (loading) {
        return (
            <>
                <NavBarAdminSearch />
                <div className='property-admin-container'>
                    <div className='property-content'>
                        <div className="loading-message">
                            <p>Cargando propiedades...</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBarAdminSearch />
                <div className='property-admin-container'>
                    <div className='property-content'>
                        <div className="error-message">
                            <p>Error al cargar las propiedades: {error}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const propertiesToShow = searchValue ? filteredProperties : properties;
    const selectedCategoryName = getSelectedCategoryName();

    return (
        <>
            <NavBarAdminSearch
                onSearch={handleSearch}
                searchValue={searchValue} // Siempre será una cadena
                setSearchValue={setSearchValue}
            />
            <div className='property-admin-container'>
                <div className='property-content'>
                    {/* Filtros y controles */}
                    <div className="filters-section" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '20px',
                        padding: '15px 20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        flexWrap: 'wrap'
                    }}>
                        <CategoryFilterDropdown
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={selectedCategory}
                            onClearFilter={handleClearCategoryFilter}
                        />

                        {/* Indicador de filtros activos */}
                        {(selectedCategory || searchValue) && (
                            <div className="active-filters" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                flex: 1
                            }}>
                                <span style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    fontWeight: '500'
                                }}>
                                    Filtros activos:
                                </span>

                                {selectedCategory && (
                                    <span style={{
                                        padding: '4px 8px',
                                        backgroundColor: '#e7f3ff',
                                        color: '#0066cc',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        🏠 {selectedCategoryName}
                                        <button
                                            onClick={handleClearCategoryFilter}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#0066cc',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}
                                            title="Limpiar filtro de categoría"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}

                                {searchValue && (
                                    <span style={{
                                        padding: '4px 8px',
                                        backgroundColor: '#f0f9ff',
                                        color: '#0891b2',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        🔍 "{searchValue}"
                                        <button
                                            onClick={handleClearSearch}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#0891b2',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}
                                            title="Limpiar búsqueda"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Información de resultados */}
                    <div className="results-info" style={{
                        padding: '10px 20px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '5px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        {selectedCategory && !searchValue && (
                            <>
                                {properties.length > 0 ? (
                                    <>
                                        Mostrando {properties.length} propiedad{properties.length !== 1 ? 'es' : ''}
                                        en la categoría "{selectedCategoryName}"
                                    </>
                                ) : (
                                    <>
                                        No se encontraron propiedades en la categoría "{selectedCategoryName}"
                                    </>
                                )}
                            </>
                        )}

                        {searchValue && (
                            <>
                                {filteredProperties.length > 0 ? (
                                    <>
                                        Mostrando {filteredProperties.length} resultado{filteredProperties.length !== 1 ? 's' : ''}
                                        para "{searchValue}"
                                        {selectedCategory && ` en la categoría "${selectedCategoryName}"`}
                                    </>
                                ) : (
                                    <>
                                        No se encontraron propiedades que coincidan con "{searchValue}"
                                        {selectedCategory && ` en la categoría "${selectedCategoryName}"`}
                                    </>
                                )}
                            </>
                        )}

                        {!selectedCategory && !searchValue && properties.length > 0 && (
                            <>
                                Mostrando todas las propiedades ({properties.length} total{properties.length !== 1 ? 'es' : ''})
                            </>
                        )}
                    </div>

                    {/* Contenido principal */}
                    {propertiesToShow.length === 0 ? (
                        <div className="no-results-message" style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: '#666'
                        }}>
                            {selectedCategory && !searchValue ? (
                                <>
                                    <h3>No hay propiedades en esta categoría</h3>
                                    <p>No se encontraron propiedades para la categoría "{selectedCategoryName}".</p>
                                    <button
                                        onClick={handleClearCategoryFilter}
                                        style={{
                                            marginTop: '15px',
                                            padding: '10px 20px',
                                            backgroundColor: '#3b82f6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Ver todas las propiedades
                                    </button>
                                </>
                            ) : searchValue ? (
                                <>
                                    <h3>No se encontraron resultados</h3>
                                    <p>Intenta con otros términos de búsqueda o revisa la ortografía.</p>
                                </>
                            ) : (
                                <>
                                    <h3>No hay propiedades disponibles</h3>
                                    <p>Aún no se han agregado propiedades al sistema.</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className='houses-grid'>
                            {propertiesToShow.map((property) => (
                                <HouseCardsAdmin
                                    key={property.id || property._id}
                                    image={property.images && property.images.length > 0 ? property.images[0].image : '/default-house.png'}
                                    location={property.location || property.name}
                                    onClick={() => handlePropertyViewAdminClick(property.id || property._id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PropertyAdmin;