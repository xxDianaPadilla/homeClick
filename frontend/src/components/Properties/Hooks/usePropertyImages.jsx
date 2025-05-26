import { useState } from "react";

export const usePropertyImages = (initialImages = []) => {
    const processInitialImages = (images) => {
        if (!images || !Array.isArray(images)) return [];
        
        return images.map((img, index) => ({
            id: index + 1,
            name: `Imagen propiedad ${index + 1}`,
            path: img.image || img,
            isExisting: true 
        }));
    };

    const [images, setImages] = useState(processInitialImages(initialImages));

    const handleRemoveImage = (id) => {
        setImages(images.filter(image => image.id !== id));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length > 0) {
            const newImages = files.map((file, index) => ({
                id: Date.now() + index,
                name: file.name,
                file: file,
                path: URL.createObjectURL(file), 
                isExisting: false
            }));
            
            setImages([...images, ...newImages]);
        }
        
        e.target.value = '';
    };

    const clearImages = () => {
        images.forEach(img => {
            if (img.path && img.path.startsWith('blob:')) {
                URL.revokeObjectURL(img.path);
            }
        });
        setImages([]);
    };

    const getImagePreview = (image) => {
        if (image.isExisting) {
            return image.path; 
        } else {
            return image.path; 
        }
    };

    return {
        images,
        setImages,
        handleRemoveImage,
        handleImageUpload,
        clearImages,
        getImagePreview
    };
};