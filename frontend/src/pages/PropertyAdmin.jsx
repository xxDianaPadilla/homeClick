import React from 'react';
import NavBarAdminSearch from '../components/NavBarAdminSearch';
import HouseCardsAdmin from '../components/HouseCardsAdmin';
import '../styles/PropertyAdmin.css';
import house1 from "../assets/image5.png";
import house2 from "../assets/image6.png";
import house3 from "../assets/image7.png";
import { useNavigate, useLocation } from 'react-router-dom';
import useFetchProperties from '../components/Properties/Hooks/useFetchProperties';

const PropertyAdmin = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const { properties, loading, error } = useFetchProperties();

    const handlePropertyViewAdminClick = (propertyId) => {
        navigate('/propertyViewAdmin', {
            state: {
                fromPropertyAdmin: location.pathname,
                propertyId: propertyId
            }
        });
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

    if (properties.length === 0) {
        return (
            <>
                <NavBarAdminSearch />
                <div className='property-admin-container'>
                    <div className='property-content'>
                        <div className="no-properties-message">
                            <p>No hay propiedades disponibles</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBarAdminSearch />
            <div className='property-admin-container'>
                <div className='property-content'>
                    <div className='houses-grid'>
                        {properties.map((property) => (
                            <HouseCardsAdmin
                                key={property.id || property._id}
                                image={property.images && property.images.length > 0 ? property.images[0].image : '/default-house.png'}
                                location={property.location || property.name}
                                onClick={() => handlePropertyViewAdminClick(property.id || property._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyAdmin;