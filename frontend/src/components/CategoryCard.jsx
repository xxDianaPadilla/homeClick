import React from "react";
import { Edit, Trash2} from "lucide-react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 border-l-4 border-orange-400 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {category.propertyType}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {category.descriptionType}
                    </p>
                </div>
                <div className="flex space-x-2 ml-4">
                    <button
                        onClick={() => onEdit(category)}
                        className="p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md transition-colors duration-200"
                        title="Editar categoría"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(category._id)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
                        title="Eliminar categoría"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;