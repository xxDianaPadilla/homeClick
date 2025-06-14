import React, { useState } from "react";
import '../styles/AddPropertyCard.css';
import closeIcon from '../assets/image10.png';
import pictureIcon from "../assets/image35.png";
import uploadIcon from "../assets/subir.png";
import saveIcon from "../assets/guardar.png";
import { usePropertyForm } from '../components/Properties/Hooks/usePropertyForm';
import { usePropertyImages } from '../components/Properties/Hooks/usePropertyImages';
import { usePropertySubmit } from '../components/Properties/Hooks/usePropertySubmit';
import { useCategories } from "./Categories/hooks/useCategories";
import LoadingOverlay from "./LoadingOverlay";

const AddPropertyCard = ({ isOpen, onClose, property }) => {
    const initialImages = property?.images || [];
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const {
        register,
        handleSubmit: handleFormSubmit,
        errors,
        isSubmitting,
        resetForm,
        validationRules,
        handleCustomChange,
        prepareDataForSubmit,
        getFieldError,
        hasFieldError
    } = usePropertyForm(property);

    const { images, handleRemoveImage, handleImageUpload, getImagePreview, clearImages } = usePropertyImages(initialImages);

    const { categories, isLoadingCategories, categoriesError } = useCategories();

    const { handleSubmit } = usePropertySubmit(
        null,
        images,
        onClose,
        property,
        setIsLoading,
        setLoadingMessage
    );

    const onSubmit = (data) => {
        if (images.length === 0) {
            alert('Por favor sube al menos una imagen');
            return;
        }

        const processedData = prepareDataForSubmit(data);
        handleSubmit(null, processedData);
    };

    const handleClose = () => {
        if (isLoading || isSubmitting) return;
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
                            disabled={isLoading || isSubmitting}
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
                                            disabled={isLoading || isSubmitting}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label className={`upload-image-button ${(isLoading || isSubmitting) ? 'disabled' : ''}`}>
                                <img src={uploadIcon} alt="Subir" />
                                <span>Cargar Imagen</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                    disabled={isLoading || isSubmitting}
                                />
                            </label>
                            <p className="upload-info">
                                Puedes seleccionar múltiples imágenes. Formatos permitidos: JPG, PNG, JPEG
                            </p>

                            {/* Mostrar error si no hay imágenes */}
                            {images.length === 0 && (
                                <div className="form-error" style={{ marginTop: '10px', color: '#e74c3c', fontSize: '14px' }}>
                                    * Se requiere al menos una imagen
                                </div>
                            )}
                        </div>

                        <div className="add-property-right">
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
                                            <span className="form-error">{getFieldError('category')}</span>
                                        )}
                                        {categoriesError && (
                                            <span className="form-error">Error al cargar categorías: {categoriesError}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            placeholder="Cant. habitaciones"
                                            {...register("bedrooms", validationRules.bedrooms)}
                                            min="0"
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('bedrooms') ? 'error' : ''}
                                        />
                                        {hasFieldError('bedrooms') && (
                                            <span className="form-error">{getFieldError('bedrooms')}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            placeholder="Cant. baños"
                                            {...register("bathrooms", validationRules.bathrooms)}
                                            min="0"
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('bathrooms') ? 'error' : ''}
                                        />
                                        {hasFieldError('bathrooms') && (
                                            <span className="form-error">{getFieldError('bathrooms')}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <select
                                            {...register("parking")}
                                            disabled={isLoading || isSubmitting}
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
                                            {...register("patio")}
                                            disabled={isLoading || isSubmitting}
                                        >
                                            <option value="">¿Tiene patio?</option>
                                            <option value="Sí">Sí</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            placeholder="Cantidad de niveles"
                                            {...register("floors", validationRules.floors)}
                                            min="1"
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('floors') ? 'error' : ''}
                                        />
                                        {hasFieldError('floors') && (
                                            <span className="form-error">{getFieldError('floors')}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Año de construcción"
                                            {...register("constructionYear", validationRules.constructionYear)}
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('constructionYear') ? 'error' : ''}
                                        />
                                        {hasFieldError('constructionYear') && (
                                            <span className="form-error">{getFieldError('constructionYear')}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row full-width">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Donde queda, ejemplo: Colonia Escalon"
                                            {...register("location", validationRules.location)}
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('location') ? 'error' : ''}
                                        />
                                        {hasFieldError('location') && (
                                            <span className="form-error">{getFieldError('location')}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <input
                                            placeholder="Nombre de la propiedad"
                                            {...register("name", validationRules.name)}
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('name') ? 'error' : ''}
                                        />
                                        {hasFieldError('name') && (
                                            <span className="form-error">{getFieldError('name')}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Tamaño del lote (ej: 200m²)"
                                            {...register("lotSize", validationRules.lotSize)}
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('lotSize') ? 'error' : ''}
                                        />
                                        {hasFieldError('lotSize') && (
                                            <span className="form-error">{getFieldError('lotSize')}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Altura (ej: 2.5m)"
                                            {...register("height", validationRules.height)}
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('height') ? 'error' : ''}
                                        />
                                        {hasFieldError('height') && (
                                            <span className="form-error">{getFieldError('height')}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-row full-width">
                                    <div className="form-group description-group">
                                        <textarea
                                            placeholder="Descripción de la propiedad"
                                            {...register("description", validationRules.description)}
                                            rows="4"
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('description') ? 'error' : ''}
                                        ></textarea>
                                        {hasFieldError('description') && (
                                            <span className="form-error">{getFieldError('description')}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <div className="form-group price-group">
                                        <input
                                            type="text"
                                            placeholder="Precio (ej: $150,000)"
                                            {...register("price", validationRules.price)}
                                            disabled={isLoading || isSubmitting}
                                            className={hasFieldError('price') ? 'error' : ''}
                                            onChange={(e) => handleCustomChange('price', e.target.value)}
                                        />
                                        {hasFieldError('price') && (
                                            <span className="form-error">{getFieldError('price')}</span>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className={`add-button ${(isLoading || isSubmitting) ? 'loading' : ''}`}
                                        disabled={isLoading || isSubmitting}
                                    >
                                        <img src={saveIcon} alt="Guardar" />
                                        <span>
                                            {(isLoading || isSubmitting)
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