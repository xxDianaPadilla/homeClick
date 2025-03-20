import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
    propertyType: {
        type: String,
        require: true
    },
    descriptionType: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Categorie", categoriesSchema);