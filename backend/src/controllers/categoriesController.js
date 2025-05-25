const categoriesController = {};

import categoriesModel from "../models/Categories.js";

categoriesController.getCategories = async (req, res) => {
    try {
        const categories = await categoriesModel.find();
        res.json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: "Error al obtener categorías" });
    }
};

categoriesController.createCategories = async (req, res) => {
    try {
        const { propertyType, descriptionType } = req.body;

        const newCategory = new categoriesModel({
            propertyType,
            descriptionType
        });

        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);

    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: "Error al crear categoría" });
    }
};

categoriesController.deleteCategories = async (req, res) => {
    try {
        const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({
            message: "Categoría eliminada exitosamente",
            deletedId: req.params.id,
            deletedCategory: deletedCategory
        });

    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: "Error al eliminar categoría" });
    }
};

categoriesController.updateCategories = async (req, res) => {
    try {
        const { propertyType, descriptionType } = req.body;

        const updatedCategory = await categoriesModel.findByIdAndUpdate(
            req.params.id,
            { propertyType, descriptionType },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json(updatedCategory);

    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: "Error al actualizar categoría" });
    }
};

export default categoriesController;