import React, { useState, useEffect } from "react";
import NavBarAdmin from '../components/NavBarAdmin';
import CategoryCard from "../components/CategoryCard";
import CategoryModal from "../components/CategoryModal";
import { Plus } from "lucide-react";

const Categorias = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/categories');
            const data = await response.json();
            setCategories(data);
            return data;
        } catch (error) {
            console.error('Error al cargar categorías: ', error);
            setCategories([]);
        }
    }

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            try {
                await fetchCategories();
            } catch (error) {
                console.error('Error loading categories:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const handleSaveCategory = async (categoryData) => {
        try {
            const url = editingCategory
                ? `http://localhost:4000/api/categories/${editingCategory._id}`
                : 'http://localhost:4000/api/categories';
            const method = editingCategory ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                const savedCategory = await response.json();

                if (editingCategory) {
                    setCategories(categories.map(cat =>
                        cat._id === editingCategory._id ? savedCategory : cat
                    ));
                } else {
                    setCategories([...categories, savedCategory]);
                }

                setIsModalOpen(false);
                setEditingCategory(null);
            }
        } catch (error) {
            console.error('Error al guardar categorías: ', error);

            const tempCategory = {
                _id: `temp-${Date.now()}`,
                ...categoryData,
                createdAt: new Date().toISOString(),
                isTemporary: true
            };

            if (editingCategory) {
                setCategories(categories.map(cat =>
                    cat._id === editingCategory._id
                        ? { ...editingCategory, ...categoryData }
                        : cat
                ));
            } else {
                setCategories([...categories, tempCategory]);
            }

            setIsModalOpen(false);
            setEditingCategory(null);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            try {
                const response = await fetch(`http://localhost:4000/api/categories/${categoryId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCategories(categories.filter(cat => cat._id !== categoryId));
                }
            } catch (error) {
                console.error('Error al eliminar categoría: ', error);

                setCategories(categories.filter(cat => cat._id !== categoryId));
            }
        }
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleAddCategory = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    return (
        <>
            <NavBarAdmin />

            <div className="min-h-screen bg-white-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-gray-600 mt-2">
                                Administra las categorías de propiedades disponibles
                            </p>
                        </div>

                        <button
                            onClick={handleAddCategory}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 shadow-md"
                        >
                            <Plus size={20} />
                            <span>Nueva Categoría</span>
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No hay categorías disponibles
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Comienza agregando tu primera categoría de propiedad
                                </p>
                                <button
                                    onClick={handleAddCategory}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                >
                                    Agregar Primera Categoría
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category._id}
                                    category={category}
                                    onEdit={handleEditCategory}
                                    onDelete={handleDeleteCategory}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                }}
                onSave={handleSaveCategory}
                category={editingCategory}
            />
        </>
    );
};

export default Categorias;