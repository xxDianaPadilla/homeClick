import { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';

const useCustomerInfo = () => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            console.log('Auth state:', { isAuthenticated, user }); 
            
            if (!isAuthenticated || !user) {
                setLoading(false);
                setCustomerInfo(null);
                return;
            }

            const isCustomer = user.userType === 'Customer' || user.role === 'Customer';
            
            if (!isCustomer) {
                setLoading(false);
                setCustomerInfo(null);
                return;
            }

            try {
                setLoading(true);
                
                const userId = user.id || user._id || user.userId;
                console.log('Fetching customer info for ID:', userId); 
                
                const response = await fetch(`http://localhost:4000/api/customers/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Response status:', response.status); 

                if (response.ok) {
                    const customerData = await response.json();
                    console.log('Customer data received:', customerData); 
                    setCustomerInfo(customerData);
                    setError(null);
                } else {
                    const errorData = await response.json();
                    console.error('API Error:', errorData); 
                    setError(errorData.message || 'Error al obtener información del cliente');
                    setCustomerInfo(null);
                }
            } catch (error) {
                console.error('Error fetching customer info:', error);
                setError('Error de conexión al obtener información del cliente');
                setCustomerInfo(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerInfo();
    }, [user, isAuthenticated]);

    return {
        customerInfo,
        loading,
        error,
        isCustomer: isAuthenticated && user && (user.userType === 'Customer' || user.role === 'Customer')
    };
};

export default useCustomerInfo;