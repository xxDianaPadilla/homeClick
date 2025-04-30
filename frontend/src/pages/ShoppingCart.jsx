import React, { useState } from "react"; // Importa React y el hook useState para la gestión del estado.
import Navbar from '../components/Navbar'; // Importa el componente Navbar para la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer para el pie de página.
import "../styles/ShoppingCart.css"; // Importa los estilos CSS específicos para la página del carrito de compras.
import house1 from "../assets/image5.png"; // Importa una imagen de casa.
import house2 from "../assets/image7.png"; // Importa otra imagen de casa.
import pictureIcon from "../assets/image35.png"; // Importa un icono de imagen.
import areaIcon from "../assets/image38.png"; // Importa un icono de área.
import bedIcon from "../assets/image39.png"; // Importa un icono de cama.
import personIcon from "../assets/image37.png"; // Importa un icono de persona.
import toiletIcon from "../assets/image40.png"; // Importa un icono de inodoro.
import trashcanIcon from "../assets/image36.png"; // Importa un icono de bote de basura.
import visaIcon from "../assets/image49.png"; // Importa el icono de Visa.
import masterCardIcon from "../assets/image50.png"; // Importa el icono de MasterCard.
import payPalIcon from "../assets/image51.png"; // Importa el icono de PayPal.
import americanExpressIcon from "../assets/image52.png"; // Importa el icono de American Express.
import visaElectronIcon from "../assets/image53.png"; // Importa el icono de Visa Electron.
import ilustrativePurposesIcon from "../assets/image55.png"; // Importa un icono de fines ilustrativos.
import creditCardImage from "../assets/image56.png"; // Importa una imagen de tarjeta de crédito.
import creditCardIcon from "../assets/image57.png"; // Importa un icono de tarjeta de crédito.
import { useNavigate, useLocation } from 'react-router-dom'; // Importa hooks para la navegación y la ubicación.

