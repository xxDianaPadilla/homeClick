import express from 'express';

const router = express.Router();
import categoriesController from "../controllers/categoriesController.js";

router.route("/")
.get(categoriesController.getCategories)
.post(categoriesController.createCategories);

router.route("/:id")
.get(categoriesController.getCategories)
.put(categoriesController.updateCategories)
.delete(categoriesController.deleteCategories);

export default router;