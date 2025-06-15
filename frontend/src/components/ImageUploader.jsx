import React from "react";

const ImageUploader = ({
    images = [],
    onImageUpload,
    onRemoveImage,
    getImagePreview,
    icon3,
    icon2,
    disabled = false,
    hasError = false,
    errorMessage,
    className = ""
}) => {
    return (
        <div className={`image-uploader ${className}`}>
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
                                    e.target.src = icon2;
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
                            onClick={() => onRemoveImage(image.id)}
                            type="button"
                            disabled={disabled}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <label className={`upload-image-button ${disabled ? 'disabled' : ''}`}>
                <img src={icon3} alt="Subir" />
                <span>Cargar Imagen</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onImageUpload}
                    style={{ display: 'none' }}
                    disabled={disabled}
                />
            </label>

            <p className="upload-info">
                Puedes seleccionar múltiples imágenes. Formatos permitidos: JPG, PNG, JPEG
            </p>

            {hasError && errorMessage && (
                <div className="form-error" style={{ marginTop: '10px', color: '#e74c3c', fontSize: '14px' }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;