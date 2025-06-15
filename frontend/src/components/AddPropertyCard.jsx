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
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import ImageUploader from "./ImageUploader";
import Modal from "./Modal";

const AddPropertyCard = ({ isOpen, onClose, property,
    icon,
    icon2,
    icon3,
    icon4 }) => {

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

    const categoryOptions = categories.map(category => ({
        value: category._id?.$oid || category._id || category.id,
        label: category.propertyType
    }));

    const parkingOptions = [
        { value: "Sí", label: "Sí" },
        { value: "No", label: "No" }
    ];

    const patioOptions = [
        { value: "Sí", label: "Sí" },
        { value: "No", label: "No" }
    ];

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
            <Modal
                isOpen={true}
                onClose={handleClose}
                title={property ? 'Editar propiedad' : 'Información de la publicación'}
                icon={closeIcon}
                disabled={isLoading || isSubmitting}
            >
                <div className="add-property-left">
                    <ImageUploader
                        images={images}
                        onImageUpload={handleImageUpload}
                        onRemoveImage={handleRemoveImage}
                        getImagePreview={getImagePreview}
                        icon3={uploadIcon}
                        icon2={pictureIcon}
                        disabled={isLoading || isSubmitting}
                        hasError={images.length === 0}
                        errorMessage="* Se requiere al menos una imagen"
                    />
                </div>

                <div className="add-property-right">
                    <h3>Detalles y dimensiones de la propiedad</h3>
                    <form onSubmit={handleFormSubmit(onSubmit)}>

                        <FormRow fullWidth>
                            <FormSelect
                                placeholder="Seleccionar tipo de propiedad"
                                options={categoryOptions}
                                register={register}
                                name="category"
                                validationRules={validationRules.category}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('category')}
                                errorMessage={getFieldError('category')}
                                isLoading={isLoadingCategories}
                                loadingText="Cargando categorías..."
                                errorText={categoriesError ? `Error al cargar categorías: ${categoriesError}` : null}
                            />
                        </FormRow>

                        <FormRow>
                            <FormInput
                                type="number"
                                placeholder="Cant. habitaciones"
                                register={register}
                                name="bedrooms"
                                validationRules={validationRules.bedrooms}
                                min="0"
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('bedrooms')}
                                errorMessage={getFieldError('bedrooms')}
                            />

                            <FormInput
                                type="number"
                                placeholder="Cant. baños"
                                register={register}
                                name="bathrooms"
                                validationRules={validationRules.bathrooms}
                                min="0"
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('bathrooms')}
                                errorMessage={getFieldError('bathrooms')}
                            />

                            <FormSelect
                                placeholder="¿Tiene parqueo?"
                                options={parkingOptions}
                                register={register}
                                name="parking"
                                disabled={isLoading || isSubmitting}
                            />
                        </FormRow>

                        <FormRow>
                            <FormSelect
                                placeholder="¿Tiene patio?"
                                options={patioOptions}
                                register={register}
                                name="patio"
                                disabled={isLoading || isSubmitting}
                            />

                            <FormInput
                                type="number"
                                placeholder="Cantidad de niveles"
                                register={register}
                                name="floors"
                                validationRules={validationRules.floors}
                                min="1"
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('floors')}
                                errorMessage={getFieldError('floors')}
                            />

                            <FormInput
                                type="text"
                                placeholder="Año de construcción"
                                register={register}
                                name="constructionYear"
                                validationRules={validationRules.constructionYear}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('constructionYear')}
                                errorMessage={getFieldError('constructionYear')}
                            />
                        </FormRow>

                        <FormRow fullWidth>
                            <FormInput
                                type="text"
                                placeholder="Donde queda, ejemplo: Colonia Escalon"
                                register={register}
                                name="location"
                                validationRules={validationRules.location}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('location')}
                                errorMessage={getFieldError('location')}
                            />
                        </FormRow>

                        <FormRow>
                            <FormInput
                                placeholder="Nombre de la propiedad"
                                register={register}
                                name="name"
                                validationRules={validationRules.name}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('name')}
                                errorMessage={getFieldError('name')}
                            />

                            <FormInput
                                type="text"
                                placeholder="Tamaño del lote (ej: 200m²)"
                                register={register}
                                name="lotSize"
                                validationRules={validationRules.lotSize}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('lotSize')}
                                errorMessage={getFieldError('lotSize')}
                            />

                            <FormInput
                                type="text"
                                placeholder="Altura (ej: 2.5m)"
                                register={register}
                                name="height"
                                validationRules={validationRules.height}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('height')}
                                errorMessage={getFieldError('height')}
                            />
                        </FormRow>

                        <FormRow fullWidth>
                            <FormInput
                                type="textarea"
                                placeholder="Descripción de la propiedad"
                                register={register}
                                name="description"
                                validationRules={validationRules.description}
                                rows={4}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('description')}
                                errorMessage={getFieldError('description')}
                                className="description-group"
                            />
                        </FormRow>

                        <div className="form-actions">
                            <FormInput
                                type="text"
                                placeholder="Precio (ej: $150,000)"
                                register={register}
                                name="price"
                                validationRules={validationRules.price}
                                disabled={isLoading || isSubmitting}
                                hasError={hasFieldError('price')}
                                errorMessage={getFieldError('price')}
                                onChange={(e) => handleCustomChange('price', e.target.value)}
                                className="price-group"
                            />
                            &nbsp;
                            <FormButton
                                type="submit"
                                disabled={isLoading || isSubmitting}
                                isLoading={isLoading || isSubmitting}
                                loadingText="Guardando..."
                                icon4={saveIcon}
                                className="add-button"
                            >
                                {property ? 'Actualizar propiedad' : 'Crear publicación'}
                            </FormButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <LoadingOverlay
                isVisible={isLoading}
                message={loadingMessage}
            />
        </>
    );
};

export default AddPropertyCard;