const propertiesController = {};
import propertiesModel from "../models/Properties.js";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../config.js";
import mongoose from "mongoose";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

propertiesController.getProperties = async(req, res) => {
    try {
        const propertiesSeller = await propertiesModel.find().populate('category');
        res.json(propertiesSeller);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

propertiesController.getPropertiesByCategory = async(req, res) => {
    try {
        const { category } = req.params; 
        
        if (!category) {
            return res.status(400).json({ 
                error: 'Se requiere el ID de la categoría' 
            });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
            return res.status(400).json({ 
                error: 'ID de categoría inválido' 
            });
        }

        const propertiesByCategory = await propertiesModel
            .find({ category: new mongoose.Types.ObjectId(category) })
            .populate('category')
            .sort({ createdAt: -1 }); 
            
        if (propertiesByCategory.length === 0) {
            return res.status(404).json({ 
                message: 'No se encontraron propiedades para esta categoría',
                data: []
            });
        }

        res.status(200).json({
            message: `Se encontraron ${propertiesByCategory.length} propiedades`,
            count: propertiesByCategory.length,
            data: propertiesByCategory
        });

    } catch (error) {
        console.error('Error al buscar propiedades por categoría:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message 
        });
    }
};

propertiesController.getPropertyById = async(req, res) => {
    try {
        const property = await propertiesModel.findById(req.params.id).populate('category');
        
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        
        res.json(property);
    } catch (error) {
        console.error('Error fetching property by ID:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid property ID format" });
        }
        
        res.status(500).json({ error: error.message });
    }
};

propertiesController.createProperties = async (req, res) => {
    try {
        console.log('Received data for creation:', req.body); // Debug log
        
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
            category // CAMBIO: categoryId -> category
        } = req.body;

        // Validar que la categoría esté presente
        if (!category) {
            return res.status(400).json({ 
                error: "La categoría es requerida" 
            });
        }

        // Validar formato de ObjectId
        if (!/^[0-9a-fA-F]{24}$/.test(category)) {
            return res.status(400).json({ 
                error: "Formato de categoría inválido" 
            });
        }

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
            floors: floors ? parseInt(floors) : null,
            lotSize,
            height,
            constructionYear,
            rooms: rooms ? parseInt(rooms) : null,
            bathrooms: bathrooms ? parseInt(bathrooms) : null,
            parkingLot: parkingLot === 'true' || parkingLot === true,
            patio: patio === 'true' || patio === true,
            category 
        });

        console.log('Property object before save:', newProperty); 

        await newProperty.save();
        
        const populatedProperty = await propertiesModel.findById(newProperty._id).populate('category');
        
        res.status(201).json({
            message: "Property created successfully!",
            property: populatedProperty
        });
    } catch (error) {
        console.error('Error creating property:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: "Error de validación: " + error.message 
            });
        }
        
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
        const propertyId = req.params.id;
        console.log('Received propertyId:', propertyId);
        
        if (!propertyId || 
            propertyId === 'undefined' || 
            propertyId === 'null' || 
            typeof propertyId !== 'string' ||
            !/^[0-9a-fA-F]{24}$/.test(propertyId)) {
            console.error('Invalid property ID:', propertyId);
            return res.status(400).json({ 
                error: "ID de propiedad inválido" 
            });
        }

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
            category, // AGREGAR: campo category para actualización
            keepExistingImages,
            existingImages
        } = req.body;

        console.log('Update request data:', {
            propertyId,
            name,
            category, // Debug log para category
            hasNewImages: req.files?.length > 0,
            keepExistingImages,
            existingImages: existingImages ? JSON.parse(existingImages) : null
        });

        const existingProperty = await propertiesModel.findById(propertyId);
        
        if (!existingProperty) {
            return res.status(404).json({ 
                error: "Propiedad no encontrada" 
            });
        }

        let imageURLs = [];

        if (keepExistingImages === 'true' && existingImages) {
            try {
                const parsedExistingImages = JSON.parse(existingImages);
                imageURLs = parsedExistingImages.map(imagePath => ({
                    image: imagePath
                }));
            } catch (parseError) {
                console.error('Error parsing existing images:', parseError);
                imageURLs = existingProperty.images || [];
            }
        } else if (keepExistingImages === 'true') {
            imageURLs = existingProperty.images || [];
        } else {
            if (existingProperty.images && existingProperty.images.length > 0) {
                for (const img of existingProperty.images) {
                    if (img.image) {
                        try {
                            const publicId = img.image.split('/').pop().split('.')[0];
                            await cloudinary.uploader.destroy(`properties/${publicId}`);
                        } catch (deleteError) {
                            console.error('Error deleting image from cloudinary:', deleteError);
                        }
                    }
                }
            }
        }

        if (req.files && req.files.length > 0) {
            console.log('Uploading new images:', req.files.length);
            for (const file of req.files) {
                try {
                    const result = await cloudinary.uploader.upload(
                        file.path,
                        {
                            folder: "properties",
                            allowed_formats: ["jpg", "png", "jpeg"]
                        }
                    );
                    imageURLs.push({ image: result.secure_url });
                } catch (uploadError) {
                    console.error('Error uploading image:', uploadError);
                    throw new Error('Error al subir una de las imágenes');
                }
            }
        }

        const isValidValue = (value) => {
            return value !== undefined && 
                   value !== null && 
                   value !== '' && 
                   value !== 'undefined' && 
                   value !== 'null';
        };

        const updateData = {
            images: imageURLs
        };

        if (isValidValue(name)) updateData.name = name;
        if (isValidValue(description)) updateData.description = description;
        if (isValidValue(location)) updateData.location = location;
        if (isValidValue(price)) updateData.price = price;

        // AGREGAR: Validación y actualización de categoría
        if (isValidValue(category)) {
            if (!/^[0-9a-fA-F]{24}$/.test(category)) {
                return res.status(400).json({ 
                    error: "Formato de categoría inválido" 
                });
            }
            updateData.category = category;
        }

        if (isValidValue(floors)) {
            const floorsNum = parseInt(floors);
            if (!isNaN(floorsNum) && floorsNum > 0) {
                updateData.floors = floorsNum;
            }
        }

        if (isValidValue(lotSize)) {
            updateData.lotSize = lotSize.toString().trim();
        }

        if (isValidValue(height)) {
            updateData.height = height.toString().trim();
        }

        if (isValidValue(constructionYear)) {
            const yearStr = constructionYear.toString().trim();
            if (yearStr.length === 4 && !isNaN(parseInt(yearStr))) {
                updateData.constructionYear = yearStr;
            }
        }

        if (isValidValue(rooms)) {
            const roomsNum = parseInt(rooms);
            if (!isNaN(roomsNum) && roomsNum > 0) {
                updateData.rooms = roomsNum;
            }
        }

        if (isValidValue(bathrooms)) {
            const bathroomsNum = parseInt(bathrooms);
            if (!isNaN(bathroomsNum) && bathroomsNum > 0) {
                updateData.bathrooms = bathroomsNum;
            }
        }

        if (isValidValue(parkingLot)) {
            updateData.parkingLot = parkingLot === 'true' || parkingLot === true;
        }

        if (isValidValue(patio)) {
            updateData.patio = patio === 'true' || patio === true;
        }

        console.log('Final update data:', updateData);

        const updatedProperty = await propertiesModel.findByIdAndUpdate(
            propertyId,
            updateData,
            { 
                new: true,
                runValidators: true 
            }
        ).populate('category'); // AGREGAR: populate para devolver categoría completa

        if (!updatedProperty) {
            return res.status(404).json({ 
                error: "No se pudo actualizar la propiedad" 
            });
        }

        res.json({
            message: "Propiedad actualizada exitosamente",
            property: updatedProperty
        });

    } catch (error) {
        console.error("Update error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                error: "Error de validación: " + error.message 
            });
        }
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                error: "ID de propiedad con formato inválido" 
            });
        }
        
        res.status(500).json({ 
            error: "Error interno del servidor: " + error.message 
        });
    }
};

export default propertiesController;