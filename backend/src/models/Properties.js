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
        require: true,
    },
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
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: false
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Property", propertiesSchema);
