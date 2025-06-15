import React from "react";

const FormInput = ({
    type = "text",
    placeholder,
    register,
    name,
    validationRules,
    disabled = false,
    hasError = false,
    errorMessage,
    min,
    rows,
    onChange,
    className = "",
    ...props
}) => {
    const baseClassName = `form-input ${hasError ? 'error' : ''} ${className}`;

    if (type === 'textarea') {
        return (
            <div className="form-group">
                <textarea
                    placeholder={placeholder}
                    {...register(name, validationRules)}
                    rows={rows || 4}
                    disabled={disabled}
                    className={baseClassName}
                    onChange={onChange}
                    {...props}
                />
                {hasError && errorMessage && (
                    <span className="form-error">{errorMessage}</span>
                )}
            </div>
        );
    }

    return (
        <div className="form-group">
            <input
                type={type}
                placeholder={placeholder}
                {...register(name, validationRules)}
                min={min}
                disabled={disabled}
                className={baseClassName}
                onChange={onChange}
                {...props}
            />
            {hasError && errorMessage && (
                <span className="form-error">{errorMessage}</span>
            )}
        </div>
    );
};

export default FormInput;