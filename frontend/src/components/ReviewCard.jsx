import React, { useState } from "react";
import { toast } from 'react-hot-toast';

const ReviewCard = ({
    review,
    currentCustomerId,
    onEdit,
    onDelete,
    isEditing = false,
    onCancelEdit
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const canModify = currentCustomerId && (
        review.customerId?._id === currentCustomerId ||
        review.customerId === currentCustomerId
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                    <span
                        key={index}
                        className={`text-lg ${index < rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                            }`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const handleDelete = async () => {
        if (!canModify) {
            toast.error('No tienes permisos para eliminar esta reseña');
            return;
        }

        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta reseña?');
        if (!confirmDelete) return;

        setIsDeleting(true);
        try {
            await onDelete(review._id);
        } catch (error) {
            console.error('Error deleting review: ', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const getCustomerName = () => {
        const customer = review.customerId;
        if (!customer) return 'Usuario anónimo';

        if (typeof customer === 'object') {
            return `${customer.firstName || ''} ${customer.lastName || ''}`.trim() ||
                customer.name ||
                customer.email ||
                'Usuario';
        }
        return 'Usuario';
    };

    return (
        <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${isEditing ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getCustomerName().charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">{getCustomerName()}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-gray-600">({review.rating}/5)</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-1">📅</span>
                    {formatDate(review.updatedAt || review.createdAt)}
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{review.comments}</p>
            </div>

            {canModify && !isEditing && (
                <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                    <button
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                        onClick={() => onEdit(review)}
                        title="Editar reseña"
                    >
                        <span>✏️</span>
                        <span>Editar</span>
                    </button>
                    <button
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        title="Eliminar reseña"
                    >
                        <span>🗑️</span>
                        <span>{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
                    </button>
                </div>
            )}

            {isEditing && (
                <div className="flex items-center justify-between pt-3 border-t border-blue-200 bg-blue-50 -mx-6 -mb-6 px-6 py-3 rounded-b-lg">
                    <span className="flex items-center text-sm text-blue-700 font-medium">
                        <span className="mr-2">✏️</span>
                        Editando reseña...
                    </span>
                    <button
                        className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 hover:bg-white rounded-md transition-colors duration-200"
                        onClick={onCancelEdit}
                        title="Cancelar edición"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;