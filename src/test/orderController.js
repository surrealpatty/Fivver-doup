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
var supertest_1 = require("supertest");
var index_1 = require("../index"); // Ensure this import points to the correct entry point for your app
var database_1 = require("../config/database"); // Ensure sequelize instance is correctly imported
var order_1 = require("../models/order"); // Default import for Order model
var user_1 = require("../models/user"); // Correct import path for User model
var services_1 = require("../models/services"); // Correct import path for Service model
// Mocking models
jest.mock('../models/user');
jest.mock('../models/services');
jest.mock('../models/order');
describe('Order Controller', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Setup database before tests (optional depending on your test environment)
                return [4 /*yield*/, database_1.sequelize.sync({ force: true })];
                case 1:
                    // Setup database before tests (optional depending on your test environment)
                    _a.sent(); // Create tables and reset data
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () {
        // Reset mocks before each test to ensure clean slate for tests
        jest.resetAllMocks();
    });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clean up after tests
                return [4 /*yield*/, database_1.sequelize.close()];
                case 1:
                    // Clean up after tests
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test createOrder
    describe('POST /orders', function () {
        it('should create a new order successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock User and Service findByPk
                        user_1.default.findByPk.mockResolvedValue({ id: 1, name: 'Test User' });
                        services_1.default.findByPk.mockResolvedValue({ id: 1, name: 'Test Service' });
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                                .post('/orders')
                                .send({
                                userId: 1,
                                serviceId: 1,
                                orderDetails: 'Test order details',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(201);
                        expect(response.body.message).toBe('Order created successfully');
                        expect(response.body.order).toHaveProperty('userId', 1);
                        expect(response.body.order).toHaveProperty('serviceId', 1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if user or service not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_1.default.findByPk.mockResolvedValue(null);
                        services_1.default.findByPk.mockResolvedValue({ id: 1, name: 'Test Service' });
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                                .post('/orders')
                                .send({
                                userId: 1,
                                serviceId: 1,
                                orderDetails: 'Test order details',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body.message).toBe('User or Service not found');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test getAllOrders
    describe('GET /orders', function () {
        it('should fetch all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock Order findAll
                        order_1.default.findAll.mockResolvedValue([{ id: 1, orderDetails: 'Order 1' }]);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get('/orders')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveLength(1);
                        expect(response.body[0]).toHaveProperty('orderDetails', 'Order 1');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test getOrderById
    describe('GET /orders/:id', function () {
        it('should fetch order by ID', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock Order findByPk
                        order_1.default.findByPk.mockResolvedValue({ id: 1, orderDetails: 'Order 1' });
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get('/orders/1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body).toHaveProperty('orderDetails', 'Order 1');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if order not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock Order findByPk to return null
                        order_1.default.findByPk.mockResolvedValue(null);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get('/orders/999')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body.message).toBe('Order not found');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test updateOrder
    describe('PUT /orders/:id', function () {
        it('should update the order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOrder, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOrder = { id: 1, orderDetails: 'Old details', status: 'Pending', save: jest.fn() };
                        order_1.default.findByPk.mockResolvedValue(mockOrder);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                                .put('/orders/1')
                                .send({
                                orderDetails: 'Updated details',
                                status: 'Completed',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.message).toBe('Order updated successfully');
                        expect(response.body.order).toHaveProperty('orderDetails', 'Updated details');
                        expect(mockOrder.save).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if order not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock Order findByPk to return null
                        order_1.default.findByPk.mockResolvedValue(null);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                                .put('/orders/999')
                                .send({
                                orderDetails: 'Updated details',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body.message).toBe('Order not found');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    // Test deleteOrder
    describe('DELETE /orders/:id', function () {
        it('should delete the order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOrder, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOrder = { id: 1, destroy: jest.fn() };
                        order_1.default.findByPk.mockResolvedValue(mockOrder);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app).delete('/orders/1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        expect(response.body.message).toBe('Order deleted successfully');
                        expect(mockOrder.destroy).toHaveBeenCalled();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return 404 if order not found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Mock Order findByPk to return null
                        order_1.default.findByPk.mockResolvedValue(null);
                        return [4 /*yield*/, (0, supertest_1.default)(index_1.app).delete('/orders/999')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(404);
                        expect(response.body.message).toBe('Order not found');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
