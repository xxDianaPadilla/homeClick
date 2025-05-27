import { useState } from "react";

export const usePropertyForm = (initialData = {}) => {
    // Función helper para convertir valores numéricos
    const getNumericValue = (value) => {
        if (value === "" || value === null || value === undefined) return "";
        if (typeof value === "number") return value;
        const numValue = parseInt(value);
        return isNaN(numValue) ? "" : numValue;
    };

    const [formData, setFormData] = useState({
        // Usar datos originales si están disponibles, sino usar los procesados
        name: initialData.originalName || initialData.name || "",
        bedrooms: getNumericValue(initialData.rooms), // Usar 'rooms' del esquema
        bathrooms: getNumericValue(initialData.bathrooms),
        parking: initialData.parkingLot !== undefined ? (initialData.parkingLot ? "Sí" : "No") : "",
        patio: initialData.patio !== undefined ? (initialData.patio ? "Sí" : "No") : "",
        floors: getNumericValue(initialData.floors),
        constructionYear: initialData.constructionYear || "",
        location: initialData.originalLocation || initialData.location || "",
        address: initialData.address || "",
        lotSize: initialData.lotSize || "",
        height: initialData.height || "",
        description: initialData.originalDescription || initialData.description || "",
        price: initialData.originalPrice || (typeof initialData.price === 'string' ? initialData.price.replace(/[$,]/g, '') : initialData.price) || ""
        // categoryId removido como solicitaste
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let processedValue = value;
        
        if (name === 'parking' || name === 'patio') {
            processedValue = value;
        } else if (name === 'bedrooms' || name === 'bathrooms' || name === 'floors') {
            // Solo convertir a número si el valor no está vacío
            if (value === '' || value === null || value === undefined) {
                processedValue = '';
            } else {
                const numValue = parseInt(value);
                processedValue = isNaN(numValue) ? '' : numValue;
            }
        } else if (name === 'price') {
            processedValue = value.replace(/[^\d.,]/g, '');
        } else if (name === 'constructionYear') {
            if (value === '' || value === null || value === undefined) {
                processedValue = '';
            } else {
                const numValue = parseInt(value);
                processedValue = isNaN(numValue) ? '' : numValue;
            }
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
            price: ""
            // categoryId removido
        });
    };

    const prepareDataForSubmit = () => {
        return {
            ...formData,
            rooms: formData.bedrooms === "" ? null : Number(formData.bedrooms),
            bathrooms: formData.bathrooms === "" ? null : Number(formData.bathrooms),
            floors: formData.floors === "" ? null : Number(formData.floors),
            constructionYear: formData.constructionYear === "" ? null : Number(formData.constructionYear),
            parkingLot: formData.parking === "Sí",
            patio: formData.patio === "Sí",
            // Remover bedrooms ya que en el esquema es 'rooms'
            bedrooms: undefined
        };
    };

    return {
        formData,
        setFormData,
        handleChange,
        resetForm,
        prepareDataForSubmit
    };
};