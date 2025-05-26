import express from 'express';
import propertiesController from "../controllers/propertiesController.js";
import multer from "multer";
import fs from 'fs';

const router = express.Router();

const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Carpeta uploads creada');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        console.log('Guardando archivo como:', uniqueName);
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('Procesando archivo:', file.originalname, 'Tipo:', file.mimetype);
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, 
        files: 10 
    }
});

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'El archivo es demasiado grande. Tamaño máximo: 10MB'
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: 'Demasiados archivos. Máximo: 10 archivos'
            });
        }
    }
    
    if (err.message === 'Solo se permiten archivos de imagen') {
        return res.status(400).json({
            error: 'Solo se permiten archivos de imagen'
        });
    }
    
    next(err);
};

router.route("/")
    .get(propertiesController.getProperties)
    .post(upload.array("images", 10), handleMulterError, propertiesController.createProperties);

router.route("/:id")
    .put(upload.array("images", 10), handleMulterError, propertiesController.updateProperties)
    .delete(propertiesController.deleteProperties);

export default router;