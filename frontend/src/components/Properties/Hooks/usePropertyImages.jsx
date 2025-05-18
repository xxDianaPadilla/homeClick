import { useState } from "react";

export const usePropertyImages = (initialImages = []) => {
    const [images, setImages] = useState(initialImages);

    const handleRemoveImage = (id) => {
        setImages(images.filter(image => image.id !== id));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImage = {
                id: Date.now(),
                name: "Imagen casa 1",
                file: file
            };
            setImages([...images, newImage]);
        }
    };

    return {
        images,
        setImages,
        handleRemoveImage,
        handleImageUpload
    };
};