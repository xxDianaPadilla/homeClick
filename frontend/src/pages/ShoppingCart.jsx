import React, { useState } from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/ShoppingCart.css";
import house1 from "../assets/image5.png";
import house2 from "../assets/image7.png";
import pictureIcon from "../assets/image35.png";
import areaIcon from "../assets/image38.png";
import bedIcon from "../assets/image39.png";
import personIcon from "../assets/image37.png";
import toiletIcon from "../assets/image40.png";
import trashcanIcon from "../assets/image36.png";
import visaIcon from "../assets/image49.png";
import masterCardIcon from "../assets/image50.png";
import payPalIcon from "../assets/image51.png";
import americanExpressIcon from "../assets/image52.png";
import visaElectronIcon from "../assets/image53.png";
import ilustrativePurposesIcon from "../assets/image55.png";
import creditCardImage from "../assets/image56.png";
import creditCardIcon from "../assets/image57.png";
import { useNavigate, useLocation } from 'react-router-dom';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handlePropertyViewClick = () => {
        navigate('/propertyView');
      };
    
    const [paymentMethod, setPaymentMethod] = useState("tarjeta");

    return (
        <>
            <Navbar />
            <div className="shopping-cart-container5">
                <h1 className="shopping-cart-title5">Carrito de compras</h1>

                <div className="shopping-cart-content5">
                    <div className="cart-summary5">
                        <h2 className="section-title5">Resumen de su orden</h2>

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

                    <div className="cart-total5">
                        <h2 className="section-title">Factura total</h2>

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
                                    <input placeholder="Titulas de la tarjeta" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Número de tarjeta" className="form-control" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <input placeholder="Fecha de vencimiento (mm/yy)" className="form-control" />
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
            <Footer />
        </>
    );
};

export default ShoppingCart;