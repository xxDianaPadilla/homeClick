import React from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    icon,
    disabled = false,
    isLoading = false,
    loadingMessage,
    className = "",
    variant = "add"
}) => {
    if (!isOpen) return null;

    const modalClass = variant === "edit" ? "edit-property-modal" : "add-property-modal";
    const overlayClass = variant === "edit" ? "edit-property-modal-overlay" : "add-property-modal-overlay";
    const headerClass = variant === "edit" ? "edit-property-header" : "add-property-header";
    const contentClass = variant === "edit" ? "edit-property-content" : "add-property-content";

    return (
        <div className={`${overlayClass} ${className}`}>
            <div className={modalClass}>
                {isLoading && (
                    <div className="loading-overlay" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ marginBottom: '1rem' }}>Cargando...</div>
                            <div>{loadingMessage}</div>
                        </div>
                    </div>
                )}

                <div className={headerClass}>
                    <h2>{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        disabled={disabled}
                    >
                        <img src={icon} alt="Cerrar" />
                    </button>
                </div>
                <div className={contentClass}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;