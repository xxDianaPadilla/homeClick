/*
Notifications
type
description
date
*/

import { Schema, model } from 'mongoose';

const notificationSchema = new Schema(
    {
        type:
        {
            type: String,
            required: true
        },

        description:
        {
            type: String,
            required: true
        },

        date:
        {
            type: Date,
            required: true
        }
    }
    ,
    {
        timestamps: true,
        strict: false
    }
);

export default model('Notification', notificationSchema);