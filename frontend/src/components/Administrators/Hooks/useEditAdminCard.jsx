import React, {useState, useEffect} from "react";

const useEditAdminCard = (isOpen, onClose, userData) => {
    const [isEditable, setIsEditable] =  useState(false);
    const [formData, setFormData] = useState({
        nombre: userData?.nombreCasa || "Nombre Nombre",
        email: userData?.estado || "pagado",
        password: "****************"
    });

    useEffect(() => {
        if(userData){
            setFormData({
                nombre: userData.nombreCasa || "Nombre Nombre",
                email: userData.estado || "pagado",
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