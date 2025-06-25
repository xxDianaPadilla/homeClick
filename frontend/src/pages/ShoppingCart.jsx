import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/ShoppingCart.css";
import visaIcon from "../assets/image49.png";
import masterCardIcon from "../assets/image50.png";
import payPalIcon from "../assets/image51.png";
import americanExpressIcon from "../assets/image52.png";
import visaElectronIcon from "../assets/image53.png";
import ilustrativePurposesIcon from "../assets/image55.png";
import creditCardImage from "../assets/image56.png";
import creditCardIcon from "../assets/image57.png";
import ShoppingCartCards from "../components/ShoppingCartCards";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const ShoppingCart = () => {
    const {removeFromCart} = useCart();
    const { user, userInfo } = useAuth();
    const [customerData, setCustomerData] = useState(null);
    const [loadingCustomer, setLoadingCustomer] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadingCart, setLoadingCart] = useState(true);

    const fetchCartFromDB = async () => {
        if(!user?.id){
            setCartItems([]);
            setTotal(0);
            setLoadingCart(false);
            return;
        }

        try {
            setLoadingCart(true);
            const response = await fetch(`http://localhost:4000/api/shoppingCart/customer/${user.id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                const cartData = await response.json();
                console.log('Carrito obtenido de BD: ', cartData);

                const transformedItems = cartData.items?.map(item => ({
                    id: item.propertyId._id || item.propertyId,
                    name: item.propertyId.name || 'Propiedad sin nombre',
                    price: item.subtotal / item.quantity,
                    description: item.propertyId.description || 'Sin descripción',
                    area: item.propertyId.lotSize || 'No especificado',
                    bedrooms: item.propertyId.rooms || 'No especificado',
                    bathrooms: item.propertyId.bathrooms || 'No especificado',
                    location: item.propertyId.location || 'Ubicación no especificada',
                    quantity: item.quantity,
                    subtotal: item.subtotal,
                    thumbnails: (() => {
                        const images = item.propertyId.images;
                        if(!images || !Array(images) || images.length === 0){
                            console.log('No images found for property: ', item.propertyId.name);
                            return null;
                        }
                        
                        const firstImage = images[0];
                        if(firstImage && firstImage.image){
                            console.log('Image found: ', firstImage.image);
                            return firstImage.image;
                        }
                        console.log('Sigle image found: ', item.propertyId.name);;
                        return images;
                    })(),
                    showContactAgent: true
                })) || [];

                setCartItems(transformedItems);
                setTotal(cartData.total || 0);
            }else{
                console.error('Error obteniendo carrito: ', response.status);
                setCartItems([]);
                setTotal(0);
            }
        } catch (error) {
            console.error('Error fetching cart: ', error);
            toast.error('Error al cargar el carrito');
            setCartItems([]);
            setTotal(0);
        }finally{
            setLoadingCart(false);
        }
    };

    const removeFromCartDB = async (propertyId) => {
        try {
            const response = await fetch('http://localhost:4000/api/shoppingCart/remove-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    customerId: user.id,
                    propertyId: propertyId
                })
            });

            if(response.ok){
                const result = await response.json();
                console.log('Item removudo de BD: ', result);

                await fetchCartFromDB();

                return true;
            }else{
                const error = await response.json();
                console.error('Error removiendo item: ', error);
                toast.error(error.message || 'Error al remover del carrito');
                return false;
            }
        } catch (error) {
            console.error('Error removing from cart: ', error);
            toast.error('Error de conexión al remover del carrito');
            return false;
        }
    };

    useEffect(() => {
        fetchCartFromDB();
    }, [user?.id]);

    useEffect(() => {
        const fetchCustomerData = async () => {

            if (user && user.userType === 'Customer' && user.id && user.id !== 'admin') {
                setLoadingCustomer(true);
                try {
                    console.log('Fetching customer data for ID:', user.id);
                    const response = await fetch(`http://localhost:4000/api/customers/${user.id}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Customer data received:', data);
                        setCustomerData(data);
                    } else {
                        console.error('Error fetching customer data:', response.status);
                        setCustomerData(null);
                    }
                } catch (error) {
                    console.error('Error fetching customer data:', error);
                    setCustomerData(null);
                } finally {
                    setLoadingCustomer(false);
                }
            }
        };

        fetchCustomerData();
    }, [user]);

    const handleRemoveItem = async (id) => {
        const loadingToast = toast.loading('Removiendo del carrito...');

        const success = await removeFromCartDB(id);

        toast.dismiss(loadingToast);

        if(success){
            removeFromCart(id);
            toast.success('Propiedad eliminada del carrito');
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    const getClientDisplayData = () => {
        if (user && user.userType === 'admin') {
            return {
                name: userInfo?.name || 'Administrador',
                email: userInfo?.email || 'admin@homeclick.com',
                phone: userInfo?.phone || '555-0000-0000'
            };
        }

        if (customerData) {
            return {
                name: `${customerData.firstName} ${customerData.lastName}`,
                email: customerData.email,
                phone: customerData.phone
            };
        }

        if (loadingCustomer) {
            return {
                name: 'Cargando...',
                email: 'Cargando...',
                phone: 'Cargando...'
            };
        }

        if (userInfo) {
            return {
                name: userInfo.name || 'Usuario',
                email: userInfo.email || 'usuario@homeclick.com',
                phone: userInfo.phone || '555-0000-0000'
            };
        }

        return {
            name: 'Usuario no identificado',
            email: 'usuario@homeclick.com',
            phone: '555-0000-0000'
        };
    };

    const clientData = getClientDisplayData();
    const getCartItemsCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="shopping-cart-container">
                <h1 className="shopping-cart-title">Carrito de compras</h1>

                <div className="shopping-cart-content">
                    <div className="cart-summary">
                        <h2 className="section-title">Resumen de su orden</h2>

                        {cartItems.length > 0 ? (
                            cartItems.map((property) => (
                                <ShoppingCartCards
                                    key={property.id}
                                    thumbnails={property.thumbnails}
                                    name={property.name}
                                    description={property.description}
                                    area={property.area}
                                    bedrooms={property.bedrooms}
                                    bathrooms={property.bathrooms}
                                    onRemove={() => handleRemoveItem(property.id)}
                                />
                            ))
                        ) : (
                            <div className="empty-cart-message" style={{
                                textAlign: 'center',
                                padding: '40px 20px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                margin: '20px 0'
                            }}>
                                <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>Tu carrito está vacío</h3>
                                <p style={{ color: '#6c757d', fontSize: '14px' }}>
                                    Agrega algunas propiedades para comenzar tu compra
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="cart-total">
                        <h2 className="section-title">Factura total</h2>

                        <div className="product-list">
                            <div className="product-header">
                                <span>Productos:</span>
                                <span>Precios:</span>
                            </div>

                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <div key={item.id} className="product-item">
                                        <span>{index + 1}. {item.name}</span>
                                        <span>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="product-item">
                                    <span>No hay productos en el carrito</span>
                                    <span>$0</span>
                                </div>
                            )}
                        </div>

                        <div className="client-data">
                            <div className="titulos">
                                <h3>Datos Cliente:</h3>
                                <h3>Datos vendedor</h3>
                            </div>
                            <div className="client-details">
                                <div className="client-info">
                                    <p>{clientData.name}</p>
                                    <p>{clientData.email}</p>
                                    <p>{clientData.phone}</p>
                                </div>
                                <div className="client-info">
                                    <p>Diana Padilla</p>
                                    <p>dianagabypadilla006@gmail.com</p>
                                    <p>8521-4564</p>
                                </div>
                            </div>
                        </div>

                        <div className="cart-totals">
                            <div className="subtotal">
                                <span>Subtotal:</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="total">
                                <span>Total:</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <div className="payment-methods">
                            <h3>Métodos de pago</h3>
                            <div className="payment-buttons">
                                <button
                                    className="btn-pay tarjeta"
                                    disabled={cartItems.length === 0}
                                    style={cartItems.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                >
                                    Pagar con tarjeta
                                </button>
                                <button
                                    className="btn-pay paypal"
                                    disabled={cartItems.length === 0}
                                    style={cartItems.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                >
                                    Pagar con paypal
                                </button>
                            </div>
                            <div className="payment-icons">
                                <img src={visaIcon} alt="Visa" />
                                <img src={masterCardIcon} alt="MasterCard" />
                                <img src={payPalIcon} alt="PayPal" />
                                <img src={americanExpressIcon} alt="American Express" />
                                <img src={visaElectronIcon} alt="Visa Electron" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="payment-details">
                    <h2 className="section-title">Detalles del método de pago</h2>

                    <div className="payment-form">
                        <div className="payment-disclaimer">
                            <img src={ilustrativePurposesIcon} alt="Fines ilustrativos" />
                        </div>

                        <div className="credit-card-section">
                            <div className="credit-card-image">
                                <img src={creditCardImage} alt="Tarjeta de crédito" />
                            </div>

                            <div className="credit-card-form">
                                <div className="form-group">
                                    <input
                                        placeholder="Titular de la tarjeta"
                                        className="form-control"
                                        disabled={cartItems.length === 0}
                                        defaultValue={cartItems.length > 0 ? clientData.name : ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        placeholder="Número de tarjeta"
                                        className="form-control"
                                        disabled={cartItems.length === 0}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <input
                                            placeholder="Fecha de vencimiento (mm/yy)"
                                            className="form-control"
                                            disabled={cartItems.length === 0}
                                        />
                                    </div>
                                    <div className="form-group half">
                                        <input
                                            placeholder="Código de seguridad CVV"
                                            className="form-control"
                                            disabled={cartItems.length === 0}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn-confirm"
                                    disabled={cartItems.length === 0}
                                    style={cartItems.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                    onClick={() => {
                                        if (cartItems.length > 0) {
                                            toast.success('Procesando pago...');
                                        }
                                    }}
                                >
                                    <img src={creditCardIcon} alt="Tarjeta" />
                                    Confirmar pago
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {cartItems.length > 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        margin: '20px 0'
                    }}>
                        <p style={{ margin: '0', color: '#495057', fontSize: '16px' }}>
                            <strong>{getCartItemsCount()}</strong> propiedad(es) en tu carrito • Total: <strong>{formatPrice(total)}</strong>
                        </p>
                        <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
                            Cliente: <strong>{clientData.name}</strong> ({clientData.email})
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ShoppingCart;