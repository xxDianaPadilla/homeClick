import expressm from "express";
import notificationsController from "../controllers/notificationsController.js";

const router = expressm.Router();

router.route("/")
    .get(notificationsController.getNotifications)
    .post(notificationsController.createNotification);

router.route("/:id")
    .delete(notificationsController.deleteNotification)
    .put(notificationsController.updateNotification);   

export default router;