import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useEmailValidation from "./useEmailValidation"; // Importar el nuevo hook

const useRegistroForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    // Hook para validación de email duplicado
    const { 
        checkEmailExists, 
        clearEmailValidation, 
        isEmailDuplicate, 
        emailError,
        isCheckingEmail 
    } = useEmailValidation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
        trigger,
        setError,
        clearErrors
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
    const watchedEmail = watch("email", "");

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

    // Validaciones actualizadas con verificación de email duplicado
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
            },
            // Validación personalizada para verificar emails duplicados
            validate: async (value) => {
                if (!value || !value.trim()) return true;
                
                // Verificar formato antes de hacer la consulta
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return true;
                
                // Verificar si el email ya existe
                const emailExists = await checkEmailExists(value);
                return !emailExists || "Este correo electrónico ya está registrado";
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
        clearEmailValidation(); // Limpiar validación de email al resetear
    };

    const submitForm = async (data) => {
        setIsLoading(true);
        setMessage("");

        try {
            // Verificación final de email antes del envío
            const emailExists = await checkEmailExists(data.email);
            if (emailExists) {
                setError("email", {
                    type: "validate",
                    message: "Este correo electrónico ya está registrado"
                });
                setIsLoading(false);
                return;
            }

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
                // Manejar errores específicos del backend
                if (responseData.message && responseData.message.includes("already exists")) {
                    setError("email", {
                        type: "validate",
                        message: "Este correo electrónico ya está registrado"
                    });
                } else {
                    setMessage(responseData.message || "Error en el registro");
                }
            }
        } catch (error) {
            console.error("Error: ", error);
            setMessage("Error de conexión. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    // Función para manejar cambios en el email y limpiar validaciones previas
    const handleEmailChange = () => {
        clearErrors("email");
        clearEmailValidation();
    };

    return {
        register,
        handleSubmit: handleSubmit(submitForm),
        errors,
        isLoading: isLoading || isCheckingEmail, // Incluir estado de verificación de email
        message,
        resetForm,
        validatePassword,
        watchedPassword,
        watchedEmail,
        setValue,
        trigger,
        validationRules,
        // Nuevas funciones y estados para email
        handleEmailChange,
        isEmailDuplicate,
        emailError,
        isCheckingEmail
    };
};

export default useRegistroForm;