import React, { useState } from 'react';
import '../styles/Dashboard.css'; // Importa el archivo CSS para estilos específicos del Dashboard
import sol from '../assets/sol.png';
import imgConfig from '../assets/imgConfig.png';
import imgShop from '../assets/imgShop.png';
import payment from '../assets/payment.png';
import NavBarAdmin from '../components/NavBarAdmin'; // Importa el componente NavBarAdmin
import AddPropertyCard from '../components/AddPropertyCard';
import useEditProperty from "../components/Properties/Hooks/useEditProperty";
import HomeClickModal from '../components/HomeClickModal';

const Dashboard = () => {

  const { isEditModalOpen, openEditModal, closeEditModal } = useEditProperty();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Función para obtener la fecha actual en formato español
  const obtenerFechaActual = () => {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    // Capitalizar primera letra y formatear
    const fechaPartes = fechaFormateada.split(', ');
    if (fechaPartes.length === 2) {
      const dia = fechaPartes[0].charAt(0).toUpperCase() + fechaPartes[0].slice(1);
      const fechaNum = fechaPartes[1].split(' de ');
      return `${dia} ${fechaNum[0]} de ${fechaNum[1]}, ${fechaNum[2]}`;
    }
    return fechaFormateada;
  };

  // Función para obtener la hora actual
  const obtenerHoraActual = () => {
    const fecha = new Date();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'p.m.' : 'a.m.';
    const horasFormato12 = horas % 12 || 12;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    return `${horasFormato12}:${minutosFormateados} ${ampm}`;
  };

  return (
    <>
      <NavBarAdmin /> {/* Renderiza el componente NavBarAdmin aquí */}

      {/* Main orange cards */}
      <main className="dashboard-main">
        {/* Left orange card */}
        <section className="dashboard-card greeting-card">
          <div className="greeting-text">
            <p className="greeting-hello">
              ¡Buenos días, Ricky!
              <img src={sol} alt="Icono del sol" className="sun-icon" />
            </p>
            <p className="greeting-date">
              {obtenerFechaActual()}
            </p>
            <p className="greeting-time">
              {obtenerHoraActual()}
            </p>
          </div>
          <img
            src={imgConfig}
            alt="Icono de configuración"
            className="config-icon"
          />
        </section>

        {/* Middle orange card */}
        <section className="dashboard-card metrics-card">
          <div className="metric-value">
            80
          </div>
          <div className="metric-label">
            Ventas
          </div>
          <img
            src={imgShop}
            alt="Icono de carrito de compras"
            className="metric-icon"
          />
        </section>

        {/* Right orange card */}
        <section className="dashboard-card metrics-card">
          <div className="metric-value">
            7,842
          </div>
          <div className="metric-label">
            Ganancias
          </div>
          <img
            src={payment}
            alt="Icono de pago"
            className="metric-icon"
          />
        </section>
      </main>

      {/* Bottom content */}
      <section className="dashboard-bottom">
        {/* Left description box */}
        <article className="dashboard-box description-box">
          <p className="box-title">
            Descripción
          </p>
          <p className="description-text">
            HomeClick es una tienda en línea que ofrece una solución integral para
            el mercado inmobiliario, brindando acceso a una amplia variedad de casas
            en diferentes ubicaciones. A través de su sitio web y aplicación móvil,
            los usuarios pueden navegar por un catálogo actualizado de propiedades,
            realizar compras seguras, dejar reseñas y recibir notificaciones sobre
            novedades y oportunidades del sector.
          </p>
          <button className="orange-button centered-button" onClick={openModal}>
            LEER MÁS
          </button>
        </article>

        {/* Right properties box */}
        <article className="dashboard-box properties-box">
          <p className="box-title">
            Propiedades
          </p>
          <div className="table-container">
            <table className="properties-table">
              <thead>
                <tr>
                  <th>Nombre de la propiedad</th>
                  <th>Precio</th>
                  <th>Fecha de publicación</th>
                  <th>Estado de pago</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cabaña acogedora en zona boscosa</td>
                  <td>$80,000</td>
                  <td>26/02/2020</td>
                  <td>Pendiente</td>
                </tr>
                <tr>
                  <td>Loft minimalista con diseño abierto</td>
                  <td>$110,000</td>
                  <td>01/08/2010</td>
                  <td>Pagado</td>
                </tr>
                <tr>
                  <td>Apartamento con vista panorámica</td>
                  <td>$95,000</td>
                  <td>01/07/2006</td>
                  <td>Pagado</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <button className="orange-button" onClick={openEditModal}>
              Crear publicación
            </button>
          </div>
        </article>
      </section>

      <AddPropertyCard isOpen={isEditModalOpen} onClose={closeEditModal} />
      <HomeClickModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Dashboard;