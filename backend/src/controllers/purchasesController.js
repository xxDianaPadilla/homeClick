const purchasesController = {};

import purchasesModel from "../models/Purchases.js";

purchasesController.getPurchases = async (req, res) =>{
    const purchases = await purchasesModel.find().populate('customerId').populate('sellerId').populate('propertyId');
    res.json(purchases);
};

purchasesController.createPurchases = async (req, res) =>{
    const {totalAmount, paymentState, customerId, sellerId, propertyId} = req.body;
    
    const newPurchase = new purchasesModel({
        totalAmount, paymentState, customerId, sellerId, propertyId
    });

    await newPurchase.save();
    res.json({message: "Purchase saved!"});
};

purchasesController.deletePurchases = async (req, res) =>{
    const deletePurchase = await purchasesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Purchase deleted!"});
};

purchasesController.updatePurchases = async (req, res) =>{
    const {totalAmount, paymentState, customerId, sellerId, propertyId} = req.body;

    const updatePurchase = await purchasesModel.findByIdAndUpdate(req.params.id, {totalAmount, paymentState, customerId, sellerId, propertyId}, {new: true});

    res.json({message: "Property updated!"})
};

export default purchasesController;