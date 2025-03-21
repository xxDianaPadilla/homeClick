const customersController = {};
import customersModel from "../models/Customers.js"

//SELECT
customersController.getCustomers = async (req, res) => {
    const customers = await customersModel.find();
    res.json(customers);
}

//INSERT
customersController.createCustomer = async (req, res) => {
    const {firstName, lastName, birthDate, dui, password, email, phone, profilePicture, address, budget} = req.body;
    const newCustomer = new customersModel({
        firstName,
        lastName,
        birthDate,
        dui,
        password,
        email,
        phone,
        profilePicture,
        address,
        budget
    });
    await newCustomer.save();
    res.json({ message: "Customer created" });
}

//DELETE
customersController.deleteCustomer = async (req, res) => {
    const deleteCustomer = await customersModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
}

//UPDATE
customersController.updateCustomer = async (req, res) => {
    const { firstName, lastName, birthDate, dui, password, email, phone, profilePicture, address, budget} = req.body;
    await customersModel.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        birthDate,
        dui,
        password,
        email,
        phone,
        profilePicture,
        address,
        budget
    });
    res.json({ message: "Customer updated" });
}

export default customersController;