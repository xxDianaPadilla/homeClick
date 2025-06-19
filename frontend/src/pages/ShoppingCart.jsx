import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ShoppingCart.css";
import house1 from "../assets/image5.png";
import house2 from "../assets/image7.png";
import visaIcon from "../assets/image49.png";
import masterCardIcon from "../assets/image50.png";
import payPalIcon from "../assets/image51.png";
import americanExpressIcon from "../assets/image52.png";
import visaElectronIcon from "../assets/image53.png";
import ilustrativePurposesIcon from "../assets/image55.png";
import creditCardImage from "../assets/image56.png";
import creditCardIcon from "../assets/image57.png";
import ShoppingCartCards from "../components/ShoppingCartCards";
import { useCart } from "../context/CartContext"; // Importar el hook del carrito
import { toast } from "react-hot-toast"; // Para mostrar notificaciones

const ShoppingCart = () => {
  // Usar el contexto del carrito para obtener los items y funciones
  const { cartItems, total, removeFromCart, getCartItemsCount } = useCart();

  // Función para manejar la eliminación de items del carrito
  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast.success("Propiedad eliminada del carrito");
  };

  // Calcular el total formateado
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <>
      <Navbar />
      <div className="shopping-cart-container">
        <h1 className="shopping-cart-title">Carrito de compras</h1>

        <div className="shopping-cart-content">
          <div className="cart-summary">
            <h2 className="section-title">Resumen de su orden</h2>

            {/* Mostrar items del carrito dinámicamente */}
            {cartItems.length > 0 ? (
              cartItems.map((property) => (
                <ShoppingCartCards
                  key={property.id}
                  image={property.image}
                  title={property.title}
                  price={property.price.toLocaleString()}
                  description={property.description}
                  area={property.area}
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  showContactAgent={property.showContactAgent}
                  onRemove={() => handleRemoveItem(property.id)}
                />
              ))
            ) : (
              // Mostrar mensaje cuando el carrito está vacío
              <div
                className="empty-cart-message"
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  margin: "20px 0",
                }}
              >
                <h3 style={{ color: "#6c757d", marginBottom: "10px" }}>
                  Tu carrito está vacío
                </h3>
                <p style={{ color: "#6c757d", fontSize: "14px" }}>
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

              {/* Mostrar productos dinámicamente en la factura */}
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={item.id} className="product-item">
                    <span>
                      {index + 1}. {item.title}
                    </span>
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
                <h3>Datos Vendedor:</h3>
              </div>
              <div className="client-details">
                <div className="client-info">
                  <p>Diana Gabriela Padilla Fuentes</p>
                  <p>diana@gmail.com</p>
                  <p>555-1234-5678</p>
                </div>
                <div className="client-info">
                  <p>Iván David Guzmán Flores</p>
                  <p>ivan@gmail.com</p>
                  <p>555-7654-4321</p>
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
                  style={
                    cartItems.length === 0
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                >
                  Pagar con tarjeta
                </button>
                <button
                  className="btn-pay paypal"
                  disabled={cartItems.length === 0}
                  style={
                    cartItems.length === 0
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
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
                  style={
                    cartItems.length === 0
                      ? { opacity: 0.5, cursor: "not-allowed" }
                      : {}
                  }
                  onClick={() => {
                    if (cartItems.length > 0) {
                      toast.success("Procesando pago...");
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

        {/* Mostrar resumen del carrito */}
        {cartItems.length > 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              margin: "20px 0",
            }}
          >
            <p style={{ margin: "0", color: "#495057", fontSize: "16px" }}>
              <strong>{getCartItemsCount()}</strong> propiedad(es) en tu carrito
              • Total: <strong>{formatPrice(total)}</strong>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
