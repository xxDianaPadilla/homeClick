import { useState } from "react";

export const usePropertySubmit = (formData, images, onClose, property = null, setIsLoading, setLoadingMessage) => {
    
    // Función helper para validar ObjectId de MongoDB
    const isValidObjectId = (id) => {
        if (!id) return false;
        if (typeof id !== 'string') return false;
        if (id === 'undefined' || id === 'null') return false;
        // Verificar formato hexadecimal de 24 caracteres
        return /^[0-9a-fA-F]{24}$/.test(id);
    };

    // Función para extraer y validar el ID de la propiedad
    const extractPropertyId = (property) => {
        if (!property) return null;
        
        console.log('Property object structure:', {
            property,
            keys: Object.keys(property),
            _id: property._id,
            id: property.id
        });

        // Intentar obtener el ID de diferentes formas
        let propertyId = property._id || property.id;
        
        // Si es un objeto con $oid (formato de algunos drivers de MongoDB)
        if (typeof propertyId === 'object' && propertyId.$oid) {
            propertyId = propertyId.$oid;
        }
        
        console.log('Extracted propertyId:', propertyId);
        console.log('Is valid ObjectId:', isValidObjectId(propertyId));
        
        return propertyId;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación inicial de campos requeridos
        if (!formData.name || !formData.description || !formData.price || !formData.location) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        if (images.length === 0) {
            alert('Por favor sube al menos una imagen');
            return;
        }

        // Validación específica para actualización de propiedades
        let propertyId = null;
        if (property) {
            propertyId = extractPropertyId(property);
            
            if (!isValidObjectId(propertyId)) {
                console.error('Invalid property ID detected:', {
                    propertyId,
                    property,
                    isValidObjectId: isValidObjectId(propertyId)
                });
                alert('Error: ID de propiedad inválido. No se puede actualizar la propiedad.');
                return;
            }
        }

        try {
            setIsLoading(true);
            setLoadingMessage('Preparando datos...');

            const submitData = new FormData();

            // Función helper para validar si un valor es válido
            const isValidValue = (value) => {
                return value !== '' && 
                       value !== null && 
                       value !== undefined && 
                       value !== 'undefined' && 
                       value !== 'null';
            };

            // Procesar datos del formulario
            Object.keys(formData).forEach(key => {
                if (!isValidValue(formData[key])) {
                    return; // Skip valores inválidos
                }

                let backendKey = key;
                let value = formData[key];

                switch (key) {
                    case 'bedrooms': 
                        backendKey = 'rooms'; 
                        value = parseInt(value);
                        if (isNaN(value) || value <= 0) return;
                        break;
                    case 'parking':
                        backendKey = 'parkingLot';
                        value = value === 'Sí' ? true : false;
                        break;
                    case 'patio':
                        value = value === 'Sí' ? true : false;
                        break;
                    case 'bathrooms':
                    case 'floors':
                        value = parseInt(value);
                        if (isNaN(value) || value <= 0) return;
                        break;
                    case 'constructionYear':
                        value = parseInt(value);
                        if (isNaN(value) || value <= 0) return;
                        break;
                    case 'lotSize':
                    case 'height':
                        // Para campos de texto, verificar que no estén vacíos
                        if (typeof value === 'string' && value.trim() === '') return;
                        break;
                    case 'address':
                        // El address no está en el esquema, skip
                        return;
                }

                submitData.append(backendKey, value);
            });

            setLoadingMessage('Procesando imágenes...');

            // Manejar imágenes nuevas
            const newImages = images.filter(image => image.file);
            newImages.forEach((image, index) => {
                submitData.append('images', image.file);
            });

            // Manejar imágenes existentes para actualización
            if (property) {
                const existingImages = images.filter(image => image.isExisting);
                if (existingImages.length > 0) {
                    submitData.append('existingImages', JSON.stringify(existingImages.map(img => img.path || img.image)));
                }
                // Agregar flag para mantener imágenes existentes si las hay
                if (existingImages.length > 0) {
                    submitData.append('keepExistingImages', 'true');
                }
            }

            // Construir URL
            const baseUrl = 'http://localhost:4000/api/properties';
            const url = property ? `${baseUrl}/${propertyId}` : baseUrl;
            const method = property ? 'PUT' : 'POST';

            console.log('Request details:', {
                url,
                method,
                propertyId,
                hasImages: newImages.length > 0,
                hasExistingImages: property ? images.filter(image => image.isExisting).length : 0
            });

            setLoadingMessage(
                property
                    ? 'Actualizando propiedad...'
                    : 'Creando nueva propiedad...'
            );

            const response = await fetch(url, {
                method: method,
                body: submitData,
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Server error response:', errorData);
                throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Success response:', result);

            setLoadingMessage('¡Completado exitosamente!');

            setTimeout(() => {
                setIsLoading(false);
                onClose();
                
                alert(property
                    ? 'Propiedad actualizada correctamente'
                    : 'Propiedad creada correctamente'
                );
                
                if (property) {
                    // En lugar de recargar toda la página, podrías emitir un evento o llamar una función de callback
                    window.location.reload();
                }
            }, 1000);

        } catch (error) {
            console.error("Error completo:", error);
            setIsLoading(false);
            
            // Mensaje de error más descriptivo
            let errorMessage = "Error al guardar la propiedad: ";
            if (error.message.includes('ID de propiedad inválido')) {
                errorMessage += "El identificador de la propiedad no es válido. Intenta recargar la página e intentar nuevamente.";
            } else {
                errorMessage += error.message;
            }
            
            alert(errorMessage);
        }
    };

    return {
        handleSubmit
    };
};