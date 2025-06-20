import { useState, useRef, useEffect } from "react";

const useCodeVerification = (codeLength = 5) => {
    const [code, setCode] = useState(new Array(codeLength).fill(""));
    const inputRefs = useRef([]);

    // Inicializar refs
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, codeLength);
        for (let i = 0; i < codeLength; i++) {
            if (!inputRefs.current[i]) {
                inputRefs.current[i] = { current: null };
            }
        }
    }, [codeLength]);

    // Enfocar el primer input al montar
    useEffect(() => {
        if (inputRefs.current[0]?.current) {
            inputRefs.current[0].current.focus();
        }
    }, []);

    const handleInputChange = (index, value) => {
        // Solo permitir números
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Mover al siguiente input si se ingresó un dígito
        if (value && index < codeLength - 1) {
            inputRefs.current[index + 1]?.current?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        // Manejar backspace
        if (event.key === 'Backspace') {
            event.preventDefault();
            const newCode = [...code];
            
            if (code[index]) {
                // Si hay un valor, eliminarlo
                newCode[index] = "";
                setCode(newCode);
            } else if (index > 0) {
                // Si no hay valor, mover al anterior y eliminarlo
                newCode[index - 1] = "";
                setCode(newCode);
                inputRefs.current[index - 1]?.current?.focus();
            }
        }
        // Manejar flechas de navegación
        else if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.current?.focus();
        }
        else if (event.key === 'ArrowRight' && index < codeLength - 1) {
            inputRefs.current[index + 1]?.current?.focus();
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text').slice(0, codeLength);
        
        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < pastedData.length && i < codeLength; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        // Enfocar el siguiente input disponible
        const nextIndex = Math.min(pastedData.length, codeLength - 1);
        inputRefs.current[nextIndex]?.current?.focus();
    };

    const getCodeString = () => {
        return code.join("");
    };

    const isCodeComplete = () => {
        return code.every(digit => digit !== "") && code.length === codeLength;
    };

    const clearCode = () => {
        setCode(new Array(codeLength).fill(""));
        inputRefs.current[0]?.current?.focus();
    };

    const setCodeValue = (newCode) => {
        if (typeof newCode === 'string' && newCode.length <= codeLength) {
            const codeArray = newCode.split("").concat(new Array(codeLength - newCode.length).fill(""));
            setCode(codeArray);
        }
    };

    return {
        code,
        inputRefs,
        handleInputChange,
        handleKeyDown,
        handlePaste,
        getCodeString,
        isCodeComplete,
        clearCode,
        setCodeValue
    };
};

export default useCodeVerification;