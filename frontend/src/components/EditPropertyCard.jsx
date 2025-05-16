import React, { useState } from "react";
import '../styles/EditPropertyCard.css'; // Importa los estilos CSS para este componente
import closeIcon from '../assets/image10.png'; // Importa la imagen del icono de cerrar

// Define el componente funcional PropertyPublicationForm, que recibe una prop 'onClose' para manejar el cierre del formulario
const EditPropertyCard = ({ onClose }) => {
  // Define estados locales para gestionar los valores de los campos del formulario
  const [propertyImages, setPropertyImages] = useState([
    { id: 1, name: 'Imagen casa 1' },
    { id: 2, name: 'Imagen casa 1' },
    { id: 3, name: 'Imagen casa 1' },
    { id: 4, name: 'Imagen casa 1' },
    { id: 5, name: 'Imagen casa 1' },
    { id: 6, name: 'Imagen casa 1' }
  ]);
  
  // Estado para los detalles de la propiedad
  const [propertyDetails, setPropertyDetails] = useState({
    rooms: '',
    bathrooms: '',
    parking: '',
    patio: '',
    levels: '',
    constructionYear: '',
    location: '',
    neighborhood: '',
    floorType: '',
    lotSize: '',
    height: '',
    description: '',
    price: ''
  });

  // Prevenir el arrastre de elementos en el formulario
  useEffect(() => {
    const preventDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    const formContainer = document.querySelector('.property-form-container');
    if (formContainer) {
      formContainer.addEventListener('dragstart', preventDrag);
      
      return () => {
        formContainer.removeEventListener('dragstart', preventDrag);
      };
    }
  }, []);

  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Manejador para cambios en los campos del formulario
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Manejador para eliminar una imagen
  const handleRemoveImage = (id) => {
    setPropertyImages(prevImages => prevImages.filter(img => img.id !== id));
  };

  // Manejador para cargar una nueva imagen
  const handleImageUpload = () => {
    console.log('Cargar imagen');
  };

  // Manejador para guardar los cambios
  const handleSaveChanges = () => {
    console.log('Guardar cambios:', {
      images: propertyImages,
      details: propertyDetails
    });
    onClose();
  };

  // Prevenir que el clic en el overlay cierre el modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="property-form-overlay" onClick={handleOverlayClick}>
      <div className="property-form-container">
        {/* Encabezado del formulario */}
        <div className="property-form-header">
          <h2>Información de la publicación</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Contenido principal del formulario */}
        <div className="property-form-content">
          {/* Sección de imágenes */}
          <div className="property-images-section">
            <h3>Imágenes de la propiedad</h3>
            <div className="images-list">
              {propertyImages.map((image) => (
                <div key={image.id} className="image-item">
                  <div className="image-preview">
                    <span>{image.name}</span>
                  </div>
                  <button 
                    className="remove-image-button" 
                    onClick={() => handleRemoveImage(image.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button className="upload-image-button" onClick={handleImageUpload}>
              <span className="icon">⬆</span> Cargar Imagen
            </button>
          </div>

          {/* Sección de detalles y dimensiones */}
          <div className="property-details-section">
            <h3>Detalles y dimensiones de la propiedad</h3>
            
            <div className="details-grid">
              {/* Primera fila: habitaciones, baños, parqueo */}
              <div className="form-group">
                <input
                  type="text"
                  name="rooms"
                  value={propertyDetails.rooms}
                  onChange={handleDetailsChange}
                  placeholder="Cant. habitaciones"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="bathrooms"
                  value={propertyDetails.bathrooms}
                  onChange={handleDetailsChange}
                  placeholder="Cant. baños"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="parking"
                  value={propertyDetails.parking}
                  onChange={handleDetailsChange}
                  placeholder="Parqueo"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              {/* Segunda fila: patio, niveles, año */}
              <div className="form-group">
                <input
                  type="text"
                  name="patio"
                  value={propertyDetails.patio}
                  onChange={handleDetailsChange}
                  placeholder="Patio"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="levels"
                  value={propertyDetails.levels}
                  onChange={handleDetailsChange}
                  placeholder="Cantidad de niveles"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="constructionYear"
                  value={propertyDetails.constructionYear}
                  onChange={handleDetailsChange}
                  placeholder="Año de construcción"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              {/* Tercera fila: colonia/barrio (ancho completo) */}
              <div className="form-group full-width">
                <input
                  type="text"
                  name="neighborhood"
                  value={propertyDetails.neighborhood}
                  onChange={handleDetailsChange}
                  placeholder="Donde queda, ejemplo: Colonia Escalon"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              {/* Cuarta fila: ubicación (ancho completo) */}
              <div className="form-group full-width">
                <input
                  type="text"
                  name="location"
                  value={propertyDetails.location}
                  onChange={handleDetailsChange}
                  placeholder="Ubicación"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              {/* Quinta fila: tipo de piso, tamaño de lote, altura */}
              <div className="form-group">
                <input
                  type="text"
                  name="floorType"
                  value={propertyDetails.floorType}
                  onChange={handleDetailsChange}
                  placeholder="Tipo de piso"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lotSize"
                  value={propertyDetails.lotSize}
                  onChange={handleDetailsChange}
                  placeholder="Tamaño del lote"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="height"
                  value={propertyDetails.height}
                  onChange={handleDetailsChange}
                  placeholder="Altura"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>

              {/* Sexta fila: descripción (ancho completo) */}
              <div className="form-group full-width">
                <textarea
                  name="description"
                  value={propertyDetails.description}
                  onChange={handleDetailsChange}
                  placeholder="Descripción"
                  rows="6"
                  className="form-textarea"
                  style={{color: '#333'}}
                ></textarea>
              </div>

              {/* Séptima fila: precio */}
              <div className="form-group">
                <input
                  type="text"
                  name="price"
                  value={propertyDetails.price}
                  onChange={handleDetailsChange}
                  placeholder="Precio"
                  className="form-input"
                  style={{color: '#333'}}
                />
              </div>
            </div>

            {/* Botón para guardar cambios */}
            <div className="form-actions">
              <button 
                type="button" 
                className="save-changes-button" 
                onClick={handleSaveChanges}
              >
                <span className="icon">💾</span> Guardar cambios
              </button>
            </div>
          </div>
        </div>
        
        {/* Pie de página del formulario */}
        <div className="form-footer">
          <span className="publication-date">Fecha Publicación: 26 de febrero de 2024</span>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyCard;