const customersController = {};
import customersModel from "../models/Customers.js"

customersController.getCustomers = async (req, res) => {
    const customers = await customersModel.find();
    res.json(customers);
}

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

customersController.deleteCustomer = async (req, res) => {
    const deleteCustomer = await customersModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
}

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

customersController.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const customer = await customersModel.findById(id);
        
        if (!customer) {
            return res.status(404).json({ 
                message: 'Cliente no encontrado' 
            });
        }
        
        res.status(200).json(customer);
        
    } catch (error) {
        console.error('Error getting customer by ID:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
};

export default customersController;