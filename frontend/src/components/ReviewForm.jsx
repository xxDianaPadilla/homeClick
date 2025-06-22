import React, { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import {Star} from "lucide-react";

const ReviewForm = ({
    onSubmit,
    onCancel,
    isEditing = false,
    initialData = null,
    submitting = false,
    customerInfo
}) => {
    const [formData, setFormData] = useState({
        comments: '',
        rating: 5
    });
    const [hoveredRating, setHoveredRating] = useState(0);

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                comments: initialData.comments || '',
                rating: initialData.rating || 5
            });
        }
    }, [isEditing, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.comments.trim()) {
            toast.error('Por favor, escribe un comentario');
            return;
        }

        if (formData.comments.trim().length < 10) {
            toast.error('El comentario debe tener al menos 10 caracteres');
            return;
        }

        if (formData.rating < 1 || formData.rating > 5) {
            toast.error('La calificación debe estar entre 1 y 5 estrellas');
            return;
        }

        const reviewData = {
            comments: formData.comments.trim(),
            rating: parseInt(formData.rating),
            customerId: customerInfo?._id || customerInfo?.id
        };

        try {
            await onSubmit(reviewData);

            if (!isEditing) {
                setFormData({
                    comments: '',
                    rating: 5
                });
                setHoveredRating(0);
            }
        } catch (error) {
            console.error('Error submitting review: ', error);
        }
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleRatingHover = (rating) => {
        setHoveredRating(rating);
    };

    const handleRatingLeave = () => {
        setHoveredRating(0);
    };

    const renderStars = () => {
        return (
            <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => {
                    const starValue = index + 1;
                    const isFilled = starValue <= (hoveredRating || formData.rating);

                    return (
                        <button
                            key={index}
                            type="button"
                            className={`p-1 rounded-full transition-colors duration-200 ${isFilled
                                ? 'text-yellow-400 hover:text-yellow-500'
                                : 'text-gray-300 hover:text-gray-400'
                                }`}
                            onClick={() => handleRatingClick(starValue)}
                            onMouseEnter={() => handleRatingHover(starValue)}
                            onMouseLeave={handleRatingLeave}
                            title={`${starValue} estrella${starValue > 1 ? 's' : ''}`}
                        >
                            <Star className="w-8 h-8 fill-current" />
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {isEditing ? 'Editar Reseña' : 'Escribir Reseña'}
                    </h3>
                    {customerInfo && (
                        <p className="text-sm text-gray-600">
                            Como: <span className="font-medium">{customerInfo.firstName} {customerInfo.lastName}</span>
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Calificación *
                    </label>
                    <div className="flex items-center space-x-4">
                        {renderStars()}
                        <span className="text-sm text-gray-600 font-medium">
                            {hoveredRating || formData.rating}/5 estrellas
                        </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                        Comentario *
                    </label>
                    <textarea
                        id="comments"
                        value={formData.comments}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            comments: e.target.value
                        }))}
                        placeholder="Comparte tu experiencia con esta propiedad..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows="4"
                        maxLength="500"
                        disabled={submitting}
                        required
                    />
                    <div className="mt-2 text-right">
                        <span className={`text-xs ${formData.comments.length > 450 ? 'text-red-500' : 'text-gray-500'
                            }`}>
                            {formData.comments.length}/500 caracteres
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        disabled={submitting || !formData.comments.trim()}
                    >
                        {submitting && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <span>
                            {submitting
                                ? (isEditing ? 'Actualizando...' : 'Publicando...')
                                : (isEditing ? 'Actualizar Reseña' : 'Publicar Reseña')
                            }
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;