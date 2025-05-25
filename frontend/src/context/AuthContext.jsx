import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getTokenFromCookies = () => {
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
        return authCookie ? authCookie.split('=')[1] : null;
    };

    const decodeToken = (token) => {
        try {
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            return JSON.parse(decodedPayload);
        } catch (error) {
            console.error('Error decoding token: ', error);
            return null;
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        try {
            const token = getTokenFromCookies();
            if (token) {
                const decodedToken = decodeToken(token);
                if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                    setUser({
                        id: decodedToken.id,
                        userType: decodedToken.userType
                    });
                    setIsAuthenticated(true);
                } else {
                    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();

            if (data.message === "login successful") {
                setTimeout(() => {
                    const token = getTokenFromCookies();
                    if (token) {
                        const decodedToken = decodeToken(token);
                        setUser({
                            id: decodedToken.id,
                            userType: decodedToken.userType
                        });
                        setIsAuthenticated(true);
                    }
                }, 100);

                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error: ', error);
            return { success: false, message: 'Error de conexión' };
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            setUser(null);
            setIsAuthenticated(false);

            if (response.ok) {
                console.log('Sesión cerrada correctamente en el servidor');
                return { success: true };
            } else {
                console.warn('Error al cerrar sesión en el servidor, pero estado local limpiado');
                return { success: false, error: 'Error en el servidor' };
            }
        } catch (error) {
            console.error('Error de red al cerrar sesión:', error);
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            setUser(null);
            setIsAuthenticated(false);
            return { success: false, error: 'Error de conexión' };
        }
    };

    const contextValue = {
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};