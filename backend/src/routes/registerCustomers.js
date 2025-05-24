import express from "express";
import registerCustomersController from "../controllers/registerCustomersController.js";

const router = express.Router();

router.route("/").post(registerCustomersController.register);
router.route("/verifyCodeEmail").post(registerCustomersController.verifyCodeEmail);

export default router;
