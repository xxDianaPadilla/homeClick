import React from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    icon,
    disabled = false,
    className = ""
}) => {
    if (!isOpen) return null;

    return (
        <div className={`add-property-modal-overlay ${className}`}>
            <div className="add-property-modal">
                <div className="add-property-header">
                    <h2>{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                        disabled={disabled}
                    >
                        <img src={icon} alt="Cerrar" />
                    </button>
                </div>
                <div className="add-property-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;