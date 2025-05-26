import { useState } from "react";

export const usePropertyForm = (initialData = {}) => {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        bedrooms: initialData.rooms || "",
        bathrooms: initialData.bathrooms || "",
        parking: initialData.parkingLot ? "Sí" : "",
        patio: initialData.patio ? "Sí" : "",
        floors: initialData.floors || "",
        constructionYear: initialData.constructionYear || "",
        location: initialData.location || "",
        lotSize: initialData.lotSize || "",
        height: initialData.height || "",
        description: initialData.description || "",
        price: initialData.price || "",
        categoryId: initialData.categoryId || "",
        ...initialData
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let processedValue = value;
        
        if (name === 'parking' || name === 'patio') {
            processedValue = type === 'checkbox' ? checked : value;
        } else if (name === 'bedrooms' || name === 'bathrooms' || name === 'floors') {
            processedValue = value === '' ? '' : parseInt(value) || 0;
        } else if (name === 'price') {
            processedValue = value.replace(/[^\d.,]/g, '');
        }

        setFormData({
            ...formData,
            [name]: processedValue
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            bedrooms: "",
            bathrooms: "",
            parking: "",
            patio: "",
            floors: "",
            constructionYear: "",
            location: "",
            address: "",
            lotSize: "",
            height: "",
            description: "",
            price: "",
            categoryId: ""
        });
    };

    return {
        formData,
        setFormData,
        handleChange,
        resetForm
    };
};