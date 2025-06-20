import React, { useEffect } from "react";

const AlertMessage = ({ 
    type = "info", 
    message, 
    isVisible, 
    onClose, 
    autoClose = true, 
    duration = 4000,
    icon 
}) => {
    useEffect(() => {
        if (isVisible && autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, autoClose, duration, onClose]);

    if (!isVisible) return null;

    const getAlertStyles = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#d4edda',
                    borderColor: '#c3e6cb',
                    color: '#155724',
                    iconColor: '#28a745'
                };
            case 'error':
                return {
                    backgroundColor: '#f8d7da',
                    borderColor: '#f5c6cb',
                    color: '#721c24',
                    iconColor: '#dc3545'
                };
            case 'warning':
                return {
                    backgroundColor: '#fff3cd',
                    borderColor: '#ffeaa7',
                    color: '#856404',
                    iconColor: '#ffc107'
                };
            case 'info':
                return {
                    backgroundColor: '#d1ecf1',
                    borderColor: '#bee5eb',
                    color: '#0c5460',
                    iconColor: '#17a2b8'
                };
            default:
                return {
                    backgroundColor: '#e2e3e5',
                    borderColor: '#d6d8db',
                    color: '#383d41',
                    iconColor: '#6c757d'
                };
        }
    };

    const styles = getAlertStyles();

    const getDefaultIcon = () => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✗';
            case 'warning':
                return '⚠';
            case 'info':
                return 'ℹ';
            default:
                return '●';
        }
    };

    return (
        <div 
            className="alert-overlay"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                animation: 'slideInRight 0.3s ease-out',
                maxWidth: '400px'
            }}
        >
            <div 
                className="alert-container"
                style={{
                    backgroundColor: styles.backgroundColor,
                    border: `1px solid ${styles.borderColor}`,
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    position: 'relative'
                }}
            >
                {/* Icono */}
                <div 
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: styles.iconColor,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        flexShrink: 0
                    }}
                >
                    {icon || getDefaultIcon()}
                </div>

                {/* Contenido */}
                <div style={{ flex: 1, color: styles.color }}>
                    <p style={{ 
                        margin: 0, 
                        fontSize: '14px', 
                        lineHeight: '1.4',
                        fontWeight: '500'
                    }}>
                        {message}
                    </p>
                </div>

                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: styles.color,
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: 1,
                        padding: '0',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.7,
                        transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = 1}
                    onMouseLeave={(e) => e.target.style.opacity = 0.7}
                >
                    ×
                </button>

                {/* Barra de progreso */}
                {autoClose && (
                    <div 
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: '0 0 8px 8px',
                            overflow: 'hidden'
                        }}
                    >
                        <div 
                            style={{
                                height: '100%',
                                backgroundColor: styles.iconColor,
                                animation: `shrinkProgress ${duration}ms linear forwards`
                            }}
                        />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes shrinkProgress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    );
};

export default AlertMessage;