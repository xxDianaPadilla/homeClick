const administratorsController = {};

import administratorsModel from "../models/Administrators.js";

administratorsController.getAdministrators = async (req, res) =>{
    const administrators = await administratorsModel.find();
    res.json(administrators)
};

administratorsController.createAdministrators = async (req, res) =>{
    const {email, password} = req.body;

    const newAdministrators = new administratorsModel({
        email, password
    });

    await newAdministrators.save();
    res.json({message: "administrador guardado"});
};

administratorsController.deleteAdministrators = async (req, res) =>{
    const deleteClient = await administratorsModel.findByIdAndDelete(req.params.id);
    res.json({message: "administrador eliminado"});
};

administratorsController.updateAdministrators = async (req, res) =>{
    const {email, password} = req.body;

    const updatedAdministrators = await administratorsModel.findByIdAndUpdate(req.params.id, {email, password}, {new: true});
    
    res.json({message: "administrador actualizado"});
};

export default administratorsController;