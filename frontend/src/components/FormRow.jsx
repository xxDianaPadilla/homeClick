import React from "react";

const FormRow = ({
    children,
    fullWidth = false,
    className = ""
}) => {
    return (
        <div className={`form-row ${fullWidth ? 'full-width' : ''} ${className}`}>
            {children}
        </div>
    );
};

export default FormRow;