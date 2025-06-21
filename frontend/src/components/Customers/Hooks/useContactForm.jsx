import { useState } from "react";
import {toast} from 'react-hot-toast';

const useContactForm = (initialState, onSuccess, propertyName = '') => {

    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(isSubmitting) return;

        try {
            setIsSubmitting(true);

            const emailData = {
                senderName: `${formData.firstName} ${formData.lastName}`,
                senderEmail: formData.email,
                senderPhone: formData.phone,
                message: formData.message,
                subject: propertyName ? `Consulta sobre: ${propertyName}` : 'Mensaje de contacto',
                propertyName: propertyName
            };

            const response = await fetch('http://localhost:4000/api/contact/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(emailData)
            });

            const result = await response.json();

            if(response.ok && result.success){
                toast.success('Mensaje enviado exitosamente al administrador');

                setFormData(prevState => ({
                    ...prevState,
                    message: ''
                }));

                if(onSuccess){
                    onSuccess();
                }
            }else{
                toast.error(result.message || 'Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error sending message: ', error);
            toast.error('Error de conexión. Por favor, inténtalo de nuevo');
        }finally{
            setIsSubmitting(false);
        }
    };

    const updateFormData = (newData) => {
        setFormData(prevState => ({
            ...prevState,
            ...newData
        }));
    };

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSubmit,
        updateFormData
    };
};

export default useContactForm;