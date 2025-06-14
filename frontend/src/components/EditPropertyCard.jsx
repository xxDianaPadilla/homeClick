import React, { useState, useEffect } from "react";
import '../styles/EditPropertyCard.css';
import closeIcon from '../assets/image10.png';
import pictureIcon from "../assets/image35.png";
import uploadIcon from "../assets/subir.png";
import saveIcon from "../assets/guardar.png";
import { usePropertyForm } from '../components/Properties/Hooks/usePropertyForm';
import { usePropertyImages } from '../components/Properties/Hooks/usePropertyImages';
import { usePropertySubmit } from '../components/Properties/Hooks/usePropertySubmit';
import { useCategories } from "./Categories/hooks/useCategories";

const EditPropertyCard = ({ isOpen, onClose, property }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const {
    categories,
    isLoadingCategories,
    categoriesError
  } = useCategories();

  const processedProperty = property ? {
    ...property,
    ...extractPropertyData(property)
  } : null;

  const {
    register,
    handleSubmit: handleFormSubmit,
    errors,
    isSubmitting,
    setValue,
    getValues,
    validationRules,
    handleCustomChange,
    prepareDataForSubmit,
    getFieldError,
    hasFieldError
  } = usePropertyForm(processedProperty);

  const { images, handleRemoveImage, handleImageUpload, setImages } = usePropertyImages(property?.images || []);
  const { handleSubmit: handlePropertySubmit } = usePropertySubmit(
    null,
    images,
    onClose,
    property,
    setIsLoading,
    setLoadingMessage
  );

  useEffect(() => {
    if (property && isOpen) {
      console.log('Property data:', property);
      
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

      if (property.category) {
        const categoryId = property.category._id?.$oid || property.category._id || property.category.id || property.category;
        setValue('category', categoryId);
      }
    }
  }, [property, isOpen, setImages, setValue]); 

  function extractPropertyData(property) {
    const extracted = {};

    if (property.details && Array.isArray(property.details)) {
      property.details.forEach(detail => {
        const lowerDetail = detail.toLowerCase();

        if (lowerDetail.includes('habitación') || lowerDetail.includes('dormitorio')) {
          const match = detail.match(/(\d+)/);
          if (match && !property.rooms) extracted.rooms = parseInt(match[1]);
        }

        if (lowerDetail.includes('baño')) {
          const match = detail.match(/(\d+)/);
          if (match && !property.bathrooms) extracted.bathrooms = parseInt(match[1]);
        }

        if (lowerDetail.includes('parqueo') || lowerDetail.includes('garaje')) {
          if (property.parkingLot === undefined) extracted.parkingLot = true;
        }

        if (lowerDetail.includes('patio') || lowerDetail.includes('jardín')) {
          if (property.patio === undefined) extracted.patio = true;
        }

        if (lowerDetail.includes('año') || lowerDetail.includes('construc')) {
          const match = detail.match(/(\d{4})/);
          if (match && !property.constructionYear) extracted.constructionYear = match[1];
        }
      });
    }

    if (property.dimensions && Array.isArray(property.dimensions)) {
      property.dimensions.forEach(dimension => {
        const lowerDimension = dimension.toLowerCase();

        if (lowerDimension.includes('nivel') || lowerDimension.includes('piso')) {
          const match = dimension.match(/(\d+)/);
          if (match && !property.floors) extracted.floors = parseInt(match[1]);
        }

        if (lowerDimension.includes('lote') || lowerDimension.includes('terreno')) {
          const match = dimension.match(/(\d+(?:\.\d+)?)/);
          if (match && !property.lotSize) extracted.lotSize = match[1];
        }

        if (lowerDimension.includes('altura') || lowerDimension.includes('alto')) {
          const match = dimension.match(/(\d+(?:\.\d+)?)/);
          if (match && !property.height) extracted.height = match[1];
        }
      });
    }

    return extracted;
  }

  const onSubmit = async (formData) => {
    if (images.length === 0) {
      alert('Por favor sube al menos una imagen');
      return;
    }

    const processedData = prepareDataForSubmit(formData);

    await handlePropertySubmit(null, processedData);
  };

  const handleFieldChange = (fieldName) => (e) => {
    const value = e.target.value;
    handleCustomChange(fieldName, value);
  };

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
            <form onSubmit={handleFormSubmit(onSubmit)}>

              <div className="form-row full-width">
                <div className="form-group">
                  <select
                    {...register("category", validationRules.category)}
                    disabled={isLoading || isSubmitting || isLoadingCategories}
                    className={hasFieldError('category') ? 'error' : ''}
                  >
                    <option value="">Seleccionar tipo de propiedad</option>
                    {isLoadingCategories ? (
                      <option disabled>Cargando categorías...</option>
                    ) : categoriesError ? (
                      <option disabled>Error al cargar categorías</option>
                    ) : (
                      categories.map((category) => {
                        // Extraer el ID de la categoría correctamente
                        const categoryId = category._id?.$oid || category._id || category.id;
                        return (
                          <option key={categoryId} value={categoryId}>
                            {category.propertyType}
                          </option>
                        );
                      })
                    )}
                  </select>
                  {hasFieldError('category') && (
                    <span className="error-message">{getFieldError('category')}</span>
                  )}
                  {categoriesError && (
                    <span className="error-message">Error al cargar categorías: {categoriesError}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    {...register("bedrooms", validationRules.bedrooms)}
                    type="number"
                    placeholder="Cant. habitaciones"
                    min="0"
                    className={hasFieldError("bedrooms") ? "error" : ""}
                  />
                  {hasFieldError("bedrooms") && (
                    <span className="error-message">{getFieldError("bedrooms")}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    {...register("bathrooms", validationRules.bathrooms)}
                    type="number"
                    placeholder="Cant. baños"
                    min="0"
                    className={hasFieldError("bathrooms") ? "error" : ""}
                  />
                  {hasFieldError("bathrooms") && (
                    <span className="error-message">{getFieldError("bathrooms")}</span>
                  )}
                </div>
                <div className="form-group">
                  <select
                    {...register("parking")}
                    className={hasFieldError("parking") ? "error" : ""}
                  >
                    <option value="">Parqueo</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                  {hasFieldError("parking") && (
                    <span className="error-message">{getFieldError("parking")}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select
                    {...register("patio")}
                    className={hasFieldError("patio") ? "error" : ""}
                  >
                    <option value="">Patio</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                  {hasFieldError("patio") && (
                    <span className="error-message">{getFieldError("patio")}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    {...register("floors", validationRules.floors)}
                    type="number"
                    placeholder="Cantidad de niveles"
                    min="1"
                    className={hasFieldError("floors") ? "error" : ""}
                  />
                  {hasFieldError("floors") && (
                    <span className="error-message">{getFieldError("floors")}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    {...register("constructionYear", validationRules.constructionYear)}
                    type="number"
                    placeholder="Año de construcción"
                    min="1900"
                    max={new Date().getFullYear()}
                    className={hasFieldError("constructionYear") ? "error" : ""}
                  />
                  {hasFieldError("constructionYear") && (
                    <span className="error-message">{getFieldError("constructionYear")}</span>
                  )}
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-group">
                  <input
                    {...register("location", validationRules.location)}
                    type="text"
                    placeholder="Donde queda, ejemplo: Colonia Escalon"
                    className={hasFieldError("location") ? "error" : ""}
                  />
                  {hasFieldError("location") && (
                    <span className="error-message">{getFieldError("location")}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    {...register("name", validationRules.name)}
                    type="text"
                    placeholder="Nombre de la propiedad"
                    className={hasFieldError("name") ? "error" : ""}
                  />
                  {hasFieldError("name") && (
                    <span className="error-message">{getFieldError("name")}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    {...register("lotSize", validationRules.lotSize)}
                    type="text"
                    placeholder="Tamaño del lote (m²)"
                    className={hasFieldError("lotSize") ? "error" : ""}
                  />
                  {hasFieldError("lotSize") && (
                    <span className="error-message">{getFieldError("lotSize")}</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    {...register("height", validationRules.height)}
                    type="text"
                    placeholder="Altura (m)"
                    className={hasFieldError("height") ? "error" : ""}
                  />
                  {hasFieldError("height") && (
                    <span className="error-message">{getFieldError("height")}</span>
                  )}
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-group description-group">
                  <textarea
                    {...register("description", validationRules.description)}
                    placeholder="Descripción"
                    rows="4"
                    className={hasFieldError("description") ? "error" : ""}
                  ></textarea>
                  {hasFieldError("description") && (
                    <span className="error-message">{getFieldError("description")}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <div className="form-group price-group">
                  <input
                    {...register("price", validationRules.price)}
                    type="text"
                    placeholder="Precio ($)"
                    onChange={handleFieldChange("price")}
                    className={hasFieldError("price") ? "error" : ""}
                  />
                  {hasFieldError("price") && (
                    <span className="error-message">{getFieldError("price")}</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="save-button"
                  disabled={isLoading || isSubmitting}
                >
                  <img src={saveIcon} alt="Guardar" />
                  <span>
                    {isLoading || isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                  </span>
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