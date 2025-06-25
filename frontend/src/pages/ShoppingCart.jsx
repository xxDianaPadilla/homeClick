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
    const { removeFromCart } = useCart();
    const { user, userInfo } = useAuth();
    const [customerData, setCustomerData] = useState(null);
    const [loadingCustomer, setLoadingCustomer] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loadingCart, setLoadingCart] = useState(true);
    const [shoppingCartId, setShoppingCartId] = useState(null);
    const [activeTab, setActiveTab] = useState('active'); // 'active' o 'purchased'

    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: ''
    });
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const fetchCartFromDB = async () => {
        if (!user?.id) {
            setCartItems([]);
            setPurchasedItems([]);
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

            if (response.ok) {
                const cartData = await response.json();
                console.log('Carrito obtenido de BD: ', cartData);

                setShoppingCartId(cartData._id);

                // Separar items activos y comprados
                const activeItems = cartData.items?.filter(item => !item.purchased) || [];
                const purchasedItems = cartData.items?.filter(item => item.purchased) || [];

                const transformItems = (items) => items.map(item => ({
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
                    purchased: item.purchased || false,
                    purchaseDate: item.purchaseDate || null,
                    thumbnails: (() => {
                        const images = item.propertyId.images;
                        if (!images || !Array.isArray(images) || images.length === 0) {
                            console.log('No images found for property: ', item.propertyId.name);
                            return null;
                        }

                        const firstImage = images[0];
                        if (firstImage && firstImage.image) {
                            console.log('Image found: ', firstImage.image);
                            return firstImage.image;
                        }
                        console.log('Single image found: ', item.propertyId.name);
                        return images;
                    })(),
                    showContactAgent: true
                }));

                setCartItems(transformItems(activeItems));
                setPurchasedItems(transformItems(purchasedItems));

                const activeTotal = activeItems.reduce((sum, item) => sum + item.subtotal, 0);
                setTotal(activeTotal);
            } else {
                console.error('Error obteniendo carrito: ', response.status);
                setCartItems([]);
                setPurchasedItems([]);
                setTotal(0);
            }
        } catch (error) {
            console.error('Error fetching cart: ', error);
            toast.error('Error al cargar el carrito');
            setCartItems([]);
            setPurchasedItems([]);
            setTotal(0);
        } finally {
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

            if (response.ok) {
                const result = await response.json();
                console.log('Item removido de BD: ', result);

                await fetchCartFromDB();

                return true;
            } else {
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

    const processPayment = async (useSimulation = false) => {
        if (!shoppingCartId || cartItems.length === 0) {
            toast.error('No hay productos en el carrito');
            return;
        }

        if (!useSimulation) {
            if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardHolder) {
                toast.error('Por favor completa todos los datos de la tarjeta');
                return;
            }

            const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            if (!expiryRegex.test(paymentData.expiryDate)) {
                toast.error('Formato de fecha inválido (MM/YY)');
                return;
            }
        }

        setIsProcessingPayment(true);
        const loadingToast = toast.loading('Procesando pago...');

        try {
            const clientData = getClientDisplayData();
            let endpoint, requestBody;

            if (useSimulation) {
                endpoint = 'http://localhost:4000/api/payment/simulate';
                requestBody = {
                    amount: total,
                    email: clientData.email,
                    firstName: clientData.name.split(' ')[0],
                    lastName: clientData.name.split(' ').slice(1).join(' ') || 'Usuario',
                    phone: clientData.phone,
                    shoppingCartId: shoppingCartId,
                    simulate: 'approved',
                    markAsPurchased: true 
                };
            } else {
                const [expiryMonth, expiryYear] = paymentData.expiryDate.split('/');
                endpoint = 'http://localhost:4000/api/payment/wompi';
                requestBody = {
                    amount: total,
                    currency: 'USD',
                    email: clientData.email,
                    firstName: clientData.name.split(' ')[0],
                    lastName: clientData.name.split(' ').slice(1).join(' ') || 'Usuario',
                    phone: clientData.phone,
                    cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
                    expiryMonth: expiryMonth,
                    expiryYear: `20${expiryYear}`,
                    cvv: paymentData.cvv,
                    shoppingCartId: shoppingCartId,
                    markAsPurchased: true 
                };
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(requestBody)
            });

            const result = await response.json();

            toast.dismiss(loadingToast);

            if (response.ok && result.success) {
                toast.success(result.message);

                setPaymentData({
                    cardNumber: '',
                    expiryDate: '',
                    cvv: '',
                    cardHolder: ''
                });

                setShowPaymentForm(false);

                // Actualizar el carrito después del pago exitoso
                await fetchCartFromDB();
                
                // Cambiar automáticamente a la pestaña de propiedades compradas
                setActiveTab('purchased');
            } else {
                toast.error(result.message || 'Error al procesar el pago');
                console.error('Error en el pago: ', result);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Error processing payment: ', error);
            toast.error('Error de conexión al procesar el pago');
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const formatCardNumber = value => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handlePaymentInputChange = (field, value) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        } else if (field === 'cvv') {
            formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
        }

        setPaymentData(prev => ({
            ...prev,
            [field]: formattedValue
        }));
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

                        setPaymentData(prev => ({
                            ...prev,
                            cardHolder: `${data.firstName} ${data.lastName}`
                        }));
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

        if (success) {
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

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
    const getPurchasedItemsCount = () => purchasedItems.reduce((total, item) => total + item.quantity, 0);
    const getPurchasedTotal = () => purchasedItems.reduce((total, item) => total + item.subtotal, 0);

    // Componente para las cards de propiedades compradas
    const PurchasedPropertyCard = ({ property }) => (
        <div className="purchased-property-card" style={{
            border: '1px solid #28a745',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#f8fff8',
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
            }}>
                COMPRADA
            </div>
            
            <ShoppingCartCards
                key={property.id}
                thumbnails={property.thumbnails}
                name={property.name}
                description={property.description}
                area={property.area}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                onRemove={null} // No mostrar botón de remover para propiedades compradas
                isPurchased={true}
            />
            
            <div style={{
                marginTop: '12px',
                padding: '8px',
                backgroundColor: '#e9f7ef',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#155724'
            }}>
                <strong>Fecha de compra:</strong> {formatDate(property.purchaseDate)}
                <br />
                <strong>Precio pagado:</strong> {formatPrice(property.subtotal)}
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="shopping-cart-container">
                <h1 className="shopping-cart-title">Carrito de compras</h1>

                {/* Pestañas de navegación */}
                <div className="cart-tabs" style={{
                    display: 'flex',
                    marginBottom: '20px',
                    borderBottom: '2px solid #e9ecef'
                }}>
                    <button
                        className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            backgroundColor: activeTab === 'active' ? '#007bff' : 'transparent',
                            color: activeTab === 'active' ? 'white' : '#6c757d',
                            cursor: 'pointer',
                            borderRadius: '4px 4px 0 0',
                            marginRight: '8px',
                            fontWeight: activeTab === 'active' ? 'bold' : 'normal'
                        }}
                    >
                        Carrito Activo ({getCartItemsCount()})
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'purchased' ? 'active' : ''}`}
                        onClick={() => setActiveTab('purchased')}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            backgroundColor: activeTab === 'purchased' ? '#28a745' : 'transparent',
                            color: activeTab === 'purchased' ? 'white' : '#6c757d',
                            cursor: 'pointer',
                            borderRadius: '4px 4px 0 0',
                            fontWeight: activeTab === 'purchased' ? 'bold' : 'normal'
                        }}
                    >
                        Propiedades Compradas ({getPurchasedItemsCount()})
                    </button>
                </div>

                {activeTab === 'active' ? (
                    /* Contenido del carrito activo */
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
                                        disabled={cartItems.length === 0 || isProcessingPayment}
                                        style={cartItems.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                        onClick={() => setShowPaymentForm(true)}
                                    >
                                        Pagar con tarjeta
                                    </button>
                                    <button
                                        className="btn-pay paypal"
                                        disabled={cartItems.length === 0 || isProcessingPayment}
                                        style={cartItems.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                        onClick={() => processPayment(true)}
                                    >
                                        Pago simulado (Prueba)
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
                ) : (
                    /* Contenido de propiedades compradas */
                    <div className="purchased-properties-content">
                        <div className="purchased-summary">
                            <h2 className="section-title" style={{ color: '#28a745' }}>
                                Mis Propiedades Compradas
                            </h2>

                            {purchasedItems.length > 0 ? (
                                <>
                                    <div style={{
                                        backgroundColor: '#d4edda',
                                        border: '1px solid #c3e6cb',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        marginBottom: '20px',
                                        color: '#155724'
                                    }}>
                                        <h4 style={{ margin: '0 0 8px 0' }}>
                                            Resumen de Compras
                                        </h4>
                                        <p style={{ margin: '0' }}>
                                            Has comprado <strong>{getPurchasedItemsCount()}</strong> propiedad(es) 
                                            por un total de <strong>{formatPrice(getPurchasedTotal())}</strong>
                                        </p>
                                    </div>
                                    
                                    {purchasedItems.map((property) => (
                                        <PurchasedPropertyCard
                                            key={property.id}
                                            property={property}
                                        />
                                    ))}
                                </>
                            ) : (
                                <div className="empty-purchased-message" style={{
                                    textAlign: 'center',
                                    padding: '40px 20px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px',
                                    margin: '20px 0'
                                }}>
                                    <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>
                                        No tienes propiedades compradas
                                    </h3>
                                    <p style={{ color: '#6c757d', fontSize: '14px' }}>
                                        Las propiedades que compres aparecerán aquí
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('active')}
                                        style={{
                                            marginTop: '16px',
                                            padding: '10px 20px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Ver Carrito Activo
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Formulario de pago - solo visible en pestaña activa */}
                {activeTab === 'active' && showPaymentForm && (
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
                                            type="text"
                                            placeholder="Titular de la tarjeta"
                                            className="form-control"
                                            value={paymentData.cardHolder}
                                            onChange={(e) => handlePaymentInputChange('cardHolder', e.target.value)}
                                            disabled={isProcessingPayment}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Número de tarjeta"
                                            className="form-control"
                                            value={paymentData.cardNumber}
                                            onChange={(e) => handlePaymentInputChange('cardNumber', e.target.value)}
                                            maxLength="19"
                                            disabled={isProcessingPayment}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group half">
                                            <input
                                                type="text"
                                                placeholder="Fecha de vencimiento (MM/YY)"
                                                className="form-control"
                                                value={paymentData.expiryDate}
                                                onChange={(e) => handlePaymentInputChange('expiryDate', e.target.value)}
                                                maxLength="5"
                                                disabled={isProcessingPayment}
                                            />
                                        </div>
                                        <div className="form-group half">
                                            <input
                                                type="text"
                                                placeholder="Código de seguridad CVV"
                                                className="form-control"
                                                value={paymentData.cvv}
                                                onChange={(e) => handlePaymentInputChange('cvv', e.target.value)}
                                                maxLength="4"
                                                disabled={isProcessingPayment}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-buttons">
                                        <button
                                            className="btn-confirm"
                                            onClick={() => processPayment(false)}
                                            disabled={isProcessingPayment}
                                        >
                                            <img src={creditCardIcon} alt="Tarjeta" />
                                            {isProcessingPayment ? 'Procesando...' : 'Confirmar pago'}
                                        </button>
                                        <br />
                                        <button
                                            className="btn-cancel"
                                            onClick={() => setShowPaymentForm(false)}
                                            disabled={isProcessingPayment}
                                            style={{
                                                marginLeft: '10px',
                                                backgroundColor: '#6c757d',
                                                color: 'white',
                                                border: 'none',
                                                padding: '12px 24px',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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