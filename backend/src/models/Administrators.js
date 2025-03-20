

//no es necesario poner validaciones aqui aunque seamos de latam y querramos poner 10 candados
import { Schema, model } from "mongoose";

const administratorsSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Administrator", administratorsSchema);