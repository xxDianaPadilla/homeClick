import { useState, useEffect, useCallback } from "react";
import {toast} from 'react-hot-toast';

const useReviews = (propertyId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = useCallback(async () => {
        if(!propertyId) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/api/reviews`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                const allReviews = await response.json();

                const propertyReviews = allReviews.filter(review =>
                    review.propertyId._id === propertyId || review.propertyId === propertyId
                );
                setReviews(propertyReviews);
                setError(null);
            }else{
                const errorData = await response.json();
                setError(errorData.message || 'Error al cargar las reseñas');
                setReviews([]);
            }
        } catch (error) {
            console.error('Error fetching reviews: ', error);
            setError('Error de conexión al cargar las reseñas');
            setReviews([]);
        }finally{
            setLoading(false);
        }
    }, [propertyId]);

    const createReview = useCallback(async (reviewData) => {
        try {
            setSubmitting(true);
            const response = await fetch('http://localhost:4000/api/reviews', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...reviewData,
                    propertyId: propertyId
                }),
            });

            if(response.ok){
                const result = await response.json();
                toast.success('Reseña creada exitosamente');
                await fetchReviews();
                return {success: true, data: result};
            }else{
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error al crear la reseña';
                toast.error(errorMessage);
                return {success: false, error: errorMessage};
            }
        } catch (error) {
            console.error('Error creating review: ', error);
            const errorMessage = 'Error de conexión al crear la reseña';
            toast.error(errorMessage);
            return {success: false, error: errorMessage};
        }finally{
            setSubmitting(false);
        }
    }, [propertyId, fetchReviews]);

    const updateReview = useCallback(async (reviewId, reviewData) => {
        try {
            setSubmitting(true);
            const response = await fetch(`http://localhost:4000/api/reviews/${reviewId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...reviewData,
                    propertyId: propertyId
                }),
            });

            if(response.ok){
                const result = await response.json();
                toast.success('Reseña actualizada exitosamente');
                await fetchReviews();
                return {success: true, data: result};
            }else{
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error al actualizar la reseña';
                toast.error(errorMessage);
                return {success: false, error: errorMessage};
            }
        } catch (error) {
            console.error('Error updating review: ', error);
            const errorMessage = 'Error de conexión al actualizar la reseña';
            toast.error(errorMessage);
            return {success: false, error: errorMessage};
        }finally{
            setSubmitting(false);
        }
    }, [propertyId, fetchReviews]);

    const deleteReview = useCallback(async (reviewId) => {
        try {
            setSubmitting(true);
            const response = await fetch(`http://localhost:4000/api/reviews/${reviewId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.ok){
                toast.success('Reseña eliminada exitosamente');
                await fetchReviews();
                return {success: true};
            }else{
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error al eliminar la reseña';
                toast.error(errorMessage);
                return {success: false, error: errorMessage};
            }
        } catch (error) {
            console.error('Error deleting review: ', error);
            const errorMessage = 'Error de conexión al eliminar la reseña';
            toast.error(errorMessage);
            return {success: false, error: errorMessage};
        }finally{
            setSubmitting(false);
        }
    }, [fetchReviews]);

    const getUserReview = useCallback((customerId) => {
        if(!customerId || !reviews.length) return null;

        return reviews.find(review => {
            const reviewCustomerId = review.customerId?._id || review.customerId;
            return reviewCustomerId === customerId;
        });
    }, [reviews]);

    const reviewStats = useCallback(() => {
        if(!reviews.length){
            return{
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            };
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        const ratingDistribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        reviews.forEach(review => {
            ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1;
        });

        return {
            averageRating: parseFloat(averageRating.toFixed(1)),
            totalReviews: reviews.length,
            ratingDistribution
        };
    }, [reviews]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return{
        reviews,
        loading,
        error,
        submitting,
        createReview,
        updateReview,
        deleteReview,
        getUserReview,
        reviewStats: reviewStats(),
        refreshReviews: fetchReviews
    };
};

export default useReviews;