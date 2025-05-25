import React, { useRef, useEffect, useState } from "react";
import '../styles/ListadoVentas.css';

const VentasCards = ({ sale, onClick }) => {
    const [customer, setCustomer] = useState(null);
    const [shoppingCart, setShoppingCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const cartResponse = await fetch(`http://localhost:4000/api/shoppingCart/${sale.shoppingCartId}`);
                
                if (!cartResponse.ok) {
                    throw new Error(`Error fetching cart: ${cartResponse.status} ${cartResponse.statusText}`);
                }
                
                const cartContentType = cartResponse.headers.get('content-type');
                if (!cartContentType || !cartContentType.includes('application/json')) {
                    const responseText = await cartResponse.text();
                    console.error('Cart API returned non-JSON response:', responseText);
                    throw new Error('La API del carrito no devolvió una respuesta JSON válida');
                }
                
                const cartData = await cartResponse.json();
                setShoppingCart(cartData);

                if (!cartData.customerId) {
                    throw new Error('No se encontró customerId en los datos del carrito');
                }

                const customerResponse = await fetch(`http://localhost:4000/api/customers/${cartData.customerId}`);
                
                if (!customerResponse.ok) {
                    throw new Error(`Error fetching customer: ${customerResponse.status} ${customerResponse.statusText}`);
                }
                
                const customerContentType = customerResponse.headers.get('content-type');
                if (!customerContentType || !customerContentType.includes('application/json')) {
                    const responseText = await customerResponse.text();
                    console.error('Customer API returned non-JSON response:', responseText);
                    throw new Error('La API del cliente no devolvió una respuesta JSON válida');
                }
                
                const customerData = await customerResponse.json();
                setCustomer(customerData);
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sale details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        if (sale?.shoppingCartId) {
            fetchSaleDetails();
        }
    }, [sale]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getStatusColor = (status) => {
        return status === 'Pagado' ? '#28a745' : '#ffc107';
    };

    const getPaymentIcon = (paymentType) => {
        switch (paymentType) {
            case 'Transferencia':
                return '🏦';
            case 'Efectivo':
                return '💵';
            case 'Débito':
                return '💳';
            case 'Crédito':
                return '💎';
            default:
                return '💰';
        }
    };

    if (loading) {
        return (
            <div className="venta-card loading">
                <div className="loading-spinner"></div>
                <p>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="venta-card error">
                <div className="error-content">
                    <span className="error-icon">⚠️</span>
                    <div className="error-text">
                        <h4>Error al cargar la venta</h4>
                        <p>{error}</p>
                        <small>Venta ID: {sale._id}</small>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="venta-card" onClick={() => onClick(sale, customer, shoppingCart)}>
            <div className="card-header">
                <div className="sale-id">
                    <span className="label">Venta #</span>
                    <span className="value">{sale._id.slice(-6).toUpperCase()}</span>
                </div>
                <div className={`status-badge ${sale.status.toLowerCase()}`}>
                    {sale.status}
                </div>
            </div>

            <div className="card-body">
                <div className="customer-info">
                    <div className="customer-avatar">
                        {customer?.profilePicture ? (
                            <img src={customer.profilePicture} alt="Customer" />
                        ) : (
                            <div className="avatar-placeholder">
                                {customer?.firstName?.charAt(0)}{customer?.lastName?.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="customer-details">
                        <h3>{customer?.firstName} {customer?.lastName}</h3>
                        <p className="customer-email">{customer?.email}</p>
                    </div>
                </div>

                <div className="sale-summary">
                    <div className="summary-row">
                        <span className="icon">📦</span>
                        <span className="text">{shoppingCart?.items?.length || 0} propiedades</span>
                    </div>
                    <div className="summary-row">
                        <span className="icon">{getPaymentIcon(sale.paymentType)}</span>
                        <span className="text">{sale.paymentType}</span>
                    </div>
                    <div className="summary-row total">
                        <span className="icon">💰</span>
                        <span className="text">{formatCurrency(shoppingCart?.total || 0)}</span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="date-info">
                    <span className="date-label">Fecha:</span>
                    <span className="date-value">{formatDate(sale.createdAt)}</span>
                </div>
                <div className="view-more">
                    <span>Ver detalles →</span>
                </div>
            </div>
        </div>
    );
};

export default VentasCards;