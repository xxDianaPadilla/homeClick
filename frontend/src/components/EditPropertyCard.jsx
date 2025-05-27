import React, { useState, useEffect } from "react";
import '../styles/EditPropertyCard.css';
import closeIcon from '../assets/image10.png';
import pictureIcon from "../assets/image35.png";
import uploadIcon from "../assets/subir.png";
import saveIcon from "../assets/guardar.png";
import { usePropertyForm } from '../components/Properties/Hooks/usePropertyForm';
import { usePropertyImages } from '../components/Properties/Hooks/usePropertyImages';
import { usePropertySubmit } from '../components/Properties/Hooks/usePropertySubmit';

const EditPropertyCard = ({ isOpen, onClose, property }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Procesar la propiedad antes de pasarla al hook
  const processedProperty = property ? {
    ...property,
    // Extraer datos adicionales si existen
    ...extractPropertyData(property)
  } : null;

  // Inicializar hooks con los datos procesados
  const { formData, handleChange, setFormData } = usePropertyForm(processedProperty);
  const { images, handleRemoveImage, handleImageUpload, setImages } = usePropertyImages(property?.images || []);
  const { handleSubmit } = usePropertySubmit(
    formData,
    images,
    onClose,
    property,
    setIsLoading,
    setLoadingMessage
  );

  useEffect(() => {
    if (property && isOpen) {
      console.log('Property data:', property);
      
      // Procesar imágenes
      const imagesToUse = property.thumbnails || property.images || [];
      if (imagesToUse && Array.isArray(imagesToUse) && imagesToUse.length > 0) {
        const processedImages = imagesToUse.map((img, index) => ({
          id: index + 1,
          name: `Imagen propiedad ${index + 1}`,
          path: typeof img === 'string' ? img : (img.image || img.url || img),
          isExisting: true
        }));
        setImages(processedImages);
      }
    }
  }, [property, isOpen, setImages]); // Remover setFormData del array de dependencias

  // Función para extraer datos de details y dimensions
  function extractPropertyData(property) {
    const extracted = {};

    // Solo extraer de details si existe y es un array
    if (property.details && Array.isArray(property.details)) {
      property.details.forEach(detail => {
        const lowerDetail = detail.toLowerCase();

        // Extraer habitaciones
        if (lowerDetail.includes('habitación') || lowerDetail.includes('dormitorio')) {
          const match = detail.match(/(\d+)/);
          if (match && !property.rooms) extracted.rooms = parseInt(match[1]);
        }

        // Extraer baños
        if (lowerDetail.includes('baño')) {
          const match = detail.match(/(\d+)/);
          if (match && !property.bathrooms) extracted.bathrooms = parseInt(match[1]);
        }

        // Extraer parqueo
        if (lowerDetail.includes('parqueo') || lowerDetail.includes('garaje')) {
          if (property.parkingLot === undefined) extracted.parkingLot = true;
        }

        // Extraer patio
        if (lowerDetail.includes('patio') || lowerDetail.includes('jardín')) {
          if (property.patio === undefined) extracted.patio = true;
        }

        // Extraer año de construcción
        if (lowerDetail.includes('año') || lowerDetail.includes('construc')) {
          const match = detail.match(/(\d{4})/);
          if (match && !property.constructionYear) extracted.constructionYear = match[1];
        }
      });
    }

    // Solo extraer de dimensions si existe y es un array
    if (property.dimensions && Array.isArray(property.dimensions)) {
      property.dimensions.forEach(dimension => {
        const lowerDimension = dimension.toLowerCase();

        // Extraer niveles/pisos
        if (lowerDimension.includes('nivel') || lowerDimension.includes('piso')) {
          const match = dimension.match(/(\d+)/);
          if (match && !property.floors) extracted.floors = parseInt(match[1]);
        }

        // Extraer tamaño del lote
        if (lowerDimension.includes('lote') || lowerDimension.includes('terreno')) {
          const match = dimension.match(/(\d+(?:\.\d+)?)/);
          if (match && !property.lotSize) extracted.lotSize = match[1];
        }

        // Extraer altura
        if (lowerDimension.includes('altura') || lowerDimension.includes('alto')) {
          const match = dimension.match(/(\d+(?:\.\d+)?)/);
          if (match && !property.height) extracted.height = match[1];
        }
      });
    }

    return extracted;
  }

  if (!isOpen) return null;

  return (
    <div className="edit-property-modal-overlay">
      <div className="edit-property-modal">
        <div className="edit-property-header">
          <h2>Editar información de la publicación</h2>
          <button className="close-button" onClick={onClose}>
            <img src={closeIcon} alt="Cerrar" />
          </button>
        </div>

        {isLoading && (
          <div className="loading-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem' }}>Cargando...</div>
              <div>{loadingMessage}</div>
            </div>
          </div>
        )}

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
                multiple
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
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="Cant. baños"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <select
                    name="parking"
                    value={formData.parking}
                    onChange={handleChange}
                  >
                    <option value="">Parqueo</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select
                    name="patio"
                    value={formData.patio}
                    onChange={handleChange}
                  >
                    <option value="">Patio</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="floors"
                    placeholder="Cantidad de niveles"
                    value={formData.floors}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="constructionYear"
                    placeholder="Año de construcción"
                    value={formData.constructionYear}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-group">
                  <input
                    type="text"
                    name="location"
                    placeholder="Donde queda, ejemplo: Colonia Escalon"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nombre de la propiedad"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lotSize"
                    placeholder="Tamaño del lote (m²)"
                    value={formData.lotSize}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="height"
                    placeholder="Altura (m)"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-group description-group">
                  <textarea
                    name="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <div className="form-group price-group">
                  <input
                    type="text"
                    name="price"
                    placeholder="Precio ($)"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="save-button" disabled={isLoading}>
                  <img src={saveIcon} alt="Guardar" />
                  <span>{isLoading ? 'Guardando...' : 'Guardar Cambios'}</span>
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