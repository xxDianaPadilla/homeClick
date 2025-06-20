import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, propertyName }) => {
    if (!isOpen) return null;

    // Función para manejar el clic en el fondo del modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Función para manejar "Sí, seguir comprando"
    const handleContinueShopping = () => {
        onConfirm(true); // true = seguir comprando
        onClose();
    };

    // Función para manejar "No, ir al carrito"
    const handleGoToCart = () => {
        onConfirm(false); // false = ir al carrito
        onClose();
    };

    return (
        <div 
            className="modal-overlay"
            onClick={handleBackdropClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
        >
            <div 
                className="modal-content"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    maxWidth: '400px',
                    width: '90%',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    animation: 'modalSlideIn 0.3s ease-out'
                }}
            >
                {/* Encabezado del modal */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#333', 
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>
                        ¡Propiedad agregada!
                    </h3>
                    <p style={{ 
                        margin: '0', 
                        color: '#666', 
                        fontSize: '14px',
                        lineHeight: '1.4'
                    }}>
                        "{propertyName}" se ha agregado a tu carrito exitosamente.
                    </p>
                </div>

                {/* Icono de éxito */}
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '24px' 
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        fontSize: '24px'
                    }}>
                        ✓
                    </div>
                </div>

                {/* Pregunta principal */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <p style={{ 
                        margin: '0', 
                        color: '#333', 
                        fontSize: '16px',
                        fontWeight: '500'
                    }}>
                        ¿Deseas seguir comprando?
                    </p>
                </div>

                {/* Botones de acción */}
                <div style={{ 
                    display: 'flex', 
                    gap: '12px',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={handleContinueShopping}
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Sí, seguir comprando
                    </button>
                    <button
                        onClick={handleGoToCart}
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                    >
                        No, ir al carrito
                    </button>
                </div>

                {/* Botón de cerrar (X) */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        color: '#999',
                        cursor: 'pointer',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f5f5f5';
                        e.target.style.color = '#333';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#999';
                    }}
                >
                    ×
                </button>
            </div>

            {/* Estilos CSS en línea para la animación */}
            <style jsx>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default ConfirmationModal;