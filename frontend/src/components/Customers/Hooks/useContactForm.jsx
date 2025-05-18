import { useState } from "react";

const useContactForm = (initialState = {}, onSubmitCallback) => {

    const [showContactForm, setShowContactForm] = useState(false);
    const [formData, setFormData] = useState(initialState);

    // Función para actualizar el estado 'formData' cuando cambia el valor de un campo del formulario
    const handleChange = (e) => {
        // Obtiene el nombre y el valor del elemento que disparó el evento (el input o textarea)
        const { name, value } = e.target;
        // Actualiza el estado 'formData' utilizando la función de actualización de estado
        setFormData(prevState => ({
            // Mantiene los valores anteriores del estado
            ...prevState,
            // Actualiza el valor del campo específico cuyo nombre coincide con 'name'
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        // Previene el comportamiento predeterminado del envío del formulario (recargar la página)
        e.preventDefault();
        // Simula el envío del formulario mostrando los datos en la consola
        console.log('Formulario enviado:', formData);

        if (onSubmitCallback) {
            onSubmitCallback(formData);
        }
    };

    const toggleContactForm = () => {
        setShowContactForm(!showContactForm);
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        showContactForm,
        toggleContactForm
    };
};

export default useContactForm;