import { Schema, model } from "mongoose";

const shoppingCartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, "El ID del cliente es obligatorio"],
    },
    items: [
        {
            propertyId: {
                type: Schema.Types.ObjectId,
                ref: "Property", 
                required: true,
            },
            quantity: {
                type: Number,
                min: [1, "La cantidad debe ser al menos 1"],
                required: true,
            },
            subtotal: {
                type: Number,
                required: true,
                min: [0, "El total no puede ser negativo"],
            },
            purchased: {
                type: Boolean,
                default: false,
            },
            purchaseDate: {
                type: Date,
                default: null,
            }
        },
    ],
    total: {
        type: Number,
        required: true,
        min: [0, "El total no puede ser negativo"],
    }
}, {
    timestamps: true,
    strict: false
});

export default model("ShoppingCart", shoppingCartSchema);