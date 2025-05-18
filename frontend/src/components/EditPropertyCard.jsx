import React, { useState } from "react";
import '../styles/EditPropertyCard.css'; 
import closeIcon from '../assets/image10.png'; 
import pictureIcon from "../assets/image35.png"; 
import uploadIcon from "../assets/subir.png";
import saveIcon from "../assets/guardar.png";
import {usePropertyForm} from '../components/Properties/Hooks/usePropertyForm';
import {usePropertyImages} from '../components/Properties/Hooks/usePropertyImages';
import {usePropertySubmit} from '../components/Properties/Hooks/usePropertySubmit';

const EditPropertyCard = ({isOpen, onClose, property}) => {

  const initialImages = [
    {id: 1, name: "Imagen casa 1"},
    {id: 2, name: "Imagen casa 1"},
    {id: 3, name: "Imagen casa 1"},
    {id: 4, name: "Imagen casa 1"},
    {id: 5, name: "Imagen casa 1"},
    {id: 6, name: "Imagen casa 1"}
  ];

  const {formData, handleChange} = usePropertyForm(property);
  const {images, handleRemoveImage, handleImageUpload} = usePropertyImages(initialImages);
  const {handleSubmit} = usePropertySubmit(formData, images, onClose);
  
  if(!isOpen) return null;

  return (
    <div className="edit-property-modal-overlay">
      <div className="edit-property-modal">
        <div className="edit-property-header">
          <h2>Información de la publicación</h2>
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
                    type="text" 
                    name="bedrooms" 
                    placeholder="Cant. habitaciones" 
                    value={formData.bedrooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="bathrooms" 
                    placeholder="Cant. baños" 
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="parking" 
                    placeholder="Parqueo" 
                    value={formData.parking}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="patio" 
                    placeholder="Patio" 
                    value={formData.patio}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="floors" 
                    placeholder="Cantidad de niveles" 
                    value={formData.floors}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="constructionYear" 
                    placeholder="Año de construcción" 
                    value={formData.constructionYear}
                    onChange={handleChange}
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
                  />
                </div>
              </div>
              
              <div className="form-row full-width">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="address" 
                    placeholder="Ubicación" 
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="floorType" 
                    placeholder="Tipo de piso" 
                    value={formData.floorType}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="lotSize" 
                    placeholder="Tamaño del lote" 
                    value={formData.lotSize}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="height" 
                    placeholder="Altura" 
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
                  ></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <div className="form-group price-group">
                  <input 
                    type="text" 
                    name="price" 
                    placeholder="Precio" 
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="save-button">
                  <img src={saveIcon} alt="Guardar" />
                  <span>Guardar Cambios</span>
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