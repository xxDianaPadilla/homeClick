import { Schema, model } from "mongoose";

const customerSchema = new Schema(
    {
        firstName:
        {
            type: String,
            required: true
        },

        lastName:
        {
            type: String,
            required: true
        },

        birthDate:
        {
            type: Date,
            required: true
        },

        dui:
        {
            type: String,
            required: true
        },

        password:
        {
            type: String,
            required: true
        },

        email:
        {
            type: String,
            required: true
        },

        phone:
        {
            type: String,
            required: true
        },

        profilePicture:
        {
            type: String,
            required: true,
            default: ''
        },

        address:
        {
            type: String,
            required: true
        },

        budget:
        {
            type: Number,
            required: false
        },

        minBudget: {
            type: Number,
            required: false,
            default: 0
        },

        maxBudget: {
            type: Number,
            required: false,
            default: 0
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Customer", customerSchema);