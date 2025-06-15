import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const useProperties = (categoryId = null, propertyType = null) => {
    const API = "http://localhost:4000/api/properties";
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            setLoading(true);
            setError(null);
            let url = API;

            if (categoryId) {
                url = `${API}/category/${categoryId}`;
            }
            else if (propertyType) {
                url = `${API}?propertyType=${encodeURIComponent(propertyType)}`;
            }

            console.log('Fetching from URL:', url); 

            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    const errorData = await response.json();
                    setProperties([]);
                    setError(null); 
                    console.log(errorData.message);
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            } else {
                const data = await response.json();
                
                if (data.data) {
                    setProperties(data.data);
                    console.log(`${data.message} (${data.count} propiedades)`);
                } else {
                    setProperties(data); 
                }
            }

        } catch (err) {
            console.error('Error fetching properties:', err);
            setError(err.message);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [categoryId, propertyType]);

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
        propertyForm,
        setPropertyForm,
        createProperty,
        updateProperty,
        deleteProperty,
        handleInputChange,
        refetchProperties: fetchProperties 
    };

}

export default useProperties;