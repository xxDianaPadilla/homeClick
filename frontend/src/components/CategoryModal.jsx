import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

const CategoryModal = ({ isOpen, onClose, onSave, category = null }) => {
  const [formData, setFormData] = useState({
    propertyType: "",
    descriptionType: ""
  });

  useEffect(() => {
    if (category) {
      setFormData({
        propertyType: category.propertyType,
        descriptionType: category.descriptionType
      });
    } else {
      setFormData({
        propertyType: "",
        descriptionType: ""
      });
    }
  }, [category, isOpen]);

  const handleSubmit = () => {
    if (formData.propertyType.trim() && formData.descriptionType.trim()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {category ? "Editar Categoría" : "Nueva Categoría"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Propiedad
            </label>
            <input
              value={formData.propertyType}
              onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: Casa, Apartamento, Terreno..."
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={formData.descriptionType}
              onChange={(e) => setFormData({...formData, descriptionType: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent h-24 resize-none"
              placeholder="Descripción detallada de la categoría..."
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>{category ? "Actualizar" : "Guardar"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;