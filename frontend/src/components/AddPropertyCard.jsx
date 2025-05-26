import React, {useState} from "react";
import '../styles/AddPropertyCard.css';
import closeIcon from '../assets/image10.png';
import pictureIcon from "../assets/image35.png";
import uploadIcon from "../assets/subir.png";
import saveIcon from "../assets/guardar.png";
import { usePropertyForm } from '../components/Properties/Hooks/usePropertyForm';
import { usePropertyImages } from '../components/Properties/Hooks/usePropertyImages';
import { usePropertySubmit } from '../components/Properties/Hooks/usePropertySubmit';
import LoadingOverlay from "./LoadingOverlay";

const AddPropertyCard = ({ isOpen, onClose, property }) => {
    const initialImages = property?.images || [];
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const { formData, handleChange, resetForm } = usePropertyForm(property);
    const { images, handleRemoveImage, handleImageUpload, getImagePreview, clearImages } = usePropertyImages(initialImages);

    const { handleSubmit } = usePropertySubmit(
        formData, 
        images, 
        onClose, 
        property, 
        setIsLoading, 
        setLoadingMessage
    );

    const handleClose = () => {
        if (isLoading) return; 
        resetForm();
        clearImages();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="add-property-modal-overlay">
                <div className="add-property-modal">
                    <div className="add-property-header">
                        <h2>{property ? 'Editar propiedad' : 'Información de la publicación'}</h2>
                        <button 
                            className="close-button" 
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            <img src={closeIcon} alt="Cerrar" />
                        </button>
                    </div>

                    <div className="add-property-content">
                        <div className="add-property-left">
                            <h3>Imágenes de la propiedad</h3>
                            <div className="property-images-list">
                                {images.map((image) => (
                                    <div key={image.id} className="property-image-item">
                                        <div className="image-item-content">
                                            <img
                                                src={getImagePreview(image)}
                                                alt="Preview"
                                                className="image-preview"
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    borderRadius: '4px'
                                                }}
                                                onError={(e) => {
                                                    e.target.src = pictureIcon; 
                                                }}
                                            />
                                            <div className="image-info">
                                                <span className="image-name">{image.name}</span>
                                                {image.isExisting && (
                                                    <span className="image-status">Imagen existente</span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            className="remove-image-button"
                                            onClick={() => handleRemoveImage(image.id)}
                                            type="button"
                                            disabled={isLoading}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label className={`upload-image-button ${isLoading ? 'disabled' : ''}`}>
                                <img src={uploadIcon} alt="Subir" />
                                <span>Cargar Imagen</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                    disabled={isLoading}
                                />
                            </label>
                            <p className="upload-info">
                                Puedes seleccionar múltiples imágenes. Formatos permitidos: JPG, PNG, JPEG
                            </p>
                        </div>

                        <div className="add-property-right">
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
                                            disabled={isLoading}
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
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            name="parking"
                                            value={formData.parking}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        >
                                            <option value="">¿Tiene parqueo?</option>
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
                                            disabled={isLoading}
                                        >
                                            <option value="">¿Tiene patio?</option>
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
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="constructionYear"
                                            placeholder="Año de construcción"
                                            value={formData.constructionYear}
                                            onChange={handleChange}
                                            disabled={isLoading}
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
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            name="name"
                                            placeholder="Nombre de la propiedad"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="lotSize"
                                            placeholder="Tamaño del lote (ej: 200m²)"
                                            value={formData.lotSize}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="height"
                                            placeholder="Altura (ej: 2.5m)"
                                            value={formData.height}
                                            onChange={handleChange}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="form-row full-width">
                                    <div className="form-group description-group">
                                        <textarea
                                            name="description"
                                            placeholder="Descripción de la propiedad"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            required
                                            disabled={isLoading}
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <div className="form-group price-group">
                                        <input
                                            type="text"
                                            name="price"
                                            placeholder="Precio (ej: $150,000)"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className={`add-button ${isLoading ? 'loading' : ''}`}
                                        disabled={isLoading}
                                    >
                                        <img src={saveIcon} alt="Guardar" />
                                        <span>
                                            {isLoading 
                                                ? 'Guardando...' 
                                                : property 
                                                    ? 'Actualizar propiedad' 
                                                    : 'Crear publicación'
                                            }
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <LoadingOverlay 
                isVisible={isLoading} 
                message={loadingMessage}
            />
        </>
    );
};

export default AddPropertyCard;