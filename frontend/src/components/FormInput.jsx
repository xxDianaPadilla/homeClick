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
    max,
    rows,
    onChange,
    className = "",
    errorClassName = "form-error",
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
                    <span className={errorClassName}>{errorMessage}</span>
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
                max={max}
                disabled={disabled}
                className={baseClassName}
                onChange={onChange}
                {...props}
            />
            {hasError && errorMessage && (
                <span className={errorClassName}>{errorMessage}</span>
            )}
        </div>
    );
};

export default FormInput;