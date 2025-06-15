import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import "../styles/PropertyCategories.css";
import { useNavigate, useLocation } from 'react-router-dom';
import PropertyCategoriesCards from "../components/PropertyCategoriesCards";
import useProperties from "../components/Properties/Hooks/useProperties";

const PropertyCategories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener la categoría seleccionada desde el estado de navegación
  const selectedCategory = location.state?.selectedCategory;
  
  // Usar el hook con el categoryId para filtrar las propiedades
  const { properties, loading, error } = useProperties(selectedCategory?.id);

  // Función que se ejecuta al hacer clic en una tarjeta de propiedad
  const handlePropertyViewClick = (propertyId) => {
    navigate('/propertyView', {
      state: {
        fromCategory: location.pathname,
        propertyId: propertyId,
        selectedCategory: selectedCategory // Mantener la categoría seleccionada
      }
    });
  };

  // Función para navegar de vuelta o mostrar todas las categorías
  const handleShowAllCategories = () => {
    navigate('/propertyCategories', {
      state: { selectedCategory: null }
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="properties-container2">
          <div className="loading-message">
            <p>Cargando propiedades...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="properties-container2">
          <div className="error-message">
            <p>Error al cargar las propiedades: {error}</p>
            <button onClick={handleShowAllCategories} className="retry-button">
              Ver todas las categorías
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-white-50'>
        <div className='container mx-auto px-4 py-6 sm:px-6 lg:px-8'>
          {selectedCategory && (
            <div className="mb-8 text-center sm:text-left">
              <p className="text-sm sm:text-base text-gray-600">
                {properties.length} {properties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
              </p>
            </div>
          )}
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
            {properties.map((property) => (
              <PropertyCategoriesCards
                key={property._id}
                image={property.images && property.images.length > 0 ? property.images[0].image : '/default-house.png'}
                location={property.location || property.name}
                name={property.name}
                price={property.price}
                category={property.category?.propertyType || selectedCategory?.propertyType}
                onClick={() => handlePropertyViewClick(property._id)}
              />
            ))}
          </div>
          
          {properties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-lg text-gray-500">No se encontraron propiedades</p>
              <p className="text-sm text-gray-400 mt-1">Prueba ajustando los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyCategories;