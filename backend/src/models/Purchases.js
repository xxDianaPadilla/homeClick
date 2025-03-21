import { Schema, model } from "mongoose";

const purchasesSchema = new Schema(
    {
        totalAmount:
        {
            type: String,
            required: true
        },

        paymentState:
        {
            type: String,
            required: true
        },

        customerId:
        {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },

        sellerId:
        {
            type: Schema.Types.ObjectId,
            ref: "Administrator",
            required: true
        },
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: "Property",
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("Purchases", purchasesSchema);