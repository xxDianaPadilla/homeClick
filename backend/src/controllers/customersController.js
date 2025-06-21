const customersController = {};
import customersModel from "../models/Customers.js"

customersController.getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.find();
        res.json(customers);
    } catch (error) {
        console.error('Error getting customers: ', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
}

customersController.createCustomer = async (req, res) => {
    try {
        const {firstName, lastName, birthDate, dui, password, email, phone, profilePicture, address, budget, minBudget, maxBudget} = req.body;
        const newCustomer = new customersModel({
            firstName,
            lastName,
            birthDate,
            dui,
            password,
            email,
            phone,
            profilePicture: profilePicture || '',
            address,
            budget,
            minBudget: minBudget || 0,
            maxBudget: maxBudget || 0
        });
        await newCustomer.save();
        res.json({ message: "Customer created" });
    } catch (error) {
        console.error('Error creating customer: ', error);
        res.status(500).json({
            message: 'Error al crear el cliente',
            error: error.message
        });
    }
}

customersController.deleteCustomer = async (req, res) => {
    try {
        const deleteCustomer = await customersModel.findByIdAndDelete(req.params.id);

        if(!deleteCustomer){
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        res.json({ message: "Customer deleted" });
    } catch (error) {
        console.error('Error deleting customer: ', error);
        res.status(500).json({
            message: 'Error al eliminar el cliente',
            error: error.message
        });
    }
}

customersController.updateCustomer = async (req, res) => {
    try {
        const { firstName, lastName, birthDate, dui, password, email, phone, profilePicture, address, budget, minBudget, maxBudget} = req.body;

        const updateData = {};

        if(firstName !== undefined) updateData.firstName = firstName;
        if(lastName !== undefined) updateData.lastName = lastName;
        if(birthDate !== undefined) updateData.birthDate = birthDate;
        if(dui !== undefined) updateData.dui = dui;
        if(password !== undefined && password !== '') updateData.password = password;
        if(email !== undefined) updateData.email = email;
        if(phone !== undefined) updateData.phone = phone;
        if(profilePicture !== undefined) updateData.profilePicture = profilePicture;
        if(address !== undefined) updateData.address = address;
        if(budget !== undefined) updateData.budget = budget;
        if(minBudget !== undefined) updateData.minBudget = minBudget;
        if(maxBudget !== undefined) updateData.maxBudget = maxBudget;

        const updatedCustomer = await customersModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        );

        if(!updatedCustomer){
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }

        res.json({
            message: "Customer updated",
            customer: updatedCustomer
        });
    } catch (error) {
        console.error('Error updating customer: ', error);
        res.status(500).json({
            message: 'Error al actualizar el cliente',
            error: error.message
        });
    }
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