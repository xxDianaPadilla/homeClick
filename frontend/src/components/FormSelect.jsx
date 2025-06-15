import React from "react";

const FormSelect = ({
    placeholder,
    options = [],
    register,
    name,
    validationRules,
    disabled = false,
    hasError = false,
    errorMessage,
    isLoading = false,
    loadingText = "Cargando...",
    errorText,
    className = "",
    errorClassName = "form-error",
    ...props
}) => {
    return (
        <div className="form-group">
            <select
                {...register(name, validationRules)}
                disabled={disabled || isLoading}
                className={`form-select ${hasError ? 'error' : ''} ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {isLoading ? (
                    <option disabled>{loadingText}</option>
                ) : errorText ? (
                    <option disabled>{errorText}</option>
                ) : (
                    options.map((option) => {
                        const value = option.value || option._id?.$oid || option._id || option.id;
                        const label = option.label || option.propertyType || option.name || option.text;

                        return (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        );
                    })
                )}
            </select>
            {hasError && errorMessage && (
                <span className={errorClassName}>{errorMessage}</span>
            )}
            {errorText && !isLoading && (
                <span className={errorClassName}>{errorText}</span>
            )}
        </div>
    );
};

export default FormSelect;