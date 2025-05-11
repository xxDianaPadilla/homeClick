 import React, { useState } from "react";
 import Navbar from '../components/Navbar';
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
 
 const ShoppingCart = () => {
     const [paymentMethod, setPaymentMethod] = useState("tarjeta");

     const properties = [
        {
            id: 1,
            image: house1,
            title: "Casa en colonia Escalón",
            price: "550,000",
            description: "Moderna casa en exclusiva Colonia Escalón con amplia sala, comedor, cocina, 3 dormitorios con closet y 3 baños completos. Además cuenta con área de servicio completa y parqueo con portón eléctrico. Excelente ubicación cerca de centros comerciales, restaurantes y demás servicios.",
            area: "267 metros cuadrados",
            bedrooms: 3,
            bathrooms: 3,
            showContactAgent: true
        },
        {
            id: 2,
            image: house2,
            title: "Casa en la zona rosa",
            price: "350,000",
            description: "Acogedora casa en la popular zona rosa, con fácil acceso a restaurantes y vida nocturna. La propiedad cuenta con sala, comedor, cocina, 2 dormitorios y 2 baños. Ideal para inversión o para quienes gustan vivir cerca de amenidades y transporte público.",
            area: "156 metros cuadrados",
            bedrooms: 2,
            bathrooms: 2,
            showContactAgent: false
        }
     ];

     const handleRemoveItem = (id) => {
        console.log(`Removing item with id: ${id}`);
     };
 
     return (
         <>
             <Navbar />
             <div className="shopping-cart-container">
                 <h1 className="shopping-cart-title">Carrito de compras</h1>
 
                 <div className="shopping-cart-content">
                     <div className="cart-summary">
                         <h2 className="section-title">Resumen de su orden</h2>
 
                         {properties.map((property) => (
                            <ShoppingCartCards key={property.id} image={property.image} title={property.title} price={property.price} description={property.description} area={property.area} bedrooms={property.bedrooms} bathrooms={property.bathrooms} showContactAgent={property.showContactAgent} onRemove={() => handleRemoveItem(property.id)}/>
                         ))}
                     </div>
 
                     <div className="cart-total">
                         <h2 className="section-title">Factura total</h2>
 
                         <div className="product-list">
                             <div className="product-header">
                                 <span>Productos:</span>
                                 <span>Precios:</span>
                             </div>
                             <div className="product-item">
                                 <span>1. Casa en colonia Escalón</span>
                                 <span>$550,000</span>
                             </div>
                             <div className="product-item">
                                 <span>2. Casa en zona rosa</span>
                                 <span>$350,000</span>
                             </div>
                         </div>
 
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
 
                         <div className="cart-totals">
                             <div className="subtotal">
                                 <span>Subtotal:</span>
                                 <span>&900,000</span>
                             </div>
                             <div className="total">
                                 <span>Total:</span>
                                 <span>$900,000</span>
                             </div>
                         </div>
 
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
                                     <input placeholder="Titulas de la tarjeta" className="form-control"/>
                                 </div>
                                 <div className="form-group">
                                     <input placeholder="Número de tarjeta" className="form-control"/>
                                 </div>
                                 <div className="form-row">
                                     <div className="form-group half">
                                         <input placeholder="Fecha de vencimiento (mm/yy)" className="form-control"/>
                                     </div>
                                     <div className="form-group half">
                                         <input placeholder="Código de seguridad CVV" className="form-control"/>
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
             <Footer />
         </>
     );
 };
 
 export default ShoppingCart;