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
var database_1 = require("../config/database"); // Corrected import for sequelizes
var user_1 = require("../models/user");
var services_1 = require("../models/services");
var order_1 = require("../models/order");
var index_1 = require("../../src/index"); // Import app from src/index directly
// Mock the methods of the models
jest.mock('../models/services', function () { return ({
    findByPk: jest.fn(),
}); });
jest.mock('../models/user', function () { return ({
    findByPk: jest.fn(),
}); });
// Mock the Order model methods
jest.mock('../models/order', function () { return ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
}); });
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                // Sync the database before running tests
                return [4 /*yield*/, database_1.sequelize.sync({ force: true })];
            case 1:
                // Sync the database before running tests
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error syncing database:', error_1);
                throw error_1; // Ensure the test fails if the database sync fails
            case 3: return [2 /*return*/];
        }
    });
}); });
afterEach(function () {
    jest.clearAllMocks(); // Clear mocks to ensure clean state between tests
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.sequelize.close()];
            case 1:
                _a.sent(); // Close the database connection after all tests
                return [2 /*return*/];
        }
    });
}); });
describe('Order Controller Tests', function () {
    it('should create a new order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockUser, mockService, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
                    mockService = { id: 1, name: 'Test Service' };
                    // Mock the response for finding the user and service
                    user_1.User.findByPk.mockResolvedValueOnce(mockUser);
                    services_1.default.findByPk.mockResolvedValueOnce(mockService);
                    // Mock the Order.create method to return a mock order
                    order_1.Order.create.mockResolvedValueOnce({
                        id: 1,
                        userId: mockUser.id,
                        serviceId: mockService.id,
                        orderDetails: 'Test order details',
                        status: 'Pending',
                    });
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).post('/api/orders').send({
                            userId: mockUser.id,
                            serviceId: mockService.id,
                            orderDetails: 'Test order details',
                        })];
                case 1:
                    response = _a.sent();
                    // Assert the expected outcome
                    expect(response.status).toBe(201);
                    expect(response.body.message).toBe('Order created successfully');
                    expect(response.body.order.status).toBe('Pending');
                    expect(order_1.Order.create).toHaveBeenCalledWith({
                        userId: mockUser.id,
                        serviceId: mockService.id,
                        orderDetails: 'Test order details',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error if user is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockService, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockService = { id: 1, name: 'Test Service' };
                    // Mock the response for finding the user and service
                    user_1.User.findByPk.mockResolvedValueOnce(null); // No user found
                    services_1.default.findByPk.mockResolvedValueOnce(mockService);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).post('/api/orders').send({
                            userId: 999, // Non-existing user
                            serviceId: mockService.id,
                            orderDetails: 'Test order details',
                        })];
                case 1:
                    response = _a.sent();
                    // Assert the expected outcome
                    expect(response.status).toBe(404);
                    expect(response.body.message).toBe('User not found');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an error if service is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockUser, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
                    // Mock the response for finding the user and service
                    user_1.User.findByPk.mockResolvedValueOnce(mockUser);
                    services_1.default.findByPk.mockResolvedValueOnce(null); // No service found
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).post('/api/orders').send({
                            userId: mockUser.id,
                            serviceId: 999, // Non-existing service
                            orderDetails: 'Test order details',
                        })];
                case 1:
                    response = _a.sent();
                    // Assert the expected outcome
                    expect(response.status).toBe(404);
                    expect(response.body.message).toBe('Service not found');
                    return [2 /*return*/];
            }
        });
    }); });
});
