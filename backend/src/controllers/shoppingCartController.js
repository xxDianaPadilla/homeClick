import shoppingCartModel from "../models/ShoppingCart.js";

const shoppingCartController = {};

shoppingCartController.getShoppingCart = async (req, res) =>{
    const shopppingCart = await shoppingCartModel.find();
    res.json(shopppingCart)
};

shoppingCartController.createShoppingCart = async (req, res) => {
    const {customerId, items, total} = req.body;

    const newShoppingCart = new shoppingCartModel({customerId, items, total});

    await newShoppingCart.save();
    res.json({message: "Carrito de compras guardado"});
};

shoppingCartController.updateShoppingCart = async (req, res) =>{
    const {customerId, items, total} = req.body;

    const updatedShoppingCart = await shoppingCartModel.findByIdAndUpdate(req.params.id, {customerId, items, total}, {new: true});
    
    res.json({message: "Carrito de compras actualizado"});
};

shoppingCartController.deleteShoppingCart = async (req, res) =>{
    const deleteShoppingCart = await shoppingCartModel.findByIdAndDelete(req.params.id);
    res.json({message: "Carrito de compras eliminado"});
};

shoppingCartController.getShoppingCartById = async (req, res) => {
    try {
        const { id } = req.params;

        const shoppingCart = await shoppingCartModel.findById(id);
        
        if (!shoppingCart) {
            return res.status(404).json({ 
                message: 'Carrito de compras no encontrado' 
            });
        }
        
        res.status(200).json(shoppingCart);
        
    } catch (error) {
        console.error('Error getting shopping cart by ID:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
};

export default shoppingCartController;