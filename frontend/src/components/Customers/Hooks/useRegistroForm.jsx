import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const useRegistroForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
        trigger
    } = useForm({
        mode: "onChange", 
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            password: "",
            dui: "",
            email: "",
            birthDay: "",
            birthMonth: "",
            birthYear: "",
            termsAccepted: false
        }
    });

    const watchedPassword = watch("password", "");

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

    const validationRules = {
        firstName: {
            required: "El nombre es requerido",
            minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres"
            },
            pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "El nombre solo puede contener letras"
            }
        },
        lastName: {
            required: "Los apellidos son requeridos",
            minLength: {
                value: 2,
                message: "Los apellidos deben tener al menos 2 caracteres"
            },
            pattern: {
                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                message: "Los apellidos solo pueden contener letras"
            }
        },
        phone: {
            required: "El teléfono es requerido",
            pattern: {
                value: /^[0-9]{4}-[0-9]{4}$/,
                message: "El teléfono debe tener el formato 1334-4716"
            }
        },
        address: {
            required: "La dirección es requerida",
            minLength: {
                value: 10,
                message: "La dirección debe tener al menos 10 caracteres"
            }
        },
        password: {
            required: "La contraseña es requerida",
            validate: (value) => {
                const validation = validatePassword(value);
                return validation.isValid || "La contraseña no cumple con los requisitos";
            }
        },
        dui: {
            required: "El DUI es requerido",
            pattern: {
                value: /^\d{8}-\d$/,
                message: "El DUI debe tener el formato 12345678-9"
            }
        },
        email: {
            required: "El correo electrónico es requerido",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El formato del correo electrónico es inválido"
            }
        },
        birthDay: {
            required: "El día de nacimiento es requerido",
            min: {
                value: 1,
                message: "Día inválido"
            },
            max: {
                value: 31,
                message: "Día inválido"
            }
        },
        birthMonth: {
            required: "El mes de nacimiento es requerido",
            min: {
                value: 1,
                message: "Mes inválido"
            },
            max: {
                value: 12,
                message: "Mes inválido"
            }
        },
        birthYear: {
            required: "El año de nacimiento es requerido",
            min: {
                value: 1924,
                message: "Año inválido"
            },
            max: {
                value: new Date().getFullYear() - 18,
                message: "Debe ser mayor de 18 años"
            }
        },
        termsAccepted: {
            required: "Debe aceptar los términos y condiciones"
        }
    };

    const resetForm = () => {
        reset();
        setMessage('');
    };

    const submitForm = async (data) => {
        setIsLoading(true);
        setMessage("");

        try {
            // Construir la fecha de nacimiento
            const birthDateString = `${data.birthYear}-${data.birthMonth.toString().padStart(2, '0')}-${data.birthDay.toString().padStart(2, '0')}`;

            // Preparar los datos para enviar
            const formDataToSend = {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                address: data.address,
                password: data.password,
                dui: data.dui,
                email: data.email,
                birthDate: birthDateString
            };

            const response = await fetch("http://localhost:4000/api/registerCustomers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formDataToSend),
            });

            const responseData = await response.json();

            if (response.ok) {
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                resetForm();
                // navigate("/inicio-sesion"); // Descomenta si quieres redirigir automáticamente
            } else {
                setMessage(responseData.message || "Error en el registro");
            }
        } catch (error) {
            console.error("Error: ", error);
            setMessage("Error de conexión. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(submitForm),
        errors,
        isLoading,
        message,
        resetForm,
        validatePassword,
        watchedPassword,
        setValue,
        trigger,
        validationRules
    };
};

export default useRegistroForm;