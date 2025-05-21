import React, {useState, useEffect} from "react";

const useEditAdminCard = (isOpen, onClose, userData) => {
    const [isEditable, setIsEditable] =  useState(false);
    const [formData, setFormData] = useState({
        nombre: userData?.nombre || "Nombre Nombre",
        email: userData?.email || "persona@gmail.com",
        password: "****************"
    });

    useEffect(() => {
        if(userData){
            setFormData({
                nombre: userData.nombre || "Nombre Nombre",
                email: userData.email || "persona@gmail.com",
                password: "****************"
            });
        }
    }, [userData]);

    useEffect(() => {
        if(isOpen){
            setIsEditable(false);
        }
    }, [isOpen]);

    const handleEdit = () => {
        setIsEditable(!isEditable);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return{
        isEditable,
        formData,
        handleEdit,
        handleChange
    };
};

export default useEditAdminCard;