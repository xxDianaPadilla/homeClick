import express from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";

const router = express.Router();

router.route("/total-earnings")
.get(shoppingCartController.getTotalEarnings);

router.route("/stats")
.get(shoppingCartController.getCartStats);

router.route("/")
.get(shoppingCartController.getShoppingCart)
.post(shoppingCartController.createShoppingCart);

router.route("/:id")
.get(shoppingCartController.getShoppingCartById)  
.put(shoppingCartController.updateShoppingCart)
.delete(shoppingCartController.deleteShoppingCart);

export default router;