import React, { useState, useEffect } from "react";

const SaleDetailModal = ({ sale, customer, shoppingCart, onClose }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const propertyPromises = shoppingCart.items.map(async (item) => {
                    const response = await fetch(`http://localhost:4000/api/properties/${item.propertyId}`);
                    const property = await response.json();
                    return { ...property, quantity: item.quantity, subtotal: item.subtotal };
                });

                const propertiesData = await Promise.all(propertyPromises);
                setProperties(propertiesData);
            } catch (error) {
                console.error('Error fetching properties: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (shoppingCart?.items) {
            fetchProperties();
        }
    }, [shoppingCart]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-Es', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content sale-detail-modal">
                <div className="modal-header">
                    <h2>Detalles de la Venta</h2>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="modal-body">
                    <div className="detail-section">
                        <h3>Información de la Venta</h3>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">ID de Venta:</span>
                                <span className="detail-value">#{sale._id.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Estado:</span>
                                <span className={`detail-value status ${sale.status.toLowerCase()}`}>
                                    {sale.status}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Método de Pago:</span>
                                <span className="detail-value">{sale.paymentType}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Fecha de Creación:</span>
                                <span className="detail-value">{formatDate(sale.createdAt)}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Total:</span>
                                <span className="detail-value total-amount">
                                    {formatCurrency(shoppingCart.total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Información del Cliente</h3>
                        <div className="customer-detail">
                            <div className="customer-avatar-large">
                                {customer?.profilePicture ? (
                                    <img src={customer.profilePicture} alt="Customer" />
                                ) : (
                                    <div className="avatar-placeholder-large">
                                        {customer?.firstName?.charAt(0)}{customer?.lastName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="customer-info-detail">
                                <h4>{customer?.firstName} {customer?.lastName}</h4>
                                <div className="customer-details-grid">
                                    <div className="customer-detail-item">
                                        <span className="label">Email:</span>
                                        <span className="value">{customer?.email}</span>
                                    </div>
                                    <div className="customer-detail-item">
                                        <span className="label">Teléfono:</span>
                                        <span className="value">{customer?.phone}</span>
                                    </div>
                                    <div className="customer-detail-item">
                                        <span className="label">DUI:</span>
                                        <span className="value">{customer?.dui}</span>
                                    </div>
                                    <div className="customer-detail-item">
                                        <span className="label">Dirección:</span>
                                        <span className="value">{customer?.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Propiedades Compradas</h3>
                        {loading ? (
                            <div className="loading-properties">
                                <div className="loading-spinner"></div>
                                <p>Cargando propiedades...</p>
                            </div>
                        ) : (
                            <div className="properties-list">
                                {properties.map((property, index) => (
                                    <div key={property._id || index} className="property-item">
                                        <div className="property-image">
                                            {property.images && property.images.length > 0 ? (
                                                <img src={property.images[0].image} alt="Property" />
                                            ) : (
                                                <div className="property-placeholder">🏠</div>
                                            )}
                                        </div>
                                        <div className="property-info">
                                            <h4>{property.description}</h4>
                                            <p className="property-location">📍 {property.location}</p>
                                            <div className="property-features">
                                                <span className="feature">🛏️ {property.rooms} hab.</span>
                                                <span className="feature">🚿 {property.bathrooms} baños</span>
                                                <span className="feature">📐 {property.lotSize}</span>
                                            </div>
                                        </div>
                                        <div className="property-pricing">
                                            <div className="property-price">
                                                {formatCurrency(property.price)}
                                            </div>
                                            <div className="property-quantity">
                                                Cantidad: {property.quantity}
                                            </div>
                                            <div className="property-subtotal">
                                                Subtotal: {formatCurrency(property.subtotal)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="detail-section total-section">
                        <div className="total-breakdown">
                            <div className="total-row">
                                <span className="total-label">Subtotal:</span>
                                <span className="total-value">{formatCurrency(shoppingCart.total)}</span>
                            </div>
                            <div className="total-row final">
                                <span className="total-label">Total Final:</span>
                                <span className="total-value">{formatCurrency(shoppingCart.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Cerrar
                    </button>
                    <button className="btn-primary">
                        Imprimir Recibo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaleDetailModal;