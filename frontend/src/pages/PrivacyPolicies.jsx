import React from "react";
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import '../styles/PrivacyPolicies.css';

const PrivacyPolicies = () => {
    return (
        <>
            <Navbar />
            <div className="privacy-container">
                <h1>Políticas de privacidad - HomeClick</h1>
                <p className="date">Fecha de entrada en vigor: Febrero 25, 2025</p>

                <div className="intro">
                    <p>Bienvenido a HomeClick. La privacidad y seguridad de nuestros usuarios son fundamentales. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información personal al utilizar nuestra plataforma.</p>
                </div>

                <div className="section">
                    <h2>Información que Recopilamos</h2>
                    <p>Podemos recopilar los siguientes tipos de información</p>
                    <ul>
                        <li>Datos de Registro: Nombre, correo electrónico, número de teléfono y contraseña.</li>
                        <li>Datos de Perfil: Preferencias, intereses, historial de búsqueda y ubicación.</li>
                        <li>Datos de Transacciones: Historial de compras, pagos y comunicaciones con inmobiliarias.</li>
                        <li>Datos de Uso: Interacciones con la plataforma, direcciones IP y cookies.</li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Uso de la información</h2>
                    <p>Utilizamos la información recopilada para:</p>
                    <ul>
                        <li>Facilitar la compra y venta de propiedades.</li>
                        <li>Personalizar la experiencia del usuario.</li>
                        <li>Realizar investigaciones y análisis de mercado.</li>
                        <li>Enviar notificaciones, promociones y actualizaciones relevantes.</li>
                        <li>Garantizar la seguridad y cumplimiento legal.</li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Compartición de Datos</h2>
                    <p>No vendemos ni compartimos información personal con terceros, salvo en los siguientes casos:</p>
                    <ul>
                        <li>Con proveedores de servicios para mejorar la plataforma (hosting, pagos, marketing, etc.).</li>
                        <li>Cuando sea requerido por la ley o para proteger nuestros derechos.</li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Seguridad de los Datos</h2>
                    <p>Implementamos medidas de seguridad para proteger la información de nuestros usuarios contra accesos no autorizados, pérdidas o alteraciones. Sin embargo, el uso de internet conlleva riesgos, por lo que no podemos garantizar seguridad absoluta.</p>
                </div>

                <div className="section">
                    <h2>Derecho de los Usuarios</h2>
                    <p>Los usuarios pueden:</p>
                    <ul>
                        <li>Acceder, corregir o eliminar su información personal</li>
                        <li>Configurar preferencias de privacidad y cookies.</li>
                        <li>Solicitar la eliminación de su cuenta.</li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Cookies y Tecnologías Similares</h2>
                    <p>Utilizamos cookies para mejorar la experiencia del usuario, personalizar contenido y analizar el tráfico. Los usuarios pueden gestionar sus preferencias de cookies desde la configuración del navegador.</p>
                </div>

                <div className="section">
                    <h2>Cambios en la Política de Privacidad</h2>
                    <p>Podemos actualizar esta política en cualquier momento. Notificaremos a los usuarios sobre cambios significativos a través de la plataforma y por correo electrónico.</p>
                </div>

                <div className="section">
                    <h2>Contacto</h2>
                    <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en homeclick2025@gmail.com</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicies;