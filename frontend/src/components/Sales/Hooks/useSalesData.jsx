import { useState, useEffect } from 'react';

const useSalesData = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSalesData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:4000/api/sales/with-properties', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            const transformedData = data.map(sale => ({
                id: sale._id,
                propertyName: sale.shoppingCartId?.items?.[0]?.propertyId?.name ||
                    sale.shoppingCartId?.items?.[0]?.propertyId?.description ||
                    'Propiedad sin nombre',
                price: sale.shoppingCartId?.total ? `${sale.shoppingCartId.total.toLocaleString()}` : '$0',
                publishDate: sale.createdAt ? new Date(sale.createdAt).toLocaleDateString('es-ES') : 'Sin fecha',
                paymentStatus: sale.status,
                paymentType: sale.paymentType,
                location: sale.shoppingCartId?.items?.[0]?.propertyId?.location || 'Sin ubicación',
                images: sale.shoppingCartId?.items?.[0]?.propertyId?.images || []
            }));

            setSalesData(transformedData);
        } catch (err) {
            console.error('Error fetching sales data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, []);

    const refetch = () => {
        fetchSalesData();
    };

    return {
        salesData,
        loading,
        error,
        refetch
    };
};

export default useSalesData;