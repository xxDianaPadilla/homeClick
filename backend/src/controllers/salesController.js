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

salesController.getSalesWithProperties = async (req, res) => {
  try {
    const sales = await salesModel.find()
      .populate({
        path: 'shoppingCartId',
        populate: {
          path: 'items.propertyId',
          model: 'Property',
          select: 'name description location price images createdAt'
        }
      })
      .sort({ createdAt: -1 }) 
      .exec();

    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales with properties:', error);
    res.status(500).json({ 
      message: 'Error al obtener las ventas con propiedades',
      error: error.message 
    });
  }
};

salesController.getAllSales = async (req, res) => {
  try {
    const sales = await salesModel.find().sort({ createdAt: -1 });
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ 
      message: 'Error al obtener las ventas',
      error: error.message 
    });
  }
};

salesController.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.findById(id)
      .populate({
        path: 'shoppingCartId',
        populate: {
          path: 'items.propertyId',
          model: 'Property'
        }
      });

    if (!sale) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }

    res.status(200).json(sale);
  } catch (error) {
    console.error('Error fetching sale by ID:', error);
    res.status(500).json({ 
      message: 'Error al obtener la venta',
      error: error.message 
    });
  }
};

salesController.getSalesCount = async (req, res) => {
  try {
    const count = await salesModel.countDocuments();
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error al obtener el conteo de ventas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

salesController.getSalesStats = async (req, res) => {
  try {
    const totalSales = await salesModel.countDocuments();
    const paidSales = await salesModel.countDocuments({ status: 'Pagado' });
    const pendingSales = await salesModel.countDocuments({ status: 'Pendiente' });

    const paymentMethods = await salesModel.aggregate([
      {
        $group: {
          _id: '$paymentType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalSales,
        paidSales,
        pendingSales,
        paymentMethods
      }
    });
  } catch (error) {
    console.error('Error al obtener estadísticas de ventas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

export default salesController;