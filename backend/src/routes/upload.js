import express from 'express';
import uploadController from '../controllers/uploadController.js';

const router = express.Router();

router.route('/upload-image').post(uploadController.uploadMiddleWare, uploadController.uploadImage);

router.route('/delete-image').delete(uploadController.deleteImage);

export default router;