// TermYcon.jsx
import React from 'react';
import '../styles/TermYcon.css';

function TermYcon() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Términos y condiciones - HomeClick</h1>
      <p className="terms-date">Fecha de entrada en vigor: Febrero 25, 2025</p>

      <p className="terms-greeting">
        Bienvenido a HomeClick. Al acceder y utilizar nuestra plataforma, aceptas
        estos Términos y Condiciones. Si no estás de acuerdo, por favor, no utilices
        nuestros servicios.
      </p>

      <h2 className="terms-subtitle">Definiciones</h2>
      <ul className="terms-list">
        <li>
          <strong>Plataforma:</strong> El sitio web y la aplicación móvil de HomeClick.
        </li>
        <li>
          <strong>Usuario:</strong> Cualquier persona que acceda o utilice HomeClick.
        </li>
        <li>
          <strong>Propiedades:</strong> Bienes inmuebles disponibles para compra a través de la
          plataforma.
        </li>
      </ul>

      <h2 className="terms-subtitle">Uso de la Plataforma</h2>
      <ul className="terms-list">
        <li>
          La plataforma está diseñada exclusivamente para la compra de
          propiedades por parte de usuarios registrados.
        </li>
        <li>
          Queda prohibido el uso de HomeClick para actividades fraudulentas,
          ilegales o que violen estos términos.
        </li>
        <li>
          HomeClick se reserva el derecho de suspender o eliminar cuentas que
          incumplan estas normas.
        </li>
      </ul>
    </div>
  );
}

export default TermYcon;