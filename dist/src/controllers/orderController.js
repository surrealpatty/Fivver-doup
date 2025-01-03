"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createOrder: function() {
        return createOrder;
    },
    deleteOrder: function() {
        return deleteOrder;
    },
    getAllOrders: function() {
        return getAllOrders;
    },
    getOrderById: function() {
        return getOrderById;
    },
    testConnection: function() {
        return testConnection;
    },
    updateOrder: function() {
        return updateOrder;
    }
});
const _order = require("../models/order");
const _database = /*#__PURE__*/ _interop_require_default(require("../config/database"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createOrder = async (req, res)=>{
    try {
        const { userId, serviceId, orderDetails, status } = req.body;
        // Use type assertion to match the expected input for Order.create
        const order = await _order.Order.create({
            userId,
            serviceId,
            orderDetails,
            status
        }); // Type assertion as `any`
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating order',
            error
        });
    }
};
const getAllOrders = async (req, res)=>{
    try {
        const orders = await _order.Order.findAll();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching orders',
            error
        });
    }
};
const getOrderById = async (req, res)=>{
    try {
        const order = await _order.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching order',
            error
        });
    }
};
const updateOrder = async (req, res)=>{
    try {
        const order = await _order.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        const { status } = req.body;
        order.status = status;
        await order.save();
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating order',
            error
        });
    }
};
const deleteOrder = async (req, res)=>{
    try {
        const order = await _order.Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        await order.destroy();
        return res.status(204).json({
            message: 'Order deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting order',
            error
        });
    }
};
const testConnection = async ()=>{
    try {
        await _database.default.authenticate(); // Test the connection
        console.log('Database connection successful');
        return true; // Return true if connection is successful
    } catch (error) {
        // Type assertion to ensure 'error' is of type 'Error'
        if (error instanceof Error) {
            console.error('Unable to connect to the database:', error.message);
        } else {
            console.error('Unable to connect to the database: Unknown error');
        }
        return false; // Return false if there is an error
    }
};
