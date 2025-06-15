import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useFetchProperties = () => {
    const API = "http://localhost:4000/api/properties";
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [propertyForm, setPropertyForm] = useState({
        images: [],
        name: "",
        description: "",
        location: "",
        price: "",
        floors: 1,
        lotSize: "",
        height: "",
        constructionYear: "",
        rooms: 1,
        bathrooms: 1,
        parkingLot: false,
        patio: false,
        category: ""
    });

    const fetchProperties = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error("Error fetching properties");
            }
            const data = await response.json();
            setProperties(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchPropertiesByCategory = async (categoryId) => {
        try {
            setLoading(true);
            const response = await fetch(`${API}/category/${categoryId}`);
            if(!response.ok){
                if(response.status === 404){
                    setProperties([]);
                    setLoading(false);
                    return;
                }
                throw new Error("Error fetching properties by category");
            }
            const result = await response.json();

            setProperties(result.data || []);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleCategoryFilter = async (categoryId) => {
        setSelectedCategory(categoryId);
        if(categoryId){
            await fetchPropertiesByCategory(categoryId);
        }else{
            await fetchProperties();
        }
    };

    const clearCategoryFilter = () => {
        setSelectedCategory(null);
        fetchProperties();
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const createProperty = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(propertyForm),
            });
            if (!response.ok) {
                throw new Error("Error creating property");
            }
            await fetchProperties();
            toast.success("Property created successfully");
            resetForm();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const updateProperty = async (id, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(propertyForm),
            });
            if (!response.ok) {
                throw new Error("Error updating property");
            }
            await fetchProperties();
            toast.success("Property updated successfully");
            resetForm();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const deleteProperty = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error deleting property");
            }
            await fetchProperties();
            toast.success("Property deleted successfully");
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    const resetForm = () => {
        setPropertyForm({
            images: [],
            name: "",
            description: "",
            location: "",
            price: "",
            floors: 1,
            lotSize: "",
            height: "",
            constructionYear: "",
            rooms: 1,
            bathrooms: 1,
            parkingLot: false,
            patio: false,
            category: ""
        });
    }
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPropertyForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return {
        properties,
        loading,
        error,
        selectedCategory,
        propertyForm,
        setPropertyForm,
        createProperty,
        updateProperty,
        deleteProperty,
        handleInputChange,
        handleCategoryFilter,
        clearCategoryFilter,
        fetchProperties,
        fetchPropertiesByCategory
    };

}
export default useFetchProperties;