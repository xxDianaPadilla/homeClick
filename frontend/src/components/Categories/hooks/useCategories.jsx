import { useState, useEffect } from "react";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);

    const fetchCategories = async () => {
        setIsLoadingCategories(true);
        setCategoriesError(null);

        try {
            const response = await fetch('http://localhost:4000/api/categories');

            if(!response.ok){
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Categories loaded: ', data);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories: ', error);
            setCategoriesError(error.message);
            setCategories([]);
        }finally{
            setIsLoadingCategories(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return{
        categories,
        isLoadingCategories,
        categoriesError,
        refetchCategories: fetchCategories
    };
};