import React from 'react';
import NavBarAdminSearch from '../components/NavBarAdminSearch';
import HouseCardsAdmin from '../components/HouseCardsAdmin';
import '../styles/PropertyAdmin.css';
import house1 from "../assets/image5.png"; 
import house2 from "../assets/image6.png"; 
import house3 from "../assets/image7.png"; 

const PropertyAdmin = () => {

    const houseData = [
        {id: 1, image: house1, location: "Casa en Colonia Escalón"},
        {id: 2, image: house2, location: "Casa en la zona Rosa"},
        {id: 3, image: house3, location: "Casa en santa tecla"},
        {id: 4, image: house1, location: "Casa en Colonia Escalón"},
        {id: 5, image: house2, location: "Casa en la zona Rosa"},
        {id: 6, image: house3, location: "Casa en santa tecla"},
        {id: 7, image: house1, location: "Casa en Colonia Escalón"},
        {id: 8, image: house2, location: "Casa en la zona Rosa"},
        {id: 9, image: house3, location: "Casa en santa tecla"}
    ];

    return (
        <>
            <NavBarAdminSearch />

            <div className='property-admin-container'>
                <div className='property-content'>
                    <div className='houses-grid'>
                        {houseData.map((house) => (
                            <HouseCardsAdmin key={house.id} image={house.image} location={house.location}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyAdmin;