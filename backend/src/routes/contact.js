import express from 'express';
import contactController from '../controllers/contactController.js';

const router = express.Router();

router.route("/send-message").post(contactController.sendMessage);

export default router;