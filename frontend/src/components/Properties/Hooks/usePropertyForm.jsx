import { useForm } from "react-hook-form";

export const usePropertyForm = (initialData = {}) => {
    const getNumericValue = (value) => {
        if (value === "" || value === null || value === undefined) return "";
        if (typeof value === "number") return value;
        const numValue = parseInt(value);
        return isNaN(numValue) ? "" : numValue;
    };

    const getCategoryId = (categoryData) => {
        if (!categoryData) return "";

        console.log('getCategoryId - Input:', categoryData);
        console.log('getCategoryId - Type:', typeof categoryData);

        // Si ya es un string (ObjectId), devolverlo directamente
        if (typeof categoryData === 'string') {
            console.log('getCategoryId - String found:', categoryData);
            return categoryData;
        }

        // Si es un objeto con _id
        if (categoryData._id) {
            console.log('getCategoryId - _id found:', categoryData._id);
            console.log('getCategoryId - _id type:', typeof categoryData._id);
            
            if (typeof categoryData._id === 'object' && categoryData._id.$oid) {
                console.log('getCategoryId - $oid found:', categoryData._id.$oid);
                return categoryData._id.$oid;
            } else if (typeof categoryData._id === 'string') {
                console.log('getCategoryId - _id as string:', categoryData._id);
                return categoryData._id;
            }
        }

        // Si tiene propiedad id
        if (categoryData.id) {
            console.log('getCategoryId - id found:', categoryData.id);
            return categoryData.id;
        }

        console.log('getCategoryId - No valid ID found, returning empty string');
        return "";
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
            name: initialData.originalName || initialData.name || "",
            bedrooms: getNumericValue(initialData.rooms),
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
            price: initialData.originalPrice || (typeof initialData.price === 'string' ? initialData.price.replace(/[$,]/g, '') : initialData.price) || "",
            // CAMBIO: category -> categoryId
            categoryId: getCategoryId(initialData.category || initialData.categoryId)
        }
    });

    const validationRules = {
        name: {
            required: "El nombre de la propiedad es requerido",
            minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres"
            },
            maxLength: {
                value: 100,
                message: "El nombre no puede exceder los 100 caracteres"
            }
        },
        location: {
            required: "La ubicación es requerida",
            minLength: {
                value: 5,
                message: "La ubicación debe tener al menos 5 caracteres"
            }
        },
        description: {
            required: "La descripción es requerida",
            minLength: {
                value: 20,
                message: "La descripción debe tener al menos 20 caracteres"
            },
            maxLength: {
                value: 1000,
                message: "La descripción no puede exceder los 1000 caracteres"
            }
        },
        price: {
            required: "El precio es requerido",
            pattern: {
                value: /^[\d,.$\s]+$/,
                message: "Formato de precio inválido"
            },
            validate: (value) => {
                const numericPrice = parseFloat(value.replace(/[$,\s]/g, ''));
                if (isNaN(numericPrice) || numericPrice <= 0) {
                    return "El precio debe ser un número mayor a 0";
                }
                if (numericPrice > 10000000) {
                    return "El precio no puede exceder los $10,000,000";
                }
                return true;
            }
        },
        // CAMBIO: category -> categoryId
        categoryId: {
            required: "La categoría es requerida",
            validate: (value) => {
                console.log('CategoryId validation - Value:', value);
                if (!value || value === '') {
                    return "La categoría es requerida";
                }
                // Validar que sea un ObjectId válido (24 caracteres hexadecimales)
                if (!/^[0-9a-fA-F]{24}$/.test(value)) {
                    return "La categoría seleccionada no es válida";
                }
                return true;
            }
        },
        bedrooms: {
            validate: (value) => {
                if (value === "" || value === null) return true;
                const num = parseInt(value);
                if (isNaN(num) || num < 0) {
                    return "El número de habitaciones debe ser un número válido";
                }
                if (num > 20) {
                    return "El número de habitaciones no puede exceder 20";
                }
                return true;
            }
        },
        bathrooms: {
            validate: (value) => {
                if (value === "" || value === null) return true;
                const num = parseInt(value);
                if (isNaN(num) || num < 0) {
                    return "El número de baños debe ser un número válido";
                }
                if (num > 10) {
                    return "El número de baños no puede exceder 10";
                }
                return true;
            }
        },
        floors: {
            validate: (value) => {
                if (value === "" || value === null) return true;
                const num = parseInt(value);
                if (isNaN(num) || num < 1) {
                    return "El número de niveles debe ser al menos 1";
                }
                if (num > 50) {
                    return "El número de niveles no puede exceder 50";
                }
                return true;
            }
        },
        constructionYear: {
            validate: (value) => {
                if (value === "" || value === null) return true;
                const num = parseInt(value);
                const currentYear = new Date().getFullYear();
                if (isNaN(num)) {
                    return "El año de construcción debe ser un número válido";
                }
                if (num < 1800) {
                    return "El año de construcción no puede ser anterior a 1800";
                }
                if (num > currentYear + 5) {
                    return `El año de construcción no puede ser posterior a ${currentYear + 5}`;
                }
                return true;
            }
        },
        lotSize: {
            validate: (value) => {
                if (!value || value.trim() === "") return true;
                const pattern = /^\d+(\.\d+)?\s*(m²|m2|metros?²?)?$/i;
                if (!pattern.test(value.trim())) {
                    return "Formato inválido. Ejemplo: 200m² o 200";
                }
                return true;
            }
        },
        height: {
            validate: (value) => {
                if (!value || value.trim() === "") return true;
                const pattern = /^\d+(\.\d+)?\s*(m|metros?)?$/i;
                if (!pattern.test(value.trim())) {
                    return "Formato inválido. Ejemplo: 2.5m o 2.5";
                }
                return true;
            }
        }
    };

    const handleCustomChange = (fieldName, value) => {
        let processedValue = value;

        if (fieldName === 'price') {
            processedValue = value.replace(/[^\d.,$ ]/g, '');
        } else if (fieldName === 'bedrooms' || fieldName === 'bathrooms' || fieldName === 'floors') {
            if (value === '' || value === null || value === undefined) {
                processedValue = '';
            } else {
                const numValue = parseInt(value);
                processedValue = isNaN(numValue) ? '' : numValue;
            }
        } else if (fieldName === 'constructionYear') {
            if (value === '' || value === null || value === undefined) {
                processedValue = '';
            } else {
                const numValue = parseInt(value);
                processedValue = isNaN(numValue) ? '' : numValue;
            }
        }

        setValue(fieldName, processedValue);
    };

    const resetForm = () => {
        reset({
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
            categoryId: "" // CAMBIO: category -> categoryId
        });
    };

    const prepareDataForSubmit = (data) => {
        console.log('prepareDataForSubmit - Input data:', data);
        console.log('prepareDataForSubmit - CategoryId:', data.categoryId);
        
        const preparedData = {
            ...data,
            rooms: data.bedrooms === "" ? null : Number(data.bedrooms),
            bathrooms: data.bathrooms === "" ? null : Number(data.bathrooms),
            floors: data.floors === "" ? null : Number(data.floors),
            constructionYear: data.constructionYear === "" ? null : Number(data.constructionYear),
            parkingLot: data.parking === "Sí",
            patio: data.patio === "Sí",
            bedrooms: undefined
            // categoryId se mantiene tal como está
        };
        
        console.log('prepareDataForSubmit - Output data:', preparedData);
        console.log('prepareDataForSubmit - Final categoryId:', preparedData.categoryId);
        
        return preparedData;
    };

    const getFieldError = (fieldName) => {
        return errors[fieldName]?.message || null;
    };

    const hasFieldError = (fieldName) => {
        return !!errors[fieldName];
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        reset,
        resetForm,
        watch,
        setValue,
        getValues,
        validationRules,
        handleCustomChange,
        prepareDataForSubmit,
        getFieldError,
        hasFieldError
    };
};