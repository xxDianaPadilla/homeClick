import { useState, useEffect } from "react";

const useEarningsData = () => {
    const [salesData, setSalesData] = useState({
        totalSales: 0,
        totalEarnings: 0,
        loading2: true,
        error2: null
    });

    const fetchSalesCount = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/sales/count');
            if(!response.ok){
                throw new Error('Error al obtener el conteo de ventas');
            }

            const data = await response.json();
            return data.count || 0;
        } catch (error2) {
            console.error('Error fetching sales count: ', error2);
            throw error2;
        }
    };

    const fetchTotalEarnings = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/shoppingCart/total-earnings');
            if(!response.ok){
                throw new Error('Error al obtener las ganancias totales');
            }

            const data = await response.json();
            return data.totalEarnings || 0;
        } catch (error2) {
            console.error('Error fetching total earnings: ', error2);
        }
    };

    const loadSalesData = async () => {
        try {
            setSalesData(prev => ({...prev, loading2: true, error: null}));

            const [totalSales, totalEarnings] = await Promise.all([
                fetchSalesCount(),
                fetchTotalEarnings()
            ]);

            setSalesData({
                totalSales,
                totalEarnings,
                loading2: false,
                error2: null
            });
        } catch (error2) {
            setSalesData(prev => ({
                ...prev,
                loading2: false,
                error2: error2.message
            }));
        }
    };

    useEffect(() => {
        loadSalesData();
    }, []);

    const refreshData = () => {
        loadSalesData();
    };

    return{
        ...salesData,
        refreshData
    };
};

export default useEarningsData;