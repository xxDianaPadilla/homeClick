import {Schema, model} from "mongoose";

const propertiesSchema = new Schema({
    images: [
        {
            image: {
                type: String,
                required: true,
            },
        },
    ],
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    floors: {
        type: Number,
        required: false 
    },
    lotSize: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    constructionYear: {
        type: String,
        required: false
    },
    rooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number, 
        required: false
    },
    parkingLot: {
        type: Boolean,
        required: false
    },
    patio: {
        type: Boolean,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true 
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Property", propertiesSchema);
