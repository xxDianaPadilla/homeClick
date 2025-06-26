import React, { useState, useEffect } from "react";
import { X, Mail, Clock, RefreshCw, CheckCircle } from "lucide-react";
import CodeInput from "./CodeInput";
import Timer from "./Timer";
import useEmailVerification from "./Customers/Hooks/useEmailVerification.jsx";
import useCodeVerification from "./Customers/Hooks/useCodeVerification";

const EmailVerificationModal = ({ 
    isOpen, 
    onClose, 
    email, 
    firstName,
    onVerificationSuccess 
}) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
    const [isExpired, setIsExpired] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        loading,
        error,
        message,
        sendVerificationCode,
        verifyCode,
        clearMessages
    } = useEmailVerification();

    const {
        code,
        inputRefs,
        handleInputChange,
        handleKeyDown,
        handlePaste,
        getCodeString,
        isCodeComplete,
        clearCode
    } = useCodeVerification(5);

    // Temporizador de 5 minutos
    useEffect(() => {
        if (!isOpen) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsExpired(true);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen]);

    // Enviar código inicial cuando se abre el modal
    useEffect(() => {
        if (isOpen && email && firstName) {
            handleSendCode();
        }
    }, [isOpen, email, firstName]);

    // Reset cuando se cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setTimeLeft(300);
            setIsExpired(false);
            setCanResend(false);
            setIsSuccess(false);
            clearCode();
            clearMessages();
        }
    }, [isOpen]);

    const handleSendCode = async () => {
        const result = await sendVerificationCode(email, firstName);
        if (result.success) {
            setTimeLeft(300);
            setIsExpired(false);
            setCanResend(false);
            clearCode();
        }
    };

    const handleVerifyCode = async () => {
        if (!isCodeComplete()) return;

        const result = await verifyCode(getCodeString());
        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => {
                onVerificationSuccess();
            }, 2000);
        }
    };

    const handleResendCode = async () => {
        if (!canResend) return;
        await handleSendCode();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                            <Mail size={20} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Verificar Email
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={loading}
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {!isSuccess ? (
                        <>
                            {/* Instruction */}
                            <div className="text-center mb-6">
                                <p className="text-gray-700 mb-2">
                                    Se ha enviado un código de verificación a:
                                </p>
                                <p className="font-semibold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg inline-block">
                                    {email}
                                </p>
                                <p className="text-sm text-gray-600 mt-3">
                                    Ingresa el código de 5 dígitos para continuar con tu registro
                                </p>
                            </div>

                            {/* Timer */}
                            <Timer 
                                timeLeft={timeLeft} 
                                isExpired={isExpired}
                                className="mb-6"
                            />

                            {/* Error/Success Messages */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-700 text-sm text-center">{error}</p>
                                </div>
                            )}

                            {message && !error && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-700 text-sm text-center">{message}</p>
                                </div>
                            )}

                            <br />
                            {/* Code Input */}
                            <div className="mb-6">
                                <CodeInput
                                    code={code}
                                    inputRefs={inputRefs}
                                    onInputChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    onPaste={handlePaste}
                                    disabled={loading || isExpired}
                                    error={!!error}
                                    length={5}
                                />
                            </div>

                            {/* Resend Button */}
                            <div className="text-center mb-6">
                                <button
                                    onClick={handleResendCode}
                                    disabled={!canResend || loading}
                                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        canResend && !loading
                                            ? 'text-orange-600 hover:bg-orange-50 border border-orange-200 hover:border-orange-300'
                                            : 'text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                                    <span>
                                        {loading ? 'Enviando...' : 'Volver a enviar código'}
                                    </span>
                                </button>
                            </div>

                            {/* Verify Button */}
                            <button
                                onClick={handleVerifyCode}
                                disabled={!isCodeComplete() || loading || isExpired}
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                                    isCodeComplete() && !loading && !isExpired
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Verificando...</span>
                                    </div>
                                ) : (
                                    'Verificar Código'
                                )}
                            </button>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                ¡Email Verificado!
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Tu correo electrónico ha sido verificado exitosamente.
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                                <div className="bg-green-500 h-1 rounded-full animate-pulse" style={{width: '100%'}}></div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Completando registro...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationModal;