import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.route("/wompi").post(paymentController.createWompiTransaction);
router.route("/simulate").post(paymentController.simulatePayment);
router.route("/status/:transactionId").get(paymentController.checkTransactionStatus);
router.route("/customer/:customerId/paid_sales", paymentController.getPaidSalesByCustomer);

export default router;