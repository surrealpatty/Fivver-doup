"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
var order_1 = require("../models/order"); // Correct path for the Order model
var database_1 = require("../config/database"); // Correct path for the sequelize instance
// Create order controller
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, serviceId, orderDetails, status_1, order, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userId = _a.userId, serviceId = _a.serviceId, orderDetails = _a.orderDetails, status_1 = _a.status;
                return [4 /*yield*/, order_1.Order.create({
                        userId: userId,
                        serviceId: serviceId,
                        orderDetails: orderDetails,
                        status: status_1,
                    })];
            case 1:
                order = _b.sent();
                return [2 /*return*/, res.status(201).json(order)];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error creating order', error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
// Get all orders controller
var getAllOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.Order.findAll()];
            case 1:
                orders = _a.sent();
                return [2 /*return*/, res.status(200).json(orders)];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error fetching orders', error: error_2 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrders = getAllOrders;
// Get order by ID controller
var getOrderById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, order_1.Order.findByPk(req.params.id)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: 'Order not found' })];
                }
                return [2 /*return*/, res.status(200).json(order)];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error fetching order', error: error_3 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrderById = getOrderById;
// Update order controller
var updateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, status_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, order_1.Order.findByPk(req.params.id)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: 'Order not found' })];
                }
                status_2 = req.body.status;
                order.status = status_2;
                return [4 /*yield*/, order.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json(order)];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error updating order', error: error_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateOrder = updateOrder;
// Delete order controller
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, order_1.Order.findByPk(req.params.id)];
            case 1:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(404).json({ message: 'Order not found' })];
                }
                return [4 /*yield*/, order.destroy()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).json({ message: 'Order deleted successfully' })];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ message: 'Error deleting order', error: error_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteOrder = deleteOrder;
// Function to test the database connection
var testConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.sequelize.authenticate()];
            case 1:
                _a.sent(); // Test the connection
                console.log('Database connection successful');
                return [2 /*return*/, true]; // Return true if connection is successful
            case 2:
                error_6 = _a.sent();
                // Type assertion to ensure 'error' is of type 'Error'
                if (error_6 instanceof Error) {
                    console.error('Unable to connect to the database:', error_6.message);
                }
                else {
                    console.error('Unable to connect to the database: Unknown error');
                }
                return [2 /*return*/, false]; // Return false if there is an error
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.testConnection = testConnection;
