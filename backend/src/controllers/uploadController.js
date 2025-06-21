import {v2 as cloudinary} from 'cloudinary';
import {config} from '../config.js';
import multer from 'multer';

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
});

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith('image/')){
            cb(null, true);
        }else{
            cb(new Error('El archivo debe ser una imagen'), false);
        }
    }
});

const uploadController = {};

uploadController.uploadMiddleWare = upload.single('image');

uploadController.uploadImage = async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'No se proporcionó ningún archivo'
            });
        }

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'homeclick/profiles',
            public_id: `profile_${Date.now()}`,
            overwrite: true,
            transformation: [
                {width: 400, height: 400, crop: 'fill', gravity: 'face'},
                {quality: 'auto'},
                {format: 'auto'}
            ]
        });

        res.json({
            success: true,
            message: 'Imagen subida correctamente',
            imageUrl: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('Error subiendo imagen: ', error);

        if(error.message === 'El archivo debe ser una imagen'){
            return res.status(400).json({
                success: false,
                message: 'El archivo debe ser una imagen válida'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al subir la imagen',
            error: error.message
        });
    }
};

uploadController.deleteImage = async (req, res) => {
    try {
        const {public_id} = req.body;

        if(!public_id){
            return res.status(400).json({
                success: false,
                message: 'Se requiere el public_id de la imagen'
            });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        res.json({
            success: true,
            message: 'Imagen eliminada correctamente',
            result: result
        });
    } catch (error) {
        console.error('Error eliminando imagen: ', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la imagen',
            error: error.message
        });
    }
};

export default uploadController;