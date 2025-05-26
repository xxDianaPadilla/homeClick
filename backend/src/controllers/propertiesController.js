const propertiesController = {};
import propertiesModel from "../models/Properties.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

propertiesController.getProperties = async(req, res) => {
    try {
        const propertiesSeller = await propertiesModel.find().populate('categoryId');
        res.json(propertiesSeller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

propertiesController.createProperties = async (req, res) => {
    try {
        const {
            name, 
            description, 
            location, 
            price, 
            floors, 
            lotSize, 
            height, 
            constructionYear, 
            rooms, 
            bathrooms, 
            parkingLot, 
            patio, 
            categoryId
        } = req.body;

        let imageURLs = [];
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(
                    file.path,
                    {
                        folder: "properties",
                        allowed_formats: ["jpg", "png", "jpeg"]
                    }
                );
                imageURLs.push({ image: result.secure_url });
            }
        }

        const newProperty = new propertiesModel({
            images: imageURLs,
            name,
            description,
            location,
            price,
            floors: parseInt(floors),
            lotSize,
            height,
            constructionYear,
            rooms: parseInt(rooms),
            bathrooms: parseInt(bathrooms),
            parkingLot: parkingLot === 'true' || parkingLot === true,
            patio: patio === 'true' || patio === true,
            categoryId
        });

        await newProperty.save();
        res.status(201).json({
            message: "Property created successfully!",
            property: newProperty
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

propertiesController.deleteProperties = async (req, res) => {
    try {
        const property = await propertiesModel.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        if (property.images && property.images.length > 0) {
            for (const img of property.images) {
                if (img.image) {
                    const publicId = img.image.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(`properties/${publicId}`);
                }
            }
        }

        await propertiesModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Property deleted!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

propertiesController.updateProperties = async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            price,
            floors,
            lotSize,
            height,
            constructionYear,
            rooms,
            bathrooms,
            parkingLot,
            patio,
            categoryId,
            keepExistingImages
        } = req.body;

        const existingProperty = await propertiesModel.findById(req.params.id);
        
        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        let imageURLs = [];

        if (keepExistingImages === 'true') {
            imageURLs = existingProperty.images;
        } else {
            if (existingProperty.images && existingProperty.images.length > 0) {
                for (const img of existingProperty.images) {
                    if (img.image) {
                        const publicId = img.image.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(`properties/${publicId}`);
                    }
                }
            }
        }

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(
                    file.path,
                    {
                        folder: "properties",
                        allowed_formats: ["jpg", "png", "jpeg"]
                    }
                );
                imageURLs.push({ image: result.secure_url });
            }
        }

        const updateProperty = await propertiesModel.findByIdAndUpdate(
            req.params.id,
            {
                images: imageURLs,
                name,
                description,
                location,
                price,
                floors: parseInt(floors),
                lotSize,
                height,
                constructionYear,
                rooms: parseInt(rooms),
                bathrooms: parseInt(bathrooms),
                parkingLot: parkingLot === 'true' || parkingLot === true,
                patio: patio === 'true' || patio === true,
                categoryId
            },
            { new: true }
        );

        res.json({
            message: "Property updated!",
            property: updateProperty
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default propertiesController;