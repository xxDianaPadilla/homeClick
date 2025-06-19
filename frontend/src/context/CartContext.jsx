import React, { createContext, useContext, useState, useEffect } from 'react';

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

    // Función para agregar un item al carrito
    const addToCart = (property) => {
        // Verificar si la propiedad ya está en el carrito
        const existingItem = cartItems.find(item => item.id === property.id);
        
        if (existingItem) {
            // Si ya existe, incrementar la cantidad
            setCartItems(cartItems.map(item =>
                item.id === property.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
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
                showContactAgent: false // Para mostrar el ícono de eliminar en lugar del agente
            };
            setCartItems([...cartItems, newItem]);
        }
    };

    // Función para remover un item del carrito
    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Función para actualizar la cantidad de un item
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        
        setCartItems(cartItems.map(item =>
            item.id === id
                ? { ...item, quantity }
                : item
        ));
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        setCartItems([]);
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
        isInCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};