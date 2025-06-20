import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Importar para acceder al usuario actual

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    
    // Obtener datos del usuario autenticado
    const { user, isAuthenticated } = useAuth();

    // Función para obtener la clave del carrito específica del usuario
    const getCartKey = () => {
        if (!user || !user.id) return 'guest_cart';
        return `cart_user_${user.id}`;
    };

    // Función para cargar el carrito desde localStorage específico del usuario
    const loadCartFromStorage = () => {
        if (!isAuthenticated || !user) {
            setCartItems([]);
            return;
        }

        try {
            const cartKey = getCartKey();
            const savedCart = localStorage.getItem(cartKey);
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                console.log(`Cargando carrito para usuario ${user.id}:`, parsedCart);
                setCartItems(parsedCart);
            } else {
                console.log(`No hay carrito guardado para usuario ${user.id}`);
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error cargando carrito del localStorage:', error);
            setCartItems([]);
        }
    };

    // Función para guardar el carrito en localStorage específico del usuario
    const saveCartToStorage = (items) => {
        if (!isAuthenticated || !user) return;
        
        try {
            const cartKey = getCartKey();
            console.log(`Guardando carrito para usuario ${user.id}:`, items);
            localStorage.setItem(cartKey, JSON.stringify(items));
        } catch (error) {
            console.error('Error guardando carrito en localStorage:', error);
        }
    };

    // Cargar carrito cuando cambie el usuario o cuando se monte el componente
    useEffect(() => {
        if (isAuthenticated && user) {
            loadCartFromStorage();
        } else {
            // Si el usuario no está autenticado, limpiar el carrito
            setCartItems([]);
        }
    }, [user, isAuthenticated]);

    // Guardar carrito cada vez que cambien los items
    useEffect(() => {
        if (isAuthenticated && user && cartItems.length >= 0) {
            saveCartToStorage(cartItems);
        }
    }, [cartItems, user, isAuthenticated]);

    // Función para agregar un item al carrito
    const addToCart = (property) => {
        if (!isAuthenticated || !user) {
            console.warn('Usuario no autenticado, no se puede agregar al carrito');
            return;
        }

        // Verificar si la propiedad ya está en el carrito
        const existingItem = cartItems.find(item => item.id === property.id);
        
        if (existingItem) {
            // Si ya existe, incrementar la cantidad
            const updatedItems = cartItems.map(item =>
                item.id === property.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedItems);
        } else {
            // Si no existe, agregarlo con cantidad 1
            const newItem = {
                id: property.id,
                title: property.name,
                price: parseFloat(property.originalPrice || property.price.replace(/[^0-9.-]+/g, "")),
                description: property.description,
                image: property.thumbnails && property.thumbnails.length > 0 
                    ? property.thumbnails[0] 
                    : '/default-house.png',
                area: property.lotSize || 'No especificado',
                bedrooms: property.rooms || 0,
                bathrooms: property.bathrooms || 0,
                quantity: 1,
                showContactAgent: false, // Para mostrar el ícono de eliminar en lugar del agente
                userId: user.id // Agregar ID del usuario para referencia
            };
            
            const updatedItems = [...cartItems, newItem];
            setCartItems(updatedItems);
        }
    };

    // Función para remover un item del carrito
    const removeFromCart = (id) => {
        if (!isAuthenticated || !user) return;
        
        const updatedItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedItems);
    };

    // Función para actualizar la cantidad de un item
    const updateQuantity = (id, quantity) => {
        if (!isAuthenticated || !user) return;
        
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        
        const updatedItems = cartItems.map(item =>
            item.id === id
                ? { ...item, quantity }
                : item
        );
        setCartItems(updatedItems);
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        if (!isAuthenticated || !user) return;
        
        setCartItems([]);
        // También limpiar del localStorage
        try {
            const cartKey = getCartKey();
            localStorage.removeItem(cartKey);
            console.log(`Carrito limpiado para usuario ${user.id}`);
        } catch (error) {
            console.error('Error limpiando carrito del localStorage:', error);
        }
    };

    // Calcular el total cada vez que cambien los items del carrito
    useEffect(() => {
        const newTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);

    // Obtener la cantidad total de items en el carrito
    const getCartItemsCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    // Verificar si una propiedad está en el carrito
    const isInCart = (propertyId) => {
        return cartItems.some(item => item.id === propertyId);
    };

    const contextValue = {
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        isInCart,
        currentUserId: user?.id || null // Exponer el ID del usuario actual
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};