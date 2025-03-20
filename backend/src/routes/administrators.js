import express from 'express';

const router = express.Router();
import administratorsController from "../controllers/administratorsController.js";

router.route("/")
.get(administratorsController.getAdministrators)
.post(administratorsController.createAdministrators);

router.route("/:id")
.get(administratorsController.getAdministrators)
.put(administratorsController.updateAdministrators)
.delete(administratorsController.deleteAdministrators);

export default router;