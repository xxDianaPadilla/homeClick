const categoriesController = {};

import categoriesModel from "../models/Categories.js";

categoriesController.getCategories = async (req, res) =>{
    const categories = await categoriesModel.find();
    res.json(categories)
};

categoriesController.createCategories = async (req, res) =>{
    const {propertyType, descriptionType} = req.body;

    const newCategories = new categoriesModel({
        propertyType, descriptionType
    });

    await newCategories.save();
    res.json({message: "categoria guardado"});
};

categoriesController.deleteCategories = async (req, res) =>{
    const deleteCategories = await categoriesModel.findByIdAndDelete(req.params.id);
    res.json({message: "categoria eliminado"});
};

categoriesController.updateCategories = async (req, res) =>{
    const {propertyType, descriptionType} = req.body;

    const updatedCategories = await categoriesModel.findByIdAndUpdate(req.params.id, {propertyType, descriptionType}, {new: true});
    
    res.json({message: "categoria actualizado"});
};

export default categoriesController;