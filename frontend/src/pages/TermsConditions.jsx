import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import '../styles/TermsConditions.css';

const TermsConditions = () => {
    return (
        <>
            <Navbar />
            <div className="terms-container">
                <div className="terms-content">
                    <h1 className="terms-title">Términos y condiciones - HomeClick</h1>
                    <p className="terms-date">Fecha de entrada en vigor: Febrero 25, 2025</p>

                    <div className="terms-intro">
                        <p>Bienvenido a HomeClick. Al acceder y utilizar nuestra plataforma, aceptas estos Términos y Condiciones. Si no estás de acuerdo, por favor, no utilices nuestros servicios.</p>
                    </div>

                    <div className="terms-section">
                        <h2>Definiciones</h2>
                        <ul>
                            <li><strong>Plataforma:</strong> El sitio web y la aplicación móvil de HomeClick.</li>
                            <li><strong>Usuario:</strong> Cualquier persona que acceda o utilice HomeClick.</li>
                            <li><strong>Propiedades:</strong> Bienes inmuebles disponibles para compra a través de la plataforma.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Uso de la Plataforma</h2>
                        <ul>
                            <li>La plataforma está diseñada exclusivamente para la compra de propiedades por parte de usuarios registrados.</li>
                            <li>Está prohibido el uso de HomeClick para actividades fraudulentas, ilegales o que violen estas términos.</li>
                            <li>HomeClick se reserva el derecho de suspender o eliminar cuentas que incumplan estas normas.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Registro y Seguridad de la cuenta</h2>
                        <ul>
                            <li>Para acceder a ciertas funciones, los usuarios deben registrarse proporcionando información válida y actualizada.</li>
                            <li>Los usuarios son responsables de mantener la confidencialidad de sus credenciales.</li>
                            <li>HomeClick no se hace responsable de accesos no autorizados derivados de negligencia del usuario.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Proceso de Compra</h2>
                        <ul>
                            <li>La plataforma facilita el contacto con vendedores y la visualización de propiedades.</li>
                            <li>HomeClick no es responsable de la exactitud de la información proporcionada por terceros ni de la transacción final entre las partes.</li>
                            <li>Los usuarios deben realizar sus propias verificaciones antes de concretar una compra.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Responsabilidades y Limitaciones</h2>
                        <ul>
                            <li>HomeClick no garantiza la disponibilidad continua de la plataforma ni la ausencia de errores técnicos.</li>
                            <li>No somos responsables por cualquier pérdida derivada del uso de la plataforma.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Propiedad Intelectual</h2>
                        <ul>
                            <li>Todo el contenido de la plataforma (diseño, logotipos, software, etc.) es propiedad de HomeClick o de sus licenciantes.</li>
                            <li>Se prohíbe la reproducción, distribución o uso no autorizado de cualquier material de HomeClick.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Modificaciones de los Términos</h2>
                        <ul>
                            <li>HomeClick puede modificar estos términos en cualquier momento. Los cambios serán notificados en la plataforma y su uso continuado implicará la aceptación de los mismos.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Ley Aplicable y Jurisdicción</h2>
                        <ul>
                            <li>Estos términos se rigen por las leyes aplicables en El Salvador y cualquier disputa será resuelta en los tribunales correspondientes.</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2>Contacto</h2>
                        <p>Si tienes dudas sobre estos Términos y Condiciones, contáctanos a: homeclickssv@gmail.com.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsConditions;