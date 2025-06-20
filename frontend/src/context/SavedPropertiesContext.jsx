import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedPropertiesContext = createContext();

export const useSavedProperties = () => {
    const context = useContext(SavedPropertiesContext);
    if (!context) {
        throw new Error('useSavedProperties must be used within a SavedPropertiesProvider');
    }
    return context;
};

export const SavedPropertiesProvider = ({ children }) => {
    const [savedProperties, setSavedProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cargar propiedades guardadas al inicializar
    useEffect(() => {
        loadSavedProperties();
    }, []);

    const loadSavedProperties = () => {
        try {
            const saved = localStorage.getItem('savedProperties');
            if (saved) {
                setSavedProperties(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading saved properties:', error);
            setSavedProperties([]);
        }
    };

    const saveToStorage = (properties) => {
        try {
            localStorage.setItem('savedProperties', JSON.stringify(properties));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    const addProperty = (property) => {
        const propertyWithSaveDate = {
            ...property,
            savedAt: new Date().toISOString(),
            id: property._id || property.id
        };
        
        const updatedProperties = [...savedProperties, propertyWithSaveDate];
        setSavedProperties(updatedProperties);
        saveToStorage(updatedProperties);
    };

    const removeProperty = (propertyId) => {
        const updatedProperties = savedProperties.filter(
            prop => prop.id !== propertyId && prop._id !== propertyId
        );
        setSavedProperties(updatedProperties);
        saveToStorage(updatedProperties);
    };

    const isPropertySaved = (propertyId) => {
        return savedProperties.some(
            prop => prop.id === propertyId || prop._id === propertyId
        );
    };

    const toggleProperty = (property) => {
        const propertyId = property._id || property.id;
        
        if (isPropertySaved(propertyId)) {
            removeProperty(propertyId);
            return false;
        } else {
            addProperty(property);
            return true;
        }
    };

    const getSavedProperty = (propertyId) => {
        return savedProperties.find(
            prop => prop.id === propertyId || prop._id === propertyId
        );
    };

    const clearAllSavedProperties = () => {
        setSavedProperties([]);
        saveToStorage([]);
    };

    const value = {
        savedProperties,
        loading,
        addProperty,
        removeProperty,
        isPropertySaved,
        toggleProperty,
        getSavedProperty,
        clearAllSavedProperties,
        savedCount: savedProperties.length
    };

    return (
        <SavedPropertiesContext.Provider value={value}>
            {children}
        </SavedPropertiesContext.Provider>
    );
};