import React from "react";

const usePasswordToggle = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return {
        showPassword,
        togglePasswordVisibility
    };
};

export default usePasswordToggle;