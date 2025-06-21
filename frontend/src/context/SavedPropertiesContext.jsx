import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Importar para acceder al usuario actual

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
    
    // Obtener datos del usuario autenticado
    const { user, isAuthenticated } = useAuth();

    // Función para obtener la clave de guardados específica del usuario
    const getSavedPropertiesKey = () => {
        if (!user || !user.id) return 'guest_saved_properties';
        return `saved_properties_user_${user.id}`;
    };

    // Función para cargar propiedades guardadas desde localStorage específico del usuario
    const loadSavedProperties = () => {
        if (!isAuthenticated || !user) {
            setSavedProperties([]);
            return;
        }

        try {
            const savedKey = getSavedPropertiesKey();
            const saved = localStorage.getItem(savedKey);
            if (saved) {
                const parsedSaved = JSON.parse(saved);
                console.log(`Cargando propiedades guardadas para usuario ${user.id}:`, parsedSaved);
                setSavedProperties(parsedSaved);
            } else {
                console.log(`No hay propiedades guardadas para usuario ${user.id}`);
                setSavedProperties([]);
            }
        } catch (error) {
            console.error('Error loading saved properties:', error);
            setSavedProperties([]);
        }
    };

    // Función para guardar propiedades en localStorage específico del usuario
    const saveToStorage = (properties) => {
        if (!isAuthenticated || !user) return;
        
        try {
            const savedKey = getSavedPropertiesKey();
            console.log(`Guardando propiedades para usuario ${user.id}:`, properties);
            localStorage.setItem(savedKey, JSON.stringify(properties));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    // Cargar propiedades guardadas cuando cambie el usuario o cuando se monte el componente
    useEffect(() => {
        if (isAuthenticated && user) {
            loadSavedProperties();
        } else {
            // Si el usuario no está autenticado, limpiar las propiedades guardadas
            setSavedProperties([]);
        }
    }, [user, isAuthenticated]);

    // Guardar propiedades cada vez que cambien las propiedades guardadas
    useEffect(() => {
        if (isAuthenticated && user && savedProperties.length >= 0) {
            saveToStorage(savedProperties);
        }
    }, [savedProperties, user, isAuthenticated]);

    const addProperty = (property) => {
        if (!isAuthenticated || !user) {
            console.warn('Usuario no autenticado, no se puede guardar propiedad');
            return;
        }

        const propertyWithSaveDate = {
            ...property,
            savedAt: new Date().toISOString(),
            id: property._id || property.id,
            userId: user.id // Agregar ID del usuario para referencia
        };
        
        const updatedProperties = [...savedProperties, propertyWithSaveDate];
        setSavedProperties(updatedProperties);
    };

    const removeProperty = (propertyId) => {
        if (!isAuthenticated || !user) return;
        
        const updatedProperties = savedProperties.filter(
            prop => prop.id !== propertyId && prop._id !== propertyId
        );
        setSavedProperties(updatedProperties);
    };

    const isPropertySaved = (propertyId) => {
        if (!isAuthenticated || !user) return false;
        
        return savedProperties.some(
            prop => prop.id === propertyId || prop._id === propertyId
        );
    };

    const toggleProperty = (property) => {
        if (!isAuthenticated || !user) {
            console.warn('Usuario no autenticado, no se puede toggle propiedad');
            return false;
        }

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
        if (!isAuthenticated || !user) return null;
        
        return savedProperties.find(
            prop => prop.id === propertyId || prop._id === propertyId
        );
    };

    const clearAllSavedProperties = () => {
        if (!isAuthenticated || !user) return;
        
        setSavedProperties([]);
        // También limpiar del localStorage
        try {
            const savedKey = getSavedPropertiesKey();
            localStorage.removeItem(savedKey);
            console.log(`Propiedades guardadas limpiadas para usuario ${user.id}`);
        } catch (error) {
            console.error('Error limpiando propiedades guardadas del localStorage:', error);
        }
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
        savedCount: savedProperties.length,
        currentUserId: user?.id || null // Exponer el ID del usuario actual
    };

    return (
        <SavedPropertiesContext.Provider value={value}>
            {children}
        </SavedPropertiesContext.Provider>
    );
};