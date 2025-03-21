const notificationsController = {};
import notificationsModel from '../models/Notifications.js';

/*
Collection name: notifications

type
description
date
*/

//SELECT
notificationsController.getNotifications = async (req, res) => {
    const notifications = await notificationsModel.find();
    res.json(notifications);
}

//INSERT
notificationsController.createNotification = async (req, res) => {
    const { type, description, date } = req.body;
    const newNotification = new notificationsModel({
        type,
        description,
        date
    });
    await newNotification.save();
    res.json({ message: "Notification created" });
}

//DELETE
notificationsController.deleteNotification = async (req, res) => {
    const deleteNotification = await notificationsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted" });
}

//UPDATE
notificationsController.updateNotification = async (req, res) => {
    const { type, description, date } = req.body;
    await
    notificationsModel.findByIdAndUpdate(req.params.id, {
        type,
        description,
        date
    });
    res.json({ message: "Notification updated" });
}

export default notificationsController;