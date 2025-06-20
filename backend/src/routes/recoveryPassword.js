import express from "express";
import recoveryPasswordController from "../controllers/recoveryPasswordController.js";

const router = express.Router();

// Ruta para solicitar código de recuperación
router.route("/requestCode").post(recoveryPasswordController.requestCode);

// Ruta para verificar código de recuperación
router.route("/verifyCode").post(recoveryPasswordController.verifyCode);

// Ruta para establecer nueva contraseña
router.route("/newPassword").post(recoveryPasswordController.newPassword);

export default router;