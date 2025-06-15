import React, { useState, useRef, useEffect } from "react";
import { useCategories } from "./Categories/hooks/useCategories";
import '../styles/CategoryFilterDropdown.css';

const CategoryFilterDropdown = ({ onCategorySelect, selectedCategory, onClearFilter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { categories, isLoadigCategories, categoriesError } = useCategories();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCategoryClick = (category) => {
        onCategorySelect(category._id);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        onClearFilter();
        setIsOpen(false);
    };

    const getSelectedCategoryName = () => {
        if (!selectedCategory) return 'Filtrar por categoría';
        const category = categories.find(cat => cat._id === selectedCategory);
        return category ? category.propertyType : 'Filtrar por categoría';
    };

    if (categoriesError) {
        return (
            <div className="category-filter-error">
                Error al cargar categorías
            </div>
        );
    }

    return (
        <div className="category-filter-dropdown" ref={dropdownRef}>
            <button
                className={`filter-button ${isOpen ? 'active' : ''} ${selectedCategory ? 'filtered' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                disabled={isLoadigCategories}
            >
                <span className="filter-icon">🏠</span>
                <span className="filter-text">
                    {isLoadigCategories ? 'Cargando...' : getSelectedCategoryName()}
                </span>
                <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-header">
                        <h4>Filtrar por categoría</h4>
                    </div>

                    <div className="dropdown-content">
                        {/* Opción para mostrar todas las propiedades */}
                        <div
                            className={`dropdown-item ${!selectedCategory ? 'selected' : ''}`}
                            onClick={handleClearFilter}
                        >
                            <span className="category-icon">🏘️</span>
                            <span className="category-name">Todas las propiedades</span>
                            {!selectedCategory && <span className="selected-indicator">✓</span>}
                        </div>

                        <div className="dropdown-divider"></div>

                        {/* Lista de categorías */}
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category._id}
                                    className={`dropdown-item ${selectedCategory === category._id ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <span className="category-icon">🏠</span>
                                    <div className="category-info">
                                        <span className="category-name">{category.propertyType}</span>
                                        <span className="category-description">{category.descriptionType}</span>
                                    </div>
                                    {selectedCategory === category._id && (
                                        <span className="selected-indicator">✓</span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="dropdown-item disabled">
                                <span className="category-name">No hay categorías disponibles</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryFilterDropdown;