import { useState, useCallback } from 'react';

const usePasswordRecoveryAlert = () => {
    const [alert, setAlert] = useState({
        type: 'info',
        message: '',
        isVisible: false,
        autoClose: true,
        duration: 4000
    });

    const showAlert = useCallback((type, message, options = {}) => {
        setAlert({
            type,
            message,
            isVisible: true,
            autoClose: options.autoClose !== false,
            duration: options.duration || 4000
        });
    }, []);

    const showSuccess = useCallback((message, options = {}) => {
        showAlert('success', message, options);
    }, [showAlert]);

    const showError = useCallback((message, options = {}) => {
        showAlert('error', message, options);
    }, [showAlert]);

    const showWarning = useCallback((message, options = {}) => {
        showAlert('warning', message, options);
    }, [showAlert]);

    const showInfo = useCallback((message, options = {}) => {
        showAlert('info', message, options);
    }, [showAlert]);

    const hideAlert = useCallback(() => {
        setAlert(prev => ({
            ...prev,
            isVisible: false
        }));
    }, []);

    return {
        alert,
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        hideAlert
    };
};

export default usePasswordRecoveryAlert;