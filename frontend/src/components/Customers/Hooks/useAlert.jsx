import { useState } from "react";

const useAlert = () => {
    const [alert, setAlert] = useState({
        isVisible: false,
        type: 'info',
        message: '',
        autoClose: true,
        duration: 4000
    });

    const showAlert = (message, type = 'info', options = {}) => {
        setAlert({
            isVisible: true,
            type,
            message,
            autoClose: options.autoClose !== false,
            duration: options.duration || 4000
        });
    };

    const hideAlert = () => {
        setAlert(prev => ({
            ...prev,
            isVisible: false
        }));
    };

    const showSuccess = (message, options = {}) => {
        showAlert(message, 'success', options);
    };

    const showError = (message, options = {}) => {
        showAlert(message, 'error', options);
    };

    const showWarning = (message, options = {}) => {
        showAlert(message, 'warning', options);
    };

    const showInfo = (message, options = {}) => {
        showAlert(message, 'info', options);
    };

    return {
        alert,
        showAlert,
        hideAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo
    };
};

export default useAlert;