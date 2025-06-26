import { useState } from "react";

const useEmailVerification = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Función para enviar código de verificación
    const sendVerificationCode = async (email, firstName) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("http://localhost:4000/api/email-verification/send-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, firstName }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                return { success: true, message: data.message };
            } else {
                setError(data.message || "Error al enviar el código");
                return { success: false, message: data.message };
            }
        } catch (error) {
            const errorMessage = "Error de conexión. Intenta nuevamente.";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función para verificar el código
    const verifyCode = async (verificationCode) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("http://localhost:4000/api/email-verification/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ verificationCode }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                return { success: true, message: data.message };
            } else {
                setError(data.message || "Código inválido");
                return { success: false, message: data.message };
            }
        } catch (error) {
            const errorMessage = "Error de conexión. Intenta nuevamente.";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Función para verificar si el email está verificado
    const checkEmailVerification = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/email-verification/check-verification", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error("Error checking email verification:", error);
            return false;
        }
    };

    // Función para limpiar mensajes
    const clearMessages = () => {
        setError("");
        setMessage("");
    };

    return {
        loading,
        error,
        message,
        sendVerificationCode,
        verifyCode,
        checkEmailVerification,
        clearMessages
    };
};

export default useEmailVerification;