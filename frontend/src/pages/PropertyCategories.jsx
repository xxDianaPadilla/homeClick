import React from "react"; // Importa la biblioteca React para la creación de componentes.
import Navbar from '../components/Navbar'; // Importa el componente Navbar, que representa la barra de navegación.
import Footer from "../components/Footer"; // Importa el componente Footer, que representa el pie de página.
import "../styles/PropertyCategories.css"; // Importa los estilos CSS específicos para la página de categorías de propiedades.
import house1 from "../assets/image5.png"; // Importa una imagen de casa.
import house2 from "../assets/image6.png"; // Importa otra imagen de casa.
import house3 from "../assets/image7.png"; // Importa una tercera imagen de casa.
import { useNavigate, useLocation } from 'react-router-dom'; // Importa hooks para la navegación y para acceder a la ubicación actual.
import PropertyCategoriesCards from "../components/PropertyCategoriesCards";

// Define el componente funcional PropertyCategories, que muestra una lista de categorías de propiedades (en este caso, casas individuales).
const PropertyCategories = () => {
  // Hook para obtener la función 'navigate' que permite la navegación programática.
  const navigate = useNavigate();
  // Hook para acceder al objeto de ubicación actual, utilizado para pasar información sobre la página de origen.
  const location = useLocation();

  // Función que se ejecuta al hacer clic en una tarjeta de propiedad. Navega a la página de vista de propiedad, pasando el ID de la propiedad y la ruta actual.
  const handlePropertyViewClick = (propertyId) => {
    navigate('/propertyView', {
      state: {
        fromCategory: location.pathname, // Pasa la ruta actual como 'fromCategory' en el estado de la navegación.
        propertyId: propertyId // Pasa el ID de la propiedad seleccionada.
      }
    });
  };

  const properties = [
    {id: '1', image: house1, description: 'Casa en Colonia Escalón'},
    {id: '2', image: house2, description: 'Casa en la zona Rosa'},
    {id: '3', image: house3, description: 'Casa en santa tecla'},
    {id: '4', image: house1, description: 'Casa en Colonia Escalón'},
    {id: '5', image: house2, description: 'Casa en la zona Rosa'},
    {id: '6', image: house3, description: 'Casa en santa tecla'},
    {id: '7', image: house1, description: 'Casa en Colonia Escalón'},
    {id: '8', image: house2, description: 'Casa en la zona rosa'},
    {id: '9', image: house3, description: 'Casa en santa tecla'}
  ];

  // Renderiza la estructura de la página de categorías de propiedades.
  return(
    <>
      {/* Renderiza el componente Navbar en la parte superior. */}
      <Navbar/>

      {/* Contenedor principal para la cuadrícula de propiedades. */}
      <div className="properties-container2">
        {/* Cuadrícula que organiza las tarjetas de propiedad. */}
        <div className="properties-grid2">
          {properties.map((property) => (
            <PropertyCategoriesCards key={property.id} image={property.image} description={property.description} onClick={() => handlePropertyViewClick(property.id)}/>
          ))}
        </div>
      </div>

      {/* Renderiza el componente Footer en la parte inferior. */}
      <Footer/>
    </>
  );
};

export default PropertyCategories;