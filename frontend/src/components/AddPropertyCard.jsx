import React, { useState, useEffect } from "react";
import '../styles/EditPropertyCard.css'; 
import closeIcon from '../assets/image10.png'; 
import pictureIcon from "../assets/image35.png"; 
import uploadIcon from "../assets/subir.png";
import saveIcon from "../assets/guardar.png";
import useFetchProperties from "../components/Properties/Hooks/useFetch.jsx";

const EditPropertyCard = ({isOpen, onClose, property}) => {

  const initialImages = [
    {id: 1, name: "Imagen casa 1"},
    {id: 2, name: "Imagen casa 1"},
    {id: 3, name: "Imagen casa 1"},
    {id: 4, name: "Imagen casa 1"},
    {id: 5, name: "Imagen casa 1"},
    {id: 6, name: "Imagen casa 1"}
  ];

  // Usar el hook principal que tiene la conexión al backend
  const { 
    propertyForm, 
    setPropertyForm, 
    createProperty, 
    updateProperty, 
    handleInputChange 
  } = useFetchProperties();

  // Estado local para las imágenes
  const [images, setImages] = useState(initialImages);

  // Efecto para cargar los datos de la propiedad si estamos editando
  useEffect(() => {
    if (property && isOpen) {
      setPropertyForm({
        images: property.images || [],
        name: property.name || "",
        description: property.description || "",
        location: property.location || "",
        price: property.price || "",
        floors: property.floors || 1,
        lotSize: property.lotSize || "",
        height: property.height || "",
        constructionYear: property.constructionYear || "",
        rooms: property.rooms || 1,
        bathrooms: property.bathrooms || 1,
        parkingLot: property.parkingLot || false,
        patio: property.patio || false,
        categoryId: property.categoryId || ""
      });
    }
  }, [property, isOpen, setPropertyForm]);

  // Función para manejar la eliminación de imágenes
  const handleRemoveImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  // Función para manejar la subida de imágenes
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        id: Date.now(),
        name: file.name,
        file: file
      };
      setImages([...images, newImage]);
      
      // También actualizar el estado del formulario principal
      setPropertyForm(prev => ({
        ...prev,
        images: [...prev.images, file]
      }));
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (property && property.id) {
        // Si hay una propiedad, estamos editando
        await updateProperty(property.id, e);
      } else {
        // Si no hay propiedad, estamos creando
        await createProperty(e);
      }
      
      // Cerrar el modal después de guardar
      onClose();
    } catch (error) {
      console.error('Error al guardar la propiedad:', error);
    }
  };

  // Función personalizada para manejar cambios en los inputs
  const handleCustomInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Mapear los nombres de los campos del formulario a los del backend
    const fieldMapping = {
      'bedrooms': 'rooms',
      'bathrooms': 'bathrooms',
      'parking': 'parkingLot',
      'patio': 'patio',
      'floors': 'floors',
      'constructionYear': 'constructionYear',
      'location': 'location',
      'address': 'location', 
      'lotSize': 'lotSize',
      'height': 'height',
      'description': 'description',
      'price': 'price'
    };

    const backendFieldName = fieldMapping[name] || name;
    
    setPropertyForm(prev => ({
      ...prev,
      [backendFieldName]: type === 'checkbox' ? checked : value
    }));
  };
  
  if(!isOpen) return null;

  return (
    <div className="edit-property-modal-overlay">
      <div className="edit-property-modal">
        <div className="edit-property-header">
          <h2>{property ? 'Editar Publicación' : 'Información de la publicación'}</h2>
          <button className="close-button" onClick={onClose}>
            <img src={closeIcon} alt="Cerrar" />
          </button>
        </div>
        
        <div className="edit-property-content">
          <div className="edit-property-left">
            <h3>Imágenes de la propiedad</h3>
            <div className="property-images-list">
              {images.map((image) => (
                <div key={image.id} className="property-image-item">
                  <div className="image-item-content">
                    <img src={pictureIcon} alt="Icono de imagen" className="picture-icon" />
                    <span className="image-name">{image.name}</span>
                    <span className="image-path">{image.path}</span>
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
            <label className="upload-image-button">
              <img src={uploadIcon} alt="Subir" />
              <span>Cargar Imagen</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>
          
          <div className="edit-property-right">
            <h3>Detalles y dimensiones de la propiedad</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="number" 
                    name="bedrooms" 
                    placeholder="Cant. habitaciones" 
                    value={propertyForm.rooms || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="number" 
                    name="bathrooms" 
                    placeholder="Cant. baños" 
                    value={propertyForm.bathrooms || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
                <div className="form-group">
                  <select 
                    name="parking" 
                    value={propertyForm.parkingLot ? 'true' : 'false'}
                    onChange={handleCustomInputChange}
                  >
                    <option value="">Parqueo</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <select 
                    name="patio" 
                    value={propertyForm.patio ? 'true' : 'false'}
                    onChange={handleCustomInputChange}
                  >
                    <option value="">Patio</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <input 
                    type="number" 
                    name="floors" 
                    placeholder="Cantidad de niveles" 
                    value={propertyForm.floors || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="number" 
                    name="constructionYear" 
                    placeholder="Año de construcción" 
                    value={propertyForm.constructionYear || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row full-width">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="location" 
                    placeholder="Donde queda, ejemplo: Colonia Escalon" 
                    value={propertyForm.location || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row full-width">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Nombre de la propiedad" 
                    value={propertyForm.name || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="lotSize" 
                    placeholder="Tamaño del lote" 
                    value={propertyForm.lotSize || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="height" 
                    placeholder="Altura" 
                    value={propertyForm.height || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row full-width">
                <div className="form-group description-group">
                  <textarea 
                    name="description" 
                    placeholder="Descripción" 
                    value={propertyForm.description || ''}
                    onChange={handleCustomInputChange}
                  ></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <div className="form-group price-group">
                  <input 
                    type="text" 
                    name="price" 
                    placeholder="Precio" 
                    value={propertyForm.price || ''}
                    onChange={handleCustomInputChange}
                  />
                </div>
                <button type="submit" className="save-button">
                  <img src={saveIcon} alt="Guardar" />
                  <span>{property ? 'Actualizar' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyCard;