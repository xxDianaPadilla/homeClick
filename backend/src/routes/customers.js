import express from "express";
import customersController from "../controllers/customersController.js";

const router = express.Router();

router.route("/")
    .get(customersController.getCustomers)
    .post(customersController.createCustomer);

router.route("/:id")
    .delete(customersController.deleteCustomer)
    .put(customersController.updateCustomer);

export default router;