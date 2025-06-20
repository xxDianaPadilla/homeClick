import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePasswordRecovery = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Función para solicitar código de recuperación
    const requestRecoveryCode = async (email) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("http://localhost:4000/api/recovery-password/requestCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Importante para las cookies
                body: JSON.stringify({ email }),
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

    // Función para verificar el código de recuperación
    const verifyRecoveryCode = async (code) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("http://localhost:4000/api/recovery-password/verifyCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Importante para las cookies
                body: JSON.stringify({ code }),
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

    // Función para cambiar la contraseña
    const updatePassword = async (newPassword) => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("http://localhost:4000/api/recovery-password/newPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Importante para las cookies
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                return { success: true, message: data.message };
            } else {
                setError(data.message || "Error al cambiar la contraseña");
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

    // Función para limpiar mensajes
    const clearMessages = () => {
        setError("");
        setMessage("");
    };

    return {
        loading,
        error,
        message,
        requestRecoveryCode,
        verifyRecoveryCode,
        updatePassword,
        clearMessages,
        navigate
    };
};

export default usePasswordRecovery;