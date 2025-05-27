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


propertiesController.getPropertyById = async(req, res) => {
    try {
        const property = await propertiesModel.findById(req.params.id).populate('categoryId');
        
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
        // Validar que el ID es válido
        const propertyId = req.params.id;
        console.log('Received propertyId:', propertyId);
        
        // Validación más robusta del ObjectId
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
            keepExistingImages,
            existingImages
        } = req.body;

        console.log('Update request data:', {
            propertyId,
            name,
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

        // Manejar imágenes existentes
        if (keepExistingImages === 'true' && existingImages) {
            try {
                const parsedExistingImages = JSON.parse(existingImages);
                // Mantener imágenes existentes que están en la lista
                imageURLs = parsedExistingImages.map(imagePath => ({
                    image: imagePath
                }));
            } catch (parseError) {
                console.error('Error parsing existing images:', parseError);
                // Si hay error parseando, mantener las imágenes actuales
                imageURLs = existingProperty.images || [];
            }
        } else if (keepExistingImages === 'true') {
            // Mantener todas las imágenes existentes
            imageURLs = existingProperty.images || [];
        } else {
            // Eliminar imágenes existentes de Cloudinary si no se van a mantener
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

        // Subir nuevas imágenes
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

        // Función helper para validar valores
        const isValidValue = (value) => {
            return value !== undefined && 
                   value !== null && 
                   value !== '' && 
                   value !== 'undefined' && 
                   value !== 'null';
        };

        // Preparar datos de actualización - campos requeridos
        const updateData = {
            images: imageURLs
        };

        // Solo actualizar campos que tienen valores válidos
        if (isValidValue(name)) updateData.name = name;
        if (isValidValue(description)) updateData.description = description;
        if (isValidValue(location)) updateData.location = location;
        if (isValidValue(price)) updateData.price = price;

        // Campos opcionales con validación adicional
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
            // Manejar constructionYear como string según tu schema
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
                runValidators: true // Ejecutar validaciones del schema
            }
        );

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
        
        // Manejar diferentes tipos de errores
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