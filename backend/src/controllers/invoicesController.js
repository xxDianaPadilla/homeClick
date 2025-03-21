/*
Collection name: invoices

paymentMethod
purchaseId
customerId
sellerId
*/

const invoicesController = {};
import invoicesModel from "../models/Invoices.js";

//SELECT
invoicesController.getInvoices = async (req, res) => {
  const invoices = await invoicesModel.find().populate("purchaseId").populate("customerId").populate("sellerId");
  res.json(invoices);
};

//INSERT
invoicesController.createInvoice = async (req, res) => {
  const { paymentMethod, purchaseId, customerId, sellerId } = req.body;
  const newInvoice = new invoicesModel({
    paymentMethod,
    purchaseId,
    customerId,
    sellerId,
  });
  await newInvoice.save();
  res.json({ message: "Invoice created" });
};

//DELETE
invoicesController.deleteInvoice = async (req, res) => {
  const deleteInvoice = await invoicesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Invoice deleted" });
};

//UPDATE
invoicesController.updateInvoice = async (req, res) => {
  const { paymentMethod, purchaseId, customerId, sellerId } = req.body;
  await
  invoicesModel.findByIdAndUpdate(req.params.id, {
    paymentMethod,
    purchaseId,
    customerId,
    sellerId,
  });
    res.json({ message: "Invoice updated" });
}

export default invoicesController;