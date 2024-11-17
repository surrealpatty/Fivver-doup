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
var index_1 = require("../index"); // Adjust the path to your Express app if necessary
var database_1 = require("../config/database");
var models_1 = require("../models"); // Import your models
// Mock models using jest
jest.mock('../models/user', function () { return ({
    findByPk: jest.fn(),
}); });
jest.mock('../models/service', function () { return ({
    findByPk: jest.fn(),
}); });
jest.mock('../models/order', function () { return ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
}); });
describe('Order Controller Tests', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Sync the database for testing (use an in-memory DB for tests if possible)
                return [4 /*yield*/, database_1.sequelize.sync({ force: true })];
                case 1:
                    // Sync the database for testing (use an in-memory DB for tests if possible)
                    _a.sent(); // Use force to drop and re-sync the DB for clean tests
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        jest.clearAllMocks(); // Clear mocks after each test to avoid state issues
    });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.sequelize.close()];
                case 1:
                    _a.sent(); // Close the connection after all tests
                    return [2 /*return*/];
            }
        });
    }); });
    // Test Create Order
    it('should create a new order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockUser, mockService, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
                    mockService = { id: 1, name: 'Test Service' };
                    // Mock the User and Service findByPk methods
                    models_1.User.findByPk.mockResolvedValue(mockUser);
                    models_1.Service.findByPk.mockResolvedValue(mockService);
                    // Mock the Order creation
                    models_1.Order.create.mockResolvedValue({
                        id: 1,
                        userId: mockUser.id,
                        serviceId: mockService.id,
                        orderDetails: 'Test order details',
                        status: 'Pending',
                    });
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .post('/api/orders')
                            .send({
                            userId: 1,
                            serviceId: 1,
                            orderDetails: 'Test order details',
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body.message).toBe('Order created successfully');
                    expect(response.body.order.status).toBe('Pending');
                    expect(response.body.order.userId).toBe(1); // Check user ID in response
                    return [2 /*return*/];
            }
        });
    }); });
    // Test Update Order
    it('should update an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOrderInstance, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOrderInstance = {
                        id: 1,
                        userId: 1,
                        serviceId: 1,
                        orderDetails: 'Old details',
                        status: 'Pending',
                        save: jest.fn().mockResolvedValue({
                            id: 1,
                            userId: 1,
                            serviceId: 1,
                            orderDetails: 'Updated details',
                            status: 'Completed',
                        }),
                        destroy: jest.fn().mockResolvedValue(undefined),
                    };
                    // Mock the findByPk method to return the mockOrderInstance
                    models_1.Order.findByPk.mockResolvedValue(mockOrderInstance);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .put('/api/orders/1')
                            .send({
                            orderDetails: 'Updated details',
                            status: 'Completed',
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.message).toBe('Order updated successfully');
                    expect(response.body.order.status).toBe('Completed');
                    expect(response.body.order.orderDetails).toBe('Updated details');
                    return [2 /*return*/];
            }
        });
    }); });
    // Test Delete Order
    it('should delete an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockOrderInstance, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockOrderInstance = {
                        id: 1,
                        userId: 1,
                        serviceId: 1,
                        orderDetails: 'Test order details',
                        status: 'Pending',
                        save: jest.fn().mockResolvedValue({
                            id: 1,
                            userId: 1,
                            serviceId: 1,
                            orderDetails: 'Updated details',
                            status: 'Completed',
                        }),
                        destroy: jest.fn().mockResolvedValue(undefined),
                    };
                    // Mock the findByPk method to return the mockOrderInstance
                    models_1.Order.findByPk.mockResolvedValue(mockOrderInstance);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).delete('/api/orders/1')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.message).toBe('Order deleted successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    // Test Get Order by ID (Order Not Found)
    it('should return 404 if the order is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock Order.findByPk to return null (not found)
                    models_1.Order.findByPk.mockResolvedValue(null);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get('/api/orders/9999')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    expect(response.body.message).toBe('Order not found');
                    return [2 /*return*/];
            }
        });
    }); });
});
