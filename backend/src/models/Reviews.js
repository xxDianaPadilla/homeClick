import { Schema, model } from "mongoose";

const reviewsSchema = new Schema({
    comments: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        require: true
    },
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: "Property",
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Review", reviewsSchema);