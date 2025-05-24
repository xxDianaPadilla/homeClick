import salesModel from "../models/Sales.js";

const salesController = {};

salesController.getSales = async (req, res) =>{
    const sales = await salesModel.find();
    res.json(sales)
};

salesController.createSales = async (req, res) => {
    const {paymentType, status, shoppingCartId} = req.body;

    const newSale = new salesModel({paymentType, status, shoppingCartId});

    await newSale.save();
    res.json({message: "Venta guardada"});
};

salesController.updateSales = async (req, res) =>{
    const {paymentType, status, shoppingCartId} = req.body;

    const updatedSale = await salesModel.findByIdAndUpdate(req.params.id, {paymentType, status, shoppingCartId}, {new: true});
    
    res.json({message: "Venta actualizada"});
};

salesController.deleteSale = async (req, res) =>{
    const deleteSale = await salesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Venta eliminada"});
};

export default salesController;