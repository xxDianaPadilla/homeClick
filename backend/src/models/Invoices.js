/*
Collection name: invoices

paymentMethod
purchaseId
customerId
sellerId
*/

import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
    {
        paymentMethod:
        {
            type: String,
            required: true
        },

        purchaseId:
        {
            type: Schema.Types.ObjectId,
            ref: "Purchases",
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
        }
    },
    {
        timestamps: true,
        strict: false
    }
)

export default model("invoices", invoiceSchema);