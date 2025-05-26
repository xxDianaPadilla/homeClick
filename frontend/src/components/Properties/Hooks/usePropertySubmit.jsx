import { useState } from "react";

export const usePropertySubmit = (formData, images, onClose, property = null, setIsLoading, setLoadingMessage) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.price || !formData.location) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        if (images.length === 0) {
            alert('Por favor sube al menos una imagen');
            return;
        }

        try {
            setIsLoading(true);
            setLoadingMessage('Preparando datos...');

            const submitData = new FormData();

            Object.keys(formData).forEach(key => {
                if (formData[key] !== '') {
                    let backendKey = key;
                    switch (key) {
                        case 'bedrooms':
                            backendKey = 'rooms';
                            break;
                        case 'parking':
                            backendKey = 'parkingLot';
                            break;
                        case 'address':
                            backendKey = 'location';
                            break;
                    }
                    submitData.append(backendKey, formData[key]);
                }
            });

            setLoadingMessage('Procesando imágenes...');

            images.forEach((image, index) => {
                if (image.file) {
                    submitData.append('images', image.file);
                }
            });

            const url = property
                ? `http://localhost:4000/api/properties/${property._id}`
                : 'http://localhost:4000/api/properties';

            const method = property ? 'PUT' : 'POST';

            setLoadingMessage(
                property
                    ? 'Actualizando propiedad...'
                    : 'Creando nueva propiedad...'
            );

            const response = await fetch(url, {
                method: method,
                body: submitData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            setLoadingMessage('¡Completado exitosamente!');

            setTimeout(() => {
                setIsLoading(false);
                onClose();
                
                alert(property 
                    ? 'Propiedad actualizada correctamente' 
                    : 'Propiedad creada correctamente'
                );
                
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            setIsLoading(false);
            alert("Error al guardar la propiedad: " + error.message);
        }
    };

    return {
        handleSubmit
    };
};