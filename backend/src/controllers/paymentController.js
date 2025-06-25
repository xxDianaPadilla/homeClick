import { config } from "../config.js";
import salesModel from "../models/Sales.js";
import shoppingCartModel from "../models/ShoppingCart.js";

const paymentController = {};

paymentController.createWompiTransaction = async (req, res) => {
    try {
        const {
            amount,
            currency = 'COP',
            email,
            firstName,
            lastName,
            phone,
            cardNumber,
            expiryMonth,
            expiryYear,
            cvv,
            shoppingCartId
        } = req.body;

        if (!amount || !email || !firstName || !lastName || !cardNumber || !expiryMonth || !expiryYear, !cvv || !shoppingCartId) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos requeridos para procesar el pago'
            });
        }

        const cart = await shoppingCartModel.findById(shoppingCartId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito de compras no encontrado'
            });
        }

        const reference = `REF_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const transactionData = {
            amount_in_cents: Math.round(amount * 100),
            currency: currency,
            customer_email: email,
            payment_method: {
                type: 'CARD',
                token_card: {
                    numner: cardNumber,
                    cvc: cvv,
                    exp_month: expiryMonth,
                    exp_year: expiryYear,
                    card_holder: `${firstName} ${lastName}`
                }
            },
            reference: reference,
            customer_data: {
                phone_number: phone,
                full_name: `${firstName} ${lastName}`
            },
            shipping_address: {
                address_line_1: "Calle 123",
                country: "ES",
                region: "El Salvador",
                city: "San Salvador",
                name: `${firstName} ${lastName}`,
                phone_number: phone
            }
        };

        const wompiResponse = await fetch('https://sandbox.wompi.co/v1/transactions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.wompi.access_token_wompi}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });

        const wompiResult = await wompiResponse.json();

        if (wompiResponse.ok && wompiResult.data) {
            const transaction = wompiResult.data;

            const newSale = new salesModel({
                paymentType: 'Crédito',
                status: transaction.status === 'APPROVED' ? 'Pagado' : 'Pendiente',
                shoppingCartId: shoppingCartId,
                transactionId: transaction.id,
                reference: reference,
                amount: amount,
                currency: currency,
                paymentMethod: transaction.status,
                wompiData: transaction
            });

            await newSale.save();

            if (transaction.status === 'APPROVED') {
                await shoppingCartModel.findByIdAndUpdate(shoppingCartId, {
                    items: [],
                    total: 0
                });
            }

            return res.status(200).json({
                success: true,
                message: transaction.status === 'APPROVED' ? 'Pago procesado exitosamente' : 'Pago pendiente de aprobación',
                data: {
                    transactionId: transaction.id,
                    status: transaction.status,
                    reference: reference,
                    amount: amount,
                    saleId: newSale._id
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Error al procesar el pago con Wompi',
                error: wompiResult
            });
        }
    } catch (error) {
        console.error('Error en createWompiTransaction: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

paymentController.checkTransactionStatus = async (req, res) => {
    try {
        const { transactionId } = req.params;

        const response = await fetch(`https://sandbox.wompi.co/v1/transactions/${transactionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.wompi.access_token_wompi}`,
                'Contenty-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            await salesModel.findOneAndUpdate(
                { transactionId: transactionId },
                {
                    transactionStatus: result.data.status,
                    status: result.data.status === 'APPROVED' ? 'Pagado' : 'Pendiente'
                }
            );

            return res.status(200).json({
                success: true,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    } catch (error) {
        console.error('Error en checkTransactionStatus: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

paymentController.getPaidSalesByCustomer = async (req, res) => {
    try {
        const { customerId } = req.params;

        const paidSales = await salesModel.find({
            status: 'Pagado'
        })
            .populate({
                path: 'shoppingCartId',
                match: { customerId: customerId },
                populate: {
                    path: 'items.propertyId',
                    model: 'Property',
                    select: 'name description location price images'
                }
            })
            .sort({ createdAt: -1 });

        const customerPaidSales = paidSales.filter(sale => sale.shoppingCartId !== null);

        return res.status(200).json({
            success: true,
            data: customerPaidSales
        });
    } catch (error) {
        console.error('Error en getPaidSalesByCustomer: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtender las compras pagadas',
            error: error.message
        });
    }
};

paymentController.simulatePayment = async (req, res) => {
    try {
        const {
            amount,
            email,
            firstName,
            lastName,
            phone,
            shoppingCartId,
            simulate = 'approved',
            markAsPurchased = false  
        } = req.body;

        const cart = await shoppingCartModel.findById(shoppingCartId);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Carrito de compras no encontrado'
            });
        }

        const reference = `SIM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const transactionId = `sim_${Date.now()}`;

        let status, transactionStatus;
        switch (simulate) {
            case 'approved':
                status = 'Pagado';
                transactionStatus = 'APPROVED';
                break;
            case 'declined':
                status = 'Pendiente';
                transactionStatus = 'DECLINED';
                break;
            default:
                status = 'Pendiente'
                transactionStatus = 'PENDING';
        }

        const newSale = new salesModel({
            paymentType: 'Crédito',
            status: status,
            shoppingCartId: shoppingCartId,
            transactionId: transactionId,
            reference: reference,
            amount: amount,
            currency: 'USD',
            paymentMethod: 'Simulado',
            transactionStatus: transactionStatus,
            isSimulated: true
        });

        await newSale.save();

        if (transactionStatus === 'APPROVED' && markAsPurchased) {
            console.log('💳 Pago aprobado, marcando items como comprados...');
            
            const updateResult = await shoppingCartModel.findByIdAndUpdate(
                shoppingCartId,
                {
                    $set: {
                        "items.$[elem].purchased": true,
                        "items.$[elem].purchaseDate": new Date()
                    }
                },
                {
                    arrayFilters: [{ "elem.purchased": { $ne: true } }], 
                    new: true 
                }
            );

            console.log('Items actualizados como comprados:', updateResult);
            
            const updatedCart = await shoppingCartModel.findById(shoppingCartId);
            console.log('🔍 Estado del carrito después de la actualización:');
            updatedCart.items.forEach((item, index) => {
                console.log(`   Item ${index + 1}: purchased=${item.purchased}, date=${item.purchaseDate}`);
            });
        }

        return res.status(200).json({
            success: true,
            message: transactionStatus === 'APPROVED' ? 'Pago procesado exitosamente' :
                transactionStatus === 'DECLINED' ? 'Pago rechazado' : 'Pago pendiente',
            data: {
                transactionId: transactionId,
                status: transactionStatus,
                reference: reference,
                amount: amount,
                saleId: newSale._id,
                isSimulated: true,
                itemsMarkedAsPurchased: transactionStatus === 'APPROVED' && markAsPurchased
            }
        });
    } catch (error) {
        console.error('Error en simulatePayment: ', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

export default paymentController;