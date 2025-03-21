import expressm from "express";
import reviewsController from "../controllers/reviewsController.js";

const router = expressm.Router();

router.route("/")
    .get(reviewsController.getReviews)
    .post(reviewsController.createReviews);

router.route("/:id")
    .delete(reviewsController.deleteReviews)
    .put(reviewsController.updateReviews);   

export default router;