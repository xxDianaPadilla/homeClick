import {Schema, model} from "mongoose";

const salesSchema = new Schema({
    paymentType: {
        type: String,
        enum: {
            values: ["Transferencia", "Efectivo", "Débito", "Crédito"],
            message: "El método de pago debe ser 'Transferencia', 'Efectivo', 'Débito' o 'Crédito'"
        },
        default: "Efectivo",
    },
    status: {
        type: String,
        enum: {
            values: ["Pendiente", "Pagado"],
            message: "El estado de la compra deber ser 'Pendiente' o 'Pagado'",
        },
        default: "Pendiente",
    },
    shoppingCartId: {
        type: Schema.Types.ObjectId,
        ref: "ShoppingCart",
        required: [true, "El ID del carrito de compras es obligatorio"],
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Sales", salesSchema);