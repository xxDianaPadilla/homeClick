import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const useLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if(errors[name]){
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if(!formData.email.trim()){
            newErrors.email = 'El correo electrónico es requerido';
        }else if (!/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = 'El correo electrónico no es válido';
        }

        if(!formData.password.trim()){
            newErrors.password = 'La contraseña es requerida';
        }else if(formData.password.length < 6){ 
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        setIsLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if(result.success){
                setTimeout(() => {
                    const cookies = document.cookie.split(';');
                    const authCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));

                    if(authCookie){
                        const token = authCookie.split('=')[1];
                        const payload = token.split('.')[1];
                        const decodedPayload = JSON.parse(atob(payload));

                        if(decodedPayload.userType === 'admin'){
                            navigate('/dashboard');
                        }else{
                            navigate('/landingPage');
                        }
                    }
                }, 200);
            }else{
                let errorMessage = 'Error en el inicio de sesión';
                if(result.message === 'user not found'){
                    errorMessage = 'Usuario no encontrado';
                }else if (result.message === 'Invalid password'){
                    errorMessage = 'Contraseña incorrecta';
                }

                setErrors({general: errorMessage});
            }
        } catch (error) {
            console.error('Error en login: ', error);
            setErrors({general: 'Error de conexión. Intente nuevamente'});
        }finally{
            setIsLoading(false);
        }
    };

    return{
        formData,
        errors,
        isLoading,
        handleInputChange,
        handleSubmit
    };
};

export default useLoginForm;