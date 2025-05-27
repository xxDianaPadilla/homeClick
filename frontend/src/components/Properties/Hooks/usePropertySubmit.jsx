import { useState } from "react";

export const usePropertySubmit = (formData, images, onClose, property = null, setIsLoading, setLoadingMessage) => {
    
    const isValidObjectId = (id) => {
        if (!id) return false;
        if (typeof id !== 'string') return false;
        if (id === 'undefined' || id === 'null') return false;
        return /^[0-9a-fA-F]{24}$/.test(id);
    };

    const extractPropertyId = (property) => {
        if (!property) return null;
        
        console.log('Property object structure:', {
            property,
            keys: Object.keys(property),
            _id: property._id,
            id: property.id
        });

        let propertyId = property._id || property.id;
        
        if (typeof propertyId === 'object' && propertyId.$oid) {
            propertyId = propertyId.$oid;
        }
        
        console.log('Extracted propertyId:', propertyId);
        console.log('Is valid ObjectId:', isValidObjectId(propertyId));
        
        return propertyId;
    };

    const handleSubmit = async (e, processedFormData = null) => {
        if (e) e.preventDefault();

        const submitFormData = processedFormData || formData;

        if (!submitFormData.name || !submitFormData.description || !submitFormData.price || !submitFormData.location) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        if (images.length === 0) {
            alert('Por favor sube al menos una imagen');
            return;
        }

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

            const isValidValue = (value) => {
                return value !== '' && 
                       value !== null && 
                       value !== undefined && 
                       value !== 'undefined' && 
                       value !== 'null';
            };

            Object.keys(submitFormData).forEach(key => {
                if (!isValidValue(submitFormData[key])) {
                    return; 
                }

                let backendKey = key;
                let value = submitFormData[key];

                switch (key) {
                    case 'bedrooms': 
                        if (submitFormData.rooms !== undefined) {
                            return; 
                        }
                        backendKey = 'rooms'; 
                        value = parseInt(value);
                        if (isNaN(value) || value <= 0) return;
                        break;
                    case 'rooms':
                        value = parseInt(value);
                        if (isNaN(value) || value <= 0) return;
                        break;
                    case 'parking':
                        backendKey = 'parkingLot';
                        value = value === 'Sí' ? true : false;
                        break;
                    case 'parkingLot':
                        value = Boolean(value);
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
                        if (typeof value === 'string' && value.trim() === '') return;
                        break;
                    case 'address':
                        return; 
                    case 'price':
                        if (typeof value === 'string') {
                            value = value.replace(/[^\d.,]/g, '');
                        }
                        break;
                }

                submitData.append(backendKey, value);
            });

            setLoadingMessage('Procesando imágenes...');

            const newImages = images.filter(image => image.file);
            newImages.forEach((image, index) => {
                submitData.append('images', image.file);
            });

            if (property) {
                const existingImages = images.filter(image => image.isExisting);
                if (existingImages.length > 0) {
                    submitData.append('existingImages', JSON.stringify(existingImages.map(img => img.path || img.image)));
                    submitData.append('keepExistingImages', 'true');
                }
            }

            const baseUrl = 'http://localhost:4000/api/properties';
            const url = property ? `${baseUrl}/${propertyId}` : baseUrl;
            const method = property ? 'PUT' : 'POST';

            console.log('Request details:', {
                url,
                method,
                propertyId,
                hasImages: newImages.length > 0,
                hasExistingImages: property ? images.filter(image => image.isExisting).length : 0,
                formData: Object.fromEntries(submitData.entries()) 
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
                    window.location.reload();
                }
            }, 1000);

        } catch (error) {
            console.error("Error completo:", error);
            setIsLoading(false);
            
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