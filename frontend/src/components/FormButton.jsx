import React from "react";

const FormButton = ({
    type = "button",
    onClick,
    disabled = false,
    isLoading = false,
    loadingText = "Cargando...",
    icon4,
    children,
    className = "",
    variant = "primary",
    ...props
}) => {
    const baseClassName = `form-button ${variant} ${isLoading ? 'loading' : ''} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            className={baseClassName}
            disabled={disabled || isLoading}
            {...props}
        >
            {icon4 && <img src={icon4} alt="" />}
            <span>
                {isLoading ? loadingText : children}
            </span>
        </button>
    );
};

export default FormButton;