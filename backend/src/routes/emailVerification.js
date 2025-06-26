import express from "express";
import emailVerificationController from "../controllers/emailVerificationController.js";

const router = express.Router();

// Ruta para enviar código de verificación de email
router.route("/send-code").post(emailVerificationController.sendVerificationCode);

// Ruta para verificar código de email
router.route("/verify-code").post(emailVerificationController.verifyEmailCode);

// Ruta para verificar si el email está verificado
router.route("/check-verification").get(emailVerificationController.checkEmailVerification);

export default router;