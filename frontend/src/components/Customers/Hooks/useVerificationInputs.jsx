import React from "react";

const useVerificationInputs = (inputCount = 6) => {
    const inputRefs = Array(inputCount).fill().map(() => React.useRef(null));

    React.useEffect(() => {
        if (inputRefs[0].current) {
            inputRefs[0].current.focus();
        }
    }, []);

    const handleInputChangeA = (index, event) => {
        const { value } = event.target;
        if (value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDownB = (index, event) => {
        if (event.key === 'Backspace' && event.target.value === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    return {
        inputRefs,
        handleInputChangeA,
        handleKeyDownB
    };
};

export default useVerificationInputs;