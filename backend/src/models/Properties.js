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
    description: {
        type: String, 
        require: true
    },
    location: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    floors: {
        type: Number,
        require: true
    },
    flooringType: {
        type: String,
        require: true
    },
    lotSize: {
        type: String,
        require: true
    },
    height: {
        type: String,
        require: true
    },
    constructionYear: {
        type: String,
        require: true
    },
    rooms: {
        type: Number,
        require: true
    },
    bathrooms: {
        type: Number, 
        require: true
    },
    parkingLot: {
        type: Boolean,
        require: true
    },
    patio: {
        type: Boolean,
        require: true
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "Administrator",
        require: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Property", propertiesSchema);