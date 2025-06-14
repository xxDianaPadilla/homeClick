import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save, AlertCircle } from "lucide-react";

const CategoryModal = ({ isOpen, onClose, onSave, category = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      propertyType: "",
      descriptionType: ""
    }
  });

  const watchedPropertyType = watch("propertyType");
  const watchedDescription = watch("descriptionType");

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setValue("propertyType", category.propertyType);
        setValue("descriptionType", category.descriptionType);
      } else {
        reset({
          propertyType: "",
          descriptionType: ""
        });
      }
    }
  }, [category, isOpen, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      await onSave(data);
    } catch (error) {
      console.error("Error al guardar categoría:", error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {category ? "Editar Categoría" : "Nueva Categoría"}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Campo Tipo de Propiedad */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Propiedad <span className="text-red-500">*</span>
            </label>
            <input
              {...register("propertyType", {
                required: "El tipo de propiedad es obligatorio",
                minLength: {
                  value: 2,
                  message: "Debe tener al menos 2 caracteres"
                },
                maxLength: {
                  value: 50,
                  message: "No puede exceder 50 caracteres"
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: "Solo se permiten letras y espacios"
                },
                validate: {
                  noOnlySpaces: value =>
                    value.trim().length > 0 || "No puede contener solo espacios",
                  noConsecutiveSpaces: value =>
                    !/\s{2,}/.test(value) || "No se permiten espacios consecutivos"
                }
              })}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${errors.propertyType
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
                }`}
              placeholder="Ej: Casa, Apartamento, Terreno..."
            />
            <div className="flex justify-between items-start mt-1">
              <div className="flex-1">
                {errors.propertyType && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle size={16} className="mr-1 flex-shrink-0" />
                    <span>{errors.propertyType.message}</span>
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 ${watchedPropertyType?.length > 45 ? "text-red-500" : "text-gray-500"
                }`}>
                {watchedPropertyType?.length || 0}/50
              </span>
            </div>
          </div>

          {/* Campo Descripción */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("descriptionType", {
                required: "La descripción es obligatoria",
                minLength: {
                  value: 10,
                  message: "Debe tener al menos 10 caracteres"
                },
                maxLength: {
                  value: 200,
                  message: "No puede exceder 200 caracteres"
                },
                validate: {
                  noOnlySpaces: value =>
                    value.trim().length >= 10 || "La descripción debe tener contenido válido",
                  noConsecutiveSpaces: value =>
                    !/\s{3,}/.test(value) || "No se permiten más de 2 espacios consecutivos"
                }
              })}
              rows={4}
              className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-colors ${errors.descriptionType
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
                }`}
              placeholder="Descripción detallada de la categoría..."
            />
            <div className="flex justify-between items-start mt-1">
              <div className="flex-1">
                {errors.descriptionType && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle size={16} className="mr-1 flex-shrink-0" />
                    <span>{errors.descriptionType.message}</span>
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 ${watchedDescription?.length > 180 ? "text-red-500" : "text-gray-500"
                }`}>
                {watchedDescription?.length || 0}/200
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>{category ? "Actualizar" : "Guardar"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;