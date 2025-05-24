import express from "express";
import salesController from "../controllers/salesController.js";

const router = express.Router();

router.route("/")
.get(salesController.getSales)
.post(salesController.createSales);

router.route("/:id")
.put(salesController.updateSales)
.delete(salesController.deleteSale);

export default router;