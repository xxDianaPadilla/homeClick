import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/PropertyCategories.css";
import house1 from "../assets/image5.png";
import house2 from "../assets/image6.png";
import house3 from "../assets/image7.png";
import { useNavigate, useLocation } from 'react-router-dom';

const PropertyCategories = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePropertyViewClick = (propertyId) => {
        navigate('/propertyView', {
            state: {
                fromCategory: location.pathname,
                propertyId: propertyId
            }
        });
      };

    return(
        <>
            <Navbar/>
            
            <div className="properties-container2">
                <div className="properties-grid2">
                    <div className="property-card2" onClick={() => handlePropertyViewClick('1')}>
                        <div className="image-container">
                            <img src={house1} alt="Casa en Colonia Escalón" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en Colonia Escalón</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house2} alt="Casa en la zona Rosa" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en la zona Rosa</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house3} alt="Casa en santa tecla" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en santa tecla</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house1} alt="Casa en Colonia Escalón" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en Colonia Escalón</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house2} alt="Casa en la zona Rosa" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en la zona Rosa</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house3} alt="Casa en santa tecla" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en santa tecla</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house1} alt="Casa en Colonia Escalón" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en Colonia Escalón</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house2} alt="Casa en la zona Rosa" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en la zona Rosa</p>
                        </div>
                    </div>
                    
                    <div className="property-card2">
                        <div className="image-container">
                            <img src={house3} alt="Casa en santa tecla" />
                        </div>
                        <div className="property-footer">
                            <p>Casa en santa tecla</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </>
    );
};

export default PropertyCategories;