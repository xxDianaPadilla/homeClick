import express from "express";
import shoppingCartController from "../controllers/shoppingCartController.js";

const router = express.Router();

router.route("/total-earnings")
.get(shoppingCartController.getTotalEarnings);

router.route("/stats")
.get(shoppingCartController.getCartStats);

router.route("/customer/:customerId").get(shoppingCartController.getShoppingCartByCustomerId);
router.route("/clear/:customerId").delete(shoppingCartController.clearCart);

router.route("/add-item").post(shoppingCartController.addItemToCart);
router.route("/remove-item").post(shoppingCartController.removeItemFromCart);

router.route("/")
.get(shoppingCartController.getShoppingCart)
.post(shoppingCartController.createShoppingCart);

router.route("/:id")
.get(shoppingCartController.getShoppingCartById)  
.put(shoppingCartController.updateShoppingCart)
.delete(shoppingCartController.deleteShoppingCart);

export default router;