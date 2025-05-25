import express from "express";
import salesController from "../controllers/salesController.js";

const router = express.Router();

router.route("/with-properties")
.get(salesController.getSalesWithProperties);

router.route("/")
.get(salesController.getAllSales)  
.post(salesController.createSales);

router.route("/:id")
.get(salesController.getSaleById)
.put(salesController.updateSales)
.delete(salesController.deleteSale);

export default router;