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
import useSalesData from '../components/Sales/Hooks/useSalesData';
import useEarningsData from '../components/Sales/Hooks/useEarningsData';
import OrangeButton from '../components/OrangeButton';

const Dashboard = () => {

  const { isEditModalOpen, openEditModal, closeEditModal } = useEditProperty();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { salesData, loading, error, refetch } = useSalesData();
  const { totalSales, totalEarnings, loading2, error2, refreshData } = useEarningsData();

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }

    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }

    return num.toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (error2) {
    return (
      <div className="error-container">
        <p>Error al cargar los datos: {error}</p>
        <button onClick={refreshData} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

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

  if (loading) {
    return (
      <article className="dashboard-box properties-box">
        <p className="box-title">Propiedades</p>
        <div className="loading-container">
          <p>Cargando datos de ventas...</p>
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="dashboard-box properties-box">
        <p className="box-title">Propiedades</p>
        <div className="error-container">
          <p>Error al cargar los datos: {error}</p>
          <button onClick={refetch} className="retry-button">
            Reintentar
          </button>
        </div>
      </article>
    );
  }

  return (
    <>
      <NavBarAdmin /> {/* Renderiza el componente NavBarAdmin aquí */}

      {/* Main orange cards */}
      <main className="dashboard-main">
        {/* Left orange card */}
        <section className="dashboard-card greeting-card">
          <div className="greeting-text">
            <p className="greeting-hello">
              ¡Bienvenido Administrador!
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
            {loading ? (
              <div className="loading-spinner">...</div>
            ) : (
              formatNumber(totalSales)
            )}
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
            {loading ? (
              <div className="loading-spinner">...</div>
            ) : (
              formatCurrency(totalEarnings)
            )}
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
          <OrangeButton onClick={openModal} centered>
            LEER MÁS
          </OrangeButton>
        </article>

        {/* Right properties box */}
        <article className="dashboard-box properties-box">
          <p className="box-title">Propiedades</p>
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
                {salesData.length > 0 ? (
                  salesData.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.propertyName}</td>
                      <td>{sale.price}</td>
                      <td>{sale.publishDate}</td>
                      <td>
                        <span className={`status ${sale.paymentStatus.toLowerCase()}`}>
                          {sale.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No hay ventas registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="button-container">
            <OrangeButton onClick={openEditModal}>
              Crear publicación
            </OrangeButton>
          </div>
        </article>
      </section>

      <AddPropertyCard isOpen={isEditModalOpen} onClose={closeEditModal} />
      <HomeClickModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Dashboard;