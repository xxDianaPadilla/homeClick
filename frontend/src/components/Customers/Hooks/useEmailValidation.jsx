import { useState, useCallback } from 'react';

const useEmailValidation = () => {
    const [emailValidation, setEmailValidation] = useState({
        isChecking: false,    // Si está verificando el email actualmente
        isDuplicate: false,   // Si el email ya existe
        error: null,          // Error en la validación
        checkedEmail: null    // Último email verificado
    });

    /**
     * Función para verificar si un email ya existe en la base de datos
     * @param {string} email - Email a verificar
     * @returns {Promise<boolean>} - true si el email ya existe, false si está disponible
     */
    const checkEmailExists = useCallback(async (email) => {
        // Si no hay email o es el mismo que ya verificamos, no hacer nada
        if (!email || !email.trim() || email === emailValidation.checkedEmail) {
            return emailValidation.isDuplicate;
        }

        // Validar formato básico de email antes de hacer la consulta
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false; // No validar emails con formato incorrecto
        }

        setEmailValidation(prev => ({
            ...prev,
            isChecking: true,
            error: null
        }));

        try {
            // Hacer petición al backend para verificar si el email existe
            const response = await fetch(`http://localhost:4000/api/customers?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                const customers = await response.json();
                // Verificar si algún customer tiene este email
                const emailExists = customers.some(customer => 
                    customer.email && customer.email.toLowerCase() === email.toLowerCase()
                );

                setEmailValidation({
                    isChecking: false,
                    isDuplicate: emailExists,
                    error: null,
                    checkedEmail: email
                });

                return emailExists;
            } else {
                // Si hay error en la respuesta, asumir que el email está disponible
                setEmailValidation({
                    isChecking: false,
                    isDuplicate: false,
                    error: 'Error al verificar el email',
                    checkedEmail: email
                });
                return false;
            }
        } catch (error) {
            console.error('Error checking email:', error);
            
            // En caso de error de red, asumir que el email está disponible
            setEmailValidation({
                isChecking: false,
                isDuplicate: false,
                error: 'Error de conexión al verificar el email',
                checkedEmail: email
            });
            
            return false;
        }
    }, [emailValidation.checkedEmail, emailValidation.isDuplicate]);

    /**
     * Función para limpiar el estado de validación del email
     * Útil cuando se cambia el email o se resetea el formulario
     */
    const clearEmailValidation = useCallback(() => {
        setEmailValidation({
            isChecking: false,
            isDuplicate: false,
            error: null,
            checkedEmail: null
        });
    }, []);

    /**
     * Función para obtener el mensaje de error apropiado
     * @returns {string|null} - Mensaje de error o null si no hay error
     */
    const getEmailError = useCallback(() => {
        if (emailValidation.isDuplicate) {
            return 'Este correo electrónico ya está registrado';
        }
        if (emailValidation.error) {
            return emailValidation.error;
        }
        return null;
    }, [emailValidation.isDuplicate, emailValidation.error]);

    return {
        emailValidation,
        checkEmailExists,
        clearEmailValidation,
        getEmailError,
        // Estados derivados para fácil acceso
        isCheckingEmail: emailValidation.isChecking,
        isEmailDuplicate: emailValidation.isDuplicate,
        emailError: getEmailError()
    };
};

export default useEmailValidation;