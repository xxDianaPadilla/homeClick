import shoppingCartModel from "../models/ShoppingCart.js";

const shoppingCartController = {};

shoppingCartController.getShoppingCart = async (req, res) => {
  try {
    const shopppingCart = await shoppingCartModel.find()
      .populate('customerId', 'firstName lastName email')
      .populate('items.propertyId', 'name price location');
    res.json(shopppingCart)
  } catch (error) {
    console.error('Error getting shopping carts:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.getShoppingCartByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;

    const shoppingCart = await shoppingCartModel.findOne({ customerId })
      .populate('items.propertyId', 'name price location description lotSize rooms bathrooms images');

    if (!shoppingCart) {
      return res.status(200).json({
        customerId,
        items: [],
        total: 0
      });
    }

    res.status(200).json(shoppingCart);
  } catch (error) {
    console.error('Error getting shopping cart by customer ID: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.addItemToCart = async (req, res) => {
  try {
    const { customerId, propertyId, quantity = 1, subtotal } = req.body;

    if (!customerId || !propertyId || !subtotal) {
      return res.status(400).json({
        message: 'CustomerId, propertyId y subtotal son requeridos'
      });
    }

    let shoppingCart = await shoppingCartModel.findOne({ customerId });

    if (shoppingCart) {
      const existingItemIndex = shoppingCart.items.findIndex(
        item => item.propertyId.toString() === propertyId
      );

      if (existingItemIndex > -1) {
        shoppingCart.items[existingItemIndex].quantity += quantity;
        shoppingCart.items[existingItemIndex].subtotal += subtotal;
      } else {
        shoppingCart.items.push({
          propertyId,
          quantity,
          subtotal
        });
      }

      shoppingCart.total = shoppingCart.items.reduce((total, item) => total + item.subtotal, 0);

      await shoppingCart.save();
    } else {
      shoppingCart = new shoppingCartModel({
        customerId,
        items: [{
          propertyId,
          quantity,
          subtotal
        }],
        total: subtotal
      });

      await shoppingCart.save();
    }

    await shoppingCart.populate('items.propertyId', 'name price location description lotSize rooms bathrooms images');

    res.status(200).json({
      message: "Item agregado al carrito exitosamente",
      shoppingCart
    });
  } catch (error) {
    console.error('Error adding item to cart: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.removeItemFromCart = async (req, res) => {
  try {
    const { customerId, propertyId } = req.body;

    if (!customerId || !propertyId) {
      return res.status(400).json({
        message: 'CustomerId y propertyId son requeridos'
      });
    }

    const shoppingCart = await shoppingCartModel.findOne({ customerId });

    if (!shoppingCart) {
      return res.status(404).json({
        message: 'Carrito no encontrado'
      });
    }

    shoppingCart.items = shoppingCart.items.filter(
      item => item.propertyId.toString() !== propertyId
    );

    shoppingCart.total = shoppingCart.items.reduce((total, item) => total + item.subtotal, 0);

    await shoppingCart.save();

    await shoppingCart.populate('items.propertyId', 'name price location description lotSize rooms bathrooms');

    res.status(200).json({
      message: "Item removido del carrito exitosamente",
      shoppingCart
    });
  } catch (error) {
    console.error('Error removing item from cart: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.clearCart = async (req, res) => {
  try {
    const { customerId } = req.params;

    const result = await shoppingCartModel.findOneAndDelete({ customerId });

    if (!result) {
      return res.status(404).json({
        message: 'Carrito no encontrado'
      });
    }

    res.status(200).json({
      message: "Carrito limpiado exitosamente"
    });
  } catch (error) {
    console.error('Error clearing cart: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.createShoppingCart = async (req, res) => {
  try {
    const { customerId, items, total } = req.body;

    const newShoppingCart = new shoppingCartModel({ customerId, items, total });

    await newShoppingCart.save();
    res.json({ message: "Carrito de compras guardado" });
  } catch (error) {
    console.error('Error creating shopping cart: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.updateShoppingCart = async (req, res) => {
  try {
    const { customerId, items, total } = req.body;

    const updatedShoppingCart = await shoppingCartModel.findByIdAndUpdate(req.params.id, { customerId, items, total }, { new: true });

    res.json({ message: "Carrito de compras actualizado" });
  } catch (error) {
    console.error('Error updating shopping cart: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

shoppingCartController.deleteShoppingCart = async (req, res) => {
  try {
    const deleteShoppingCart = await shoppingCartModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Carrito de compras eliminado" });
  } catch (error) {
    console.error('Error deleting shopping cart: ', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message
    });
  }
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