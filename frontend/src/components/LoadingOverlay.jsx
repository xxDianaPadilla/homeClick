import React from 'react';
import '../styles/LoadingOverlay.css';

const LoadingOverlay = ({ isVisible, message = "Guardando propiedad..." }) => {
    if (!isVisible) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
                <div className="loading-text">
                    <h3>{message}</h3>
                    <p>Por favor espera mientras procesamos las imágenes...</p>
                </div>
                <div className="loading-progress">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;