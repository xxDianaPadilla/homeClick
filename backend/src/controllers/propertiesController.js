const propertiesController = {};

import propertiesModel from "../models/Properties.js";

propertiesController.getProperties = async(req, res) =>{
    const propertiesSeller = await propertiesModel.find().populate('sellerId').populate('categoryId');
    res.json(propertiesSeller)
};

propertiesController.createProperties = async (req, res) =>{
    const {images, description, location, price, floors, flooringType, lotSize, height, constructionYear, rooms, bathrooms, parkingLot, patio, sellerId, categoryId} = req.body;
    
    const newProperty = new propertiesModel({
        images, description, location, price, floors, flooringType, lotSize, height, constructionYear, rooms, bathrooms, parkingLot, patio, sellerId, categoryId
    });

    await newProperty.save();
    res.json({message: "Property saved!"});
};

propertiesController.deleteProperties = async (req, res) =>{
    const deleteProperty = await propertiesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Property deleted!"});
};

propertiesController.updateProperties = async (req, res) =>{
    const {images, description, location, price, floors, flooringType, lotSize, height, constructionYear, rooms, bathrooms, parkingLot, patio, sellerId, categoryId} = req.body;

    const updateProperty = await propertiesModel.findByIdAndUpdate(req.params.id, {images, description, location, price, floors, flooringType, lotSize, height, constructionYear, rooms, bathrooms, parkingLot, patio, sellerId, categoryId}, {new: true});

    res.json({message: "Property updated!"})
};

export default propertiesController;