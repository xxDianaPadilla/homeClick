import React from "react";
import { useNavigate } from "react-router-dom";

const useRegistroForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        dui: "",
        email: "",
        budget: 0
    });

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: ''
        });
        setErrors({});
        setMessage('');
    };

    const [errors, setErrors] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            minLength,
            hasUppercase,
            hasNumber,
            hasSpecialChar,
            isValid: minLength && hasUppercase && hasNumber && hasSpecialChar
        };
    };

    const validateForm = (data, birthDate, termsAccepted) => {
        const newErrors = {};

        if (!data.firstName.trim()) newErrors.firstName = "El nombre es requerido";
        if (!data.lastName.trim()) newErrors.lastName = "Los apellidos son requeridos";
        if (!data.phone.trim()) newErrors.phone = "El teléfono es requerido";
        if (!data.address.trim()) newErrors.address = "La dirección es requerida";
        if (!data.dui.trim()) newErrors.dui = "El DUI es requerido";
        if (!data.email.trim()) newErrors.email = "El correo electrónico es requerido";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            newErrors.email = "El formato del correo eletrónico es inválido";
        }

        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
            newErrors.password = "La contraseña no cumple con los requisitos";
        }

        if (!birthDate.day || !birthDate.month || !birthDate.year) {
            newErrors.birthDate = "La fecha de nacimiento es requerida";
        }

        if (!termsAccepted) {
            newErrors.terms = "Debe aceptar los términos y condiciones";
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const submitForm = async (birthDate, termsAccepted) => {
        const validationErrors = validateForm(formData, birthDate, termsAccepted);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setMessage("Por favor, corrija los errores en el formulario");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const birthDateString = `${birthDate.year}-${birthDate.month.toString().padStart(2, '0')}-${birthDate.day.toString().padStart(2, '0')}`;

            const response = await fetch("http://localhost:4000/api/registerCustomers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    birthDate: birthDateString
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                resetForm();
            } else {
                setMessage(data.message || "Error en el registro");
            }
        } catch (error) {
            console.error("Error: ", error);
            setMessage("Error de conexión. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        message,
        handleInputChange,
        submitForm,
        validateForm,
        resetForm
    };
};

export default useRegistroForm;