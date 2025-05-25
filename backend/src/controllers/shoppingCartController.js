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

shoppingCartController.getTotalEarnings = async (req, res) => {
  try {
    const result = await shoppingCartModel.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$total' }
        }
      }
    ]);

    const totalEarnings = result.length > 0 ? result[0].totalEarnings : 0;

    res.status(200).json({
      success: true,
      totalEarnings
    });
  } catch (error) {
    console.error('Error al obtener ganancias totales:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.getCartStats = async (req, res) => {
  try {
    const totalCarts = await shoppingCartModel.countDocuments();
    
    const earningsResult = await shoppingCartModel.aggregate([
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$total' },
          averageCartValue: { $avg: '$total' },
          maxCartValue: { $max: '$total' },
          minCartValue: { $min: '$total' }
        }
      }
    ]);

    const itemsResult = await shoppingCartModel.aggregate([
      {
        $unwind: '$items'
      },
      {
        $group: {
          _id: null,
          totalItems: { $sum: '$items.quantity' },
          totalUniqueProperties: { $addToSet: '$items.propertyId' }
        }
      },
      {
        $project: {
          totalItems: 1,
          totalUniqueProperties: { $size: '$totalUniqueProperties' }
        }
      }
    ]);

    const earnings = earningsResult.length > 0 ? earningsResult[0] : {
      totalEarnings: 0,
      averageCartValue: 0,
      maxCartValue: 0,
      minCartValue: 0
    };

    const items = itemsResult.length > 0 ? itemsResult[0] : {
      totalItems: 0,
      totalUniqueProperties: 0
    };

    res.status(200).json({
      success: true,
      stats: {
        totalCarts,
        ...earnings,
        ...items
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas del carrito:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export default shoppingCartController;