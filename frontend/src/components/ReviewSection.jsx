import React, { useState, useCallback } from "react";
import { toast } from 'react-hot-toast';
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import useReviews from "./Reviews/hooks/useReviews";

const ReviewsSection = ({
    propertyId,
    propertyName,
    isAuthenticated,
    customerInfo,
    isCustomer
}) => {
    const [showForm, setShowForm] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [reviewsExpanded, setReviewsExpanded] = useState(true);

    const {
        reviews,
        loading,
        error,
        submitting,
        createReview,
        updateReview,
        deleteReview,
        getUserReview,
        reviewStats
    } = useReviews(propertyId);

    const currentUserReview = getUserReview(customerInfo?._id || customerInfo?.id);

    const handleCreateReview = useCallback(async (reviewData) => {
        if (!isAuthenticated) {
            toast.error('Deber iniciar sesión para escribir una reseña');
            return;
        }

        if (!isCustomer) {
            toast.error('Solo los clientes pueden escribir reseñas');
            return;
        }

        if (currentUserReview) {
            toast.error('Ya has escrito una reseña para esta propiedad');
            return;
        }

        const result = await createReview(reviewData);
        if (result.success) {
            setShowForm(false);
        }
    }, [isAuthenticated, isCustomer, currentUserReview, createReview]);

    const handleEditReview = useCallback(async (reviewData) => {
        if (!editingReview) return;

        const result = await updateReview(editingReview._id, reviewData);
        if (result.success) {
            setEditingReview(null);
            setShowForm(false);
        }
    }, [editingReview, updateReview]);

    const handleDeleteReview = useCallback(async (reviewId) => {
        const result = await deleteReview(reviewId);
        if (result.success && editingReview?._id === reviewId) {
            setEditingReview(null);
            setShowForm(false);
        }
    }, [deleteReview, editingReview]);

    const startEditReview = useCallback((review) => {
        setEditingReview(review);
        setShowForm(true);
    }, []);

    const cancelEdit = useCallback(() => {
        setEditingReview(null);
        setShowForm(false);
    }, []);

    const renderReviewStats = () => {
        if (reviewStats.totalReviews === 0) return null;

        return (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                            <span className="text-4xl font-bold text-gray-900">
                                {reviewStats.averageRating.toFixed(1)}
                            </span>
                            <div className="flex">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span
                                        key={index}
                                        className={`text-2xl ${
                                            index < Math.round(reviewStats.averageRating) 
                                                ? 'text-yellow-400' 
                                                : 'text-gray-300'
                                        }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600">
                            {reviewStats.totalReviews} reseña{reviewStats.totalReviews > 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="flex-1 max-w-md">
                        {[5, 4, 3, 2, 1].map(rating => {
                            const count = reviewStats.ratingDistribution[rating];
                            const percentage = reviewStats.totalReviews > 0
                                ? (count / reviewStats.totalReviews) * 100
                                : 0;

                            return (
                                <div key={rating} className="flex items-center gap-2 mb-1">
                                    <span className="text-sm text-gray-600 w-8">
                                        {rating}★
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-8">
                                        ({count})
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderActionButton = () => {
        if (!isAuthenticated) {
            return (
                <button
                    className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed opacity-50"
                    disabled
                    title="Debes iniciar sesión para escribir una reseña"
                >
                    Iniciar sesión para reseñar
                </button>
            );
        }

        if (!isCustomer) {
            return (
                <button
                    className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed opacity-50"
                    disabled
                    title="Solo los clientes pueden escribir reseñas"
                >
                    Solo clientes pueden reseñar
                </button>
            );
        }

        return (
            <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={() => setShowForm(true)}
                disabled={submitting}
            >
                <span>✍️</span>
                Escribir reseña
            </button>
        );
    };

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-red-800 mb-2">
                    Error al cargar las reseñas
                </h2>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setReviewsExpanded(!reviewsExpanded)}
            >
                <h2 className="text-2xl font-semibold text-gray-900">
                    Reseñas y calificaciones
                </h2>
                <button 
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    aria-label="Expandir reseñas"
                >
                    <span className="text-lg font-semibold text-gray-600">
                        {reviewsExpanded ? '−' : '+'}
                    </span>
                </button>
            </div>

            {reviewsExpanded && (
                <div className="px-6 pb-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className="text-gray-600">Cargando reseñas...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {renderReviewStats()}

                            <div className="mb-6">
                                {renderActionButton()}
                            </div>

                            {showForm && (
                                <div className="mb-6">
                                    <ReviewForm
                                        onSubmit={editingReview ? handleEditReview : handleCreateReview}
                                        onCancel={cancelEdit}
                                        isEditing={!!editingReview}
                                        initialData={editingReview}
                                        submitting={submitting}
                                        customerInfo={customerInfo}
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                {reviews.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <div className="max-w-md mx-auto">
                                            <p className="text-gray-600 mb-2">
                                                Aún no hay reseñas para esta propiedad.
                                            </p>
                                            <p className="text-gray-500">
                                                ¡Sé el primero en compartir tu opinión!
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    reviews.map((review) => (
                                        <ReviewCard
                                            key={review._id}
                                            review={review}
                                            currentCustomerId={customerInfo?._id || customerInfo?.id}
                                            onEdit={startEditReview}
                                            onDelete={handleDeleteReview}
                                            isEditing={editingReview?._id === review._id}
                                            onCancelEdit={cancelEdit}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewsSection;