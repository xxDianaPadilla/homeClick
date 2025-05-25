import express from "express";
import salesController from "../controllers/salesController.js";

const router = express.Router();

router.route("/with-properties")
.get(salesController.getSalesWithProperties);

router.route('/count')
.get(salesController.getSalesCount);

router.route('/sales')
.get(salesController.getSalesStats);

router.route("/")
.get(salesController.getAllSales)  
.post(salesController.createSales);

router.route("/:id")
.get(salesController.getSaleById)
.put(salesController.updateSales)
.delete(salesController.deleteSale);

export default router;