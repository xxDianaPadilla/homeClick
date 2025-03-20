import express from 'express';

const router = express.Router();
import propertiesController from "../controllers/propertiesController.js";

router.route("/")
.get(propertiesController.getProperties)
.post(propertiesController.createProperties);

router.route("/:id")
.put(propertiesController.updateProperties)
.delete(propertiesController.deleteProperties);

export default router;