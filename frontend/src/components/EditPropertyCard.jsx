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
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import FormRow from "./FormRow";
import ImageUploader from "./ImageUploader";
import Modal from "./Modal";

const EditPropertyCard = ({ isOpen, onClose, property,
  // Iconos
  icon,
  icon2,
  icon3,
  icon4 }) => {

  const currentYear = new Date().getFullYear();

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const {
    categories,
    isLoadingCategories,
    categoriesError
  } = useCategories();

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
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Editar información de la publicación"
      closeIcon={closeIcon}
      variant="edit"
      isLoading={isLoading}
      loadingMessage={loadingMessage}
    >
      <div className="edit-property-left">
        <ImageUploader
          images={images}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          icon3={uploadIcon}
          icon2={pictureIcon}
          disabled={isLoading || isSubmitting}
          variant="list" // Usar variante de lista para el formulario de edición
        />
      </div>

      <div className="edit-property-right">
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
              errorClassName="error-message"
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
              errorClassName="error-message"
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
              errorClassName="error-message"
            />

            <FormSelect
              placeholder="Parqueo"
              options={parkingOptions}
              register={register}
              name="parking"
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('parking')}
              errorMessage={getFieldError('parking')}
              errorClassName="error-message"
            />
          </FormRow>

          <FormRow>
            <FormSelect
              placeholder="Patio"
              options={patioOptions}
              register={register}
              name="patio"
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('patio')}
              errorMessage={getFieldError('patio')}
              errorClassName="error-message"
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
              errorClassName="error-message"
            />

            <FormInput
              type="number"
              placeholder="Año de construcción"
              register={register}
              name="constructionYear"
              validationRules={validationRules.constructionYear}
              min="1900"
              max={currentYear}
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('constructionYear')}
              errorMessage={getFieldError('constructionYear')}
              errorClassName="error-message"
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
              errorClassName="error-message"
            />
          </FormRow>

          <FormRow>
            <FormInput
              type="text"
              placeholder="Nombre de la propiedad"
              register={register}
              name="name"
              validationRules={validationRules.name}
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('name')}
              errorMessage={getFieldError('name')}
              errorClassName="error-message"
            />

            <FormInput
              type="text"
              placeholder="Tamaño del lote (m²)"
              register={register}
              name="lotSize"
              validationRules={validationRules.lotSize}
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('lotSize')}
              errorMessage={getFieldError('lotSize')}
              errorClassName="error-message"
            />

            <FormInput
              type="text"
              placeholder="Altura (m)"
              register={register}
              name="height"
              validationRules={validationRules.height}
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('height')}
              errorMessage={getFieldError('height')}
              errorClassName="error-message"
            />
          </FormRow>

          <FormRow fullWidth>
            <FormInput
              type="textarea"
              placeholder="Descripción"
              register={register}
              name="description"
              validationRules={validationRules.description}
              rows={4}
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('description')}
              errorMessage={getFieldError('description')}
              errorClassName="error-message"
              className="description-group"
            />
          </FormRow>

          <div className="form-actions">
            <FormInput
              type="text"
              placeholder="Precio ($)"
              register={register}
              name="price"
              validationRules={validationRules.price}
              disabled={isLoading || isSubmitting}
              hasError={hasFieldError('price')}
              errorMessage={getFieldError('price')}
              errorClassName="error-message"
              onChange={handleFieldChange("price")}
              className="price-group"
            />

            <FormButton
              type="submit"
              disabled={isLoading || isSubmitting}
              isLoading={isLoading || isSubmitting}
              loadingText="Guardando..."
              icon4={saveIcon}
              className="save-button"
            >
              Guardar Cambios
            </FormButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPropertyCard;