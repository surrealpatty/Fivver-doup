"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orderController_1 = require("../controllers/orderController"); // Make sure the path is correct
var router = express_1.default.Router();
// Route to create an order
router.post('/', orderController_1.createOrder); // Directly use the imported controller function
// Route to get all orders
router.get('/', orderController_1.getAllOrders); // Directly use the imported controller function
// Route to get an order by its ID
router.get('/:id', orderController_1.getOrderById); // Directly use the imported controller function
// Route to update an order by its ID
router.put('/:id', orderController_1.updateOrder); // Directly use the imported controller function
// Route to delete an order by its ID
router.delete('/:id', orderController_1.deleteOrder); // Directly use the imported controller function
exports.default = router;
