import React from 'react';
import "../styles/Usuarios.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import NavBarAdmin from '../components/NavBarAdmin'; // Importa el componente NavBarAdmin

const Usuarios = () => {
  const administradores = [
    { nombre: 'Rolando Perez, Juan Emilio', email: 'juanemilio@gmail.com' },
    { nombre: 'Esposito Galdamez, Joana Alexandra', email: 'joanaesposito@gmail.com' },
    { nombre: 'Rolando Perez, Juan Emilio', email: 'juanemilio@gmail.com' },
    { nombre: 'Esposito Galdamez, Joana Alexandra', email: 'joanaesposito@gmail.com' },
    { nombre: 'Rolando Perez, Juan Emilio', email: 'juanemilio@gmail.com' },
    { nombre: 'Esposito Galdamez, Joana Alexandra', email: 'joanaesposito@gmail.com' },
    { nombre: 'Rolando Perez, Juan Emilio', email: 'juanemilio@gmail.com' },
  ];

  return (
    <div className="usuarios-container">
      <NavBarAdmin /> {/* Incluye el componente NavBarAdmin aquí */}
      <main className="main-content">
        <div className="header">
          <h2 className="title">Administradores</h2>
          <button className="create-button" type="button">
            Crear administrador
          </button>
        </div>

        <section className="admin-section">
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="search"
                className="search-input"
                aria-label="Search administrators"
                placeholder=""
              />
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
          </div>

          <ul className="admin-list">
            {administradores.map((admin, index) => (
              <li key={index} className="admin-item">
                <span>{admin.nombre}</span>
                <span>{admin.email}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Usuarios;