// Define el componente funcional ShoppingCart, que muestra el carrito de compras del usuario.
const ShoppingCart = () => {
  // Hook para obtener la función 'navigate' para la navegación programática.
  const navigate = useNavigate();
  // Hook para acceder al objeto de ubicación actual (no se utiliza directamente en este componente, pero podría ser útil en otros contextos).
  const location = useLocation();

  // Función que se ejecuta al hacer clic en una tarjeta de propiedad. Navega a la página de vista de propiedad.
  const handlePropertyViewClick = () => {
    navigate('/propertyView');
  };

  // Estado para controlar el método de pago seleccionado (inicialmente establecido en "tarjeta").
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");

  // Renderiza la estructura de la página del carrito de compras.
  return (
    <>
      {/* Renderiza el componente Navbar en la parte superior. */}
      <Navbar />
      {/* Contenedor principal para el contenido del carrito de compras. */}
      <div className="shopping-cart-container5">
        {/* Título de la página del carrito de compras. */}
        <h1 className="shopping-cart-title5">Carrito de compras</h1>

        {/* Contenido principal del carrito de compras, dividido en resumen y total. */}
        <div className="shopping-cart-content5">
          {/* Sección del resumen de la orden. */}
          <div className="cart-summary5">
            <h2 className="section-title5">Resumen de su orden</h2>

            {/* Item del carrito de compras #1. */}
            <div className="cart-item5" onClick={handlePropertyViewClick}>
              <div className="item-image5">
                <img src={house1} alt="Casa en colonia Escalón" />
              </div>
              <div className="image-counter2">
                <img src={pictureIcon} alt="Pictures" className="meta-icon" />
                <span>5</span>
              </div>
              <div className="item-details5">
                <div className="item-header5">
                  <h3>Casa en colonia Escalón</h3>
                  <span className="item-price5">$550,000</span>
                </div>
                <p className="item-description5">
                  Moderna casa en exclusiva Colonia Escalón con amplia sala, comedor, cocina, 3 dormitorios con closet y 3 baños completos.
                  Además cuenta con área de servicio completa y parqueo con portón eléctrico. Excelente ubicación cerca de centros comerciales,
                  restaurantes y demás servicios.
                </p>
                <div className="item-features5">
                  <div className="feature5">
                    <img src={areaIcon} alt="Área" />
                    <span>267 metros cuadrados</span>
                  </div>
                  <div className="feature5">
                    <img src={bedIcon} alt="Dormitorios" />
                    <span>3</span>
                  </div>
                  <div className="feature5">
                    <img src={toiletIcon} alt="Baños" />
                    <span>3</span>
                  </div>
                  <div className="feature5">
                    <img src={personIcon} alt="Contactar agente" />
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item del carrito de compras #2. */}
            <div className="cart-item5">
              <div className="item-image5">
                <img src={house2} alt="Casa en la zona rosa" />
              </div>
              <div className="image-counter3">
                <img src={pictureIcon} alt="Pictures" className="meta-icon" />
                <span>4</span>
              </div>
              <div className="item-details5">
                <div className="item-header5">
                  <h3>Casa en la zona rosa</h3>
                  <span className="item-price5">$350,000</span>
                </div>
                <p className="item-description5">
                  Acogedora casa en la popular zona rosa, con fácil acceso a restaurantes y vida nocturna. La propiedad cuenta con sala, comedor,
                  cocina, 2 dormitorios y 2 baños. Ideal para inversión o para quienes gustan vivir cerca de amenidades y transporte público.
                </p>
                <div className="item-features5">
                  <div className="feature5">
                    <img src={areaIcon} alt="Área" />
                    <span>156 metros cuadrados</span>
                  </div>
                  <div className="feature5">
                    <img src={bedIcon} alt="Dormitorios" />
                    <span>2</span>
                  </div>
                  <div className="feature5">
                    <img src={toiletIcon} alt="Baños" />
                    <span>2</span>
                  </div>
                  <div className="feature5">
                    <img src={trashcanIcon} alt="Eliminar" />
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección del total del carrito. */}
          <div className="cart-total5">
            <h2 className="section-title">Factura total</h2>

            {/* Lista de productos en la factura. */}
            <div className="product-list5">
              <div className="product-header5">
                <span>Productos:</span>
                <span>Precios:</span>
              </div>
              <div className="product-item5">
                <span>1. Casa en colonia Escalón</span>
                <span>$550,000</span>
              </div>
              <div className="product-item5">
                <span>2. Casa en zona rosa</span>
                <span>$350,000</span>
              </div>
            </div>

            {/* Datos del cliente. */}
            <div className="client-data">
              <h3>Datos Cliente:</h3>
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

            {/* Totales del carrito (subtotal y total). */}
            <div className="cart-totals">
              <div className="subtotal">
                <span>Subtotal:</span>
                <span>$900,000</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>$900,000</span>
              </div>
            </div>

            {/* Métodos de pago disponibles. */}
            <div className="payment-methods">
              <h3>Métodos de pago</h3>
              <div className="payment-buttons">
                <button className="btn-pay tarjeta">Pagar con tarjeta</button>
                <button className="btn-pay paypal">Pagar con paypal</button>
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

          {/* Sección de detalles del método de pago (formulario de tarjeta de crédito). */}
          <div className="payment-details">
            <h2 className="section-title">Detalles del método de pago</h2>

            <div className="payment-form">
              <div className="payment-disclaimer">
                <img src={ilustrativePurposesIcon} alt="Fines ilustrativos" />
              </div>

              {/* Formulario de tarjeta de crédito. */}
              <div className="credit-card-section">
                <div className="credit-card-image">
                  <img src={creditCardImage} alt="Tarjeta de crédito" />
                </div>

                <div className="credit-card-form">
                  <div className="form-group">
                    <input placeholder="Titular de la tarjeta" className="form-control" />
                  </div>
                  <div className="form-group">
                    <input placeholder="Número de tarjeta" className="form-control" />
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <input placeholder="Fecha de vencimiento (mm/aa)" className="form-control" />
                    </div>
                    <div className="form-group half">
                      <input placeholder="Código de seguridad CVV" className="form-control" />
                    </div>
                  </div>
                  <button className="btn-confirm">
                    <img src={creditCardIcon} alt="Tarjeta" />
                    Confirmar pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Renderiza el componente Footer en la parte inferior. */}
      <Footer />
    </>
  );
};

export default ShoppingCart;