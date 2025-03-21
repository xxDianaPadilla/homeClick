import express from "express";
import invoicesController from "../controllers/invoicesController.js";

const router = express.Router();

router.route("/")
    .get(invoicesController.getInvoices)
    .post(invoicesController.createInvoice);    

router.route("/:id")
    .delete(invoicesController.deleteInvoice)
    .put(invoicesController.updateInvoice);

export default router;