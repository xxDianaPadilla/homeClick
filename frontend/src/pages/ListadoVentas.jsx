import React, { useState, useEffect } from 'react';
import NavBarAdmin from '../components/NavBarAdmin';
import VentasCards from '../components/VentasCards';
import SaleDetailModal from '../components/SaleDeatailModal';

const ListadoVentas = () => {

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/sales');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSales(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching sales: ', error);
      setError('Error al cargar las ventas. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (sale, customer, cart) => {
    setSelectedSale(sale);
    setSelectedCustomer(customer);
    setSelectedCart(cart);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
    setSelectedCustomer(null);
    setSelectedCart(null);
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale._id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || sale.paymentType === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getSalesStats = () => {
    const total = sales.length;
    const pending = sales.filter(sale => sale.status === 'Pendiente').length;
    const paid = sales.filter(sale => sale.status === 'Pagado').length;

    return { total, pending, paid };
  };

  const stats = getSalesStats();

  if (loading) {
    return (
      <div className='ventas-page'>
        <NavBarAdmin />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando ventas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='ventas-page'>
        <NavBarAdmin />
        <div className="error-container">
          <div className="error-message">
            <h3>Error al cargar las ventas</h3>
            <p>{error}</p>
            <button onClick={fetchSales} className="retry-button">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='ventas-page'>
      <NavBarAdmin />

      <div className="ventas-container">
        <div className="ventas-header">
          <h1>Listado de Ventas</h1>
          <div className="stats-cards">
            <div className="stat-card total">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total Ventas</span>
              </div>
            </div>
            <div className="stat-card pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <span className="stat-number">{stats.pending}</span>
                <span className="stat-label">Pendientes</span>
              </div>
            </div>
            <div className="stat-card paid">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <span className="stat-number">{stats.paid}</span>
                <span className="stat-label">Pagadas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ventas-filters">
          <div className="search-box">
            <input
              placeholder="Buscar por ID de venta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los estados</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los métodos</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
            </select>
          </div>
        </div>

        <div className="ventas-grid">
          {filteredSales.length > 0 ? (
            filteredSales.map(sale => (
              <VentasCards
                key={sale._id}
                sale={sale}
                onClick={handleCardClick}
              />
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📋</div>
              <h3>No se encontraron ventas</h3>
              <p>No hay ventas que coincidan con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <SaleDetailModal
          sale={selectedSale}
          customer={selectedCustomer}
          shoppingCart={selectedCart}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ListadoVentas;