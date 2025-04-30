import React from "react"; // Importa la biblioteca React para la creación de componentes.
import Navbar from '../components/Navbar'; // Importa el componente Navbar para la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer para el pie de página.
import '../styles/TermsConditions.css'; // Importa los estilos CSS específicos para la página de términos y condiciones.

// Define el componente funcional TermsConditions, que muestra los términos y condiciones de la plataforma HomeClick.
const TermsConditions = () => {
  return (
    <>
      {/* Renderiza el componente Navbar en la parte superior de la página. */}
      <Navbar />
      {/* Contenedor principal para el contenido de los términos y condiciones. */}
      <div className="terms-container2">
        {/* Contenedor para el contenido interno de los términos y condiciones. */}
        <div className="terms-content2">
          {/* Título principal de la página de términos y condiciones. */}
          <h1 className="terms-title2">Términos y condiciones - HomeClick</h1>
          {/* Fecha de entrada en vigor de los términos y condiciones. */}
          <p className="terms-date">Fecha de entrada en vigor: Febrero 25, 2025</p>

          {/* Introducción a los términos y condiciones. */}
          <div className="terms-intro">
            <p>Bienvenido a HomeClick. Al acceder y utilizar nuestra plataforma, aceptas estos Términos y Condiciones. Si no estás de acuerdo, por favor, no utilices nuestros servicios.</p>
          </div>

          {/* Sección de definiciones de términos clave utilizados en el documento. */}
          <div className="terms-section2">
            <h2>Definiciones</h2>
            <ul>
              <li><strong>Plataforma:</strong> El sitio web y la aplicación móvil de HomeClick.</li>
              <li><strong>Usuario:</strong> Cualquier persona que acceda o utilice HomeClick.</li>
              <li><strong>Propiedades:</strong> Bienes inmuebles disponibles para compra a través de la plataforma.</li>
            </ul>
          </div>

          {/* Sección que describe las normas de uso de la plataforma. */}
          <div className="terms-section2">
            <h2>Uso de la Plataforma</h2>
            <ul>
              <li>La plataforma está diseñada exclusivamente para la compra de propiedades por parte de usuarios registrados.</li>
              <li>Está prohibido el uso de HomeClick para actividades fraudulentas, ilegales o que violen estas términos.</li>
              <li>HomeClick se reserva el derecho de suspender o eliminar cuentas que incumplan estas normas.</li>
            </ul>
          </div>

          {/* Sección sobre el registro de usuarios y la seguridad de sus cuentas. */}
          <div className="terms-section2">
            <h2>Registro y Seguridad de la cuenta</h2>
            <ul>
              <li>Para acceder a ciertas funciones, los usuarios deben registrarse proporcionando información válida y actualizada.</li>
              <li>Los usuarios son responsables de mantener la confidencialidad de sus credenciales.</li>
              <li>HomeClick no se hace responsable de accesos no autorizados derivados de negligencia del usuario.</li>
            </ul>
          </div>

          {/* Sección que explica el proceso de compra de propiedades a través de la plataforma. */}
          <div className="terms-section2">
            <h2>Proceso de Compra</h2>
            <ul>
              <li>La plataforma facilita el contacto con vendedores y la visualización de propiedades.</li>
              <li>HomeClick no es responsable de la exactitud de la información proporcionada por terceros ni de la transacción final entre las partes.</li>
              <li>Los usuarios deben realizar sus propias verificaciones antes de concretar una compra.</li>
            </ul>
          </div>

          {/* Sección que limita las responsabilidades de HomeClick y establece ciertas limitaciones. */}
          <div className="terms-section2">
            <h2>Responsabilidades y Limitaciones</h2>
            <ul>
              <li>HomeClick no garantiza la disponibilidad continua de la plataforma ni la ausencia de errores técnicos.</li>
              <li>No somos responsables por cualquier pérdida derivada del uso de la plataforma.</li>
            </ul>
          </div>

          {/* Sección sobre la propiedad intelectual del contenido de la plataforma. */}
          <div className="terms-section2">
            <h2>Propiedad Intelectual</h2>
            <ul>
              <li>Todo el contenido de la plataforma (diseño, logotipos, software, etc.) es propiedad de HomeClick o de sus licenciantes.</li>
              <li>Se prohíbe la reproducción, distribución o uso no autorizado de cualquier material de HomeClick.</li>
            </ul>
          </div>

          {/* Sección que indica que los términos pueden ser modificados en el futuro. */}
          <div className="terms-section2">
            <h2>Modificaciones de los Términos</h2>
            <ul>
              <li>HomeClick puede modificar estos términos en cualquier momento. Los cambios serán notificados en la plataforma y su uso continuado implicará la aceptación de los mismos.</li>
            </ul>
          </div>

          {/* Sección que establece la ley aplicable y la jurisdicción para la resolución de disputas. */}
          <div className="terms-section2">
            <h2>Ley Aplicable y Jurisdicción</h2>
            <ul>
              <li>Estos términos se rigen por las leyes aplicables en El Salvador y cualquier disputa será resuelta en los tribunales correspondientes.</li>
            </ul>
          </div>

          {/* Sección de información de contacto para consultas sobre los términos y condiciones. */}
          <div className="terms-section2">
            <h2>Contacto</h2>
            <p>Si tienes dudas sobre estos Términos y Condiciones, contáctanos a: homeclickssv@gmail.com.</p>
          </div>
        </div>
      </div>
      {/* Renderiza el componente Footer al final de la página. */}
      <Footer />
    </>
  );
};

export default TermsConditions;