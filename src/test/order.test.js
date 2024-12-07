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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../config/database"); // Corrected import for sequelizes
const user_1 = require("../models/user");
const services_1 = __importDefault(require("../models/services"));
const order_1 = require("../models/order");
const index_1 = require("../../src/index"); // Import app from src/index directly
// Mock the methods of the models
jest.mock('../models/services', () => ({
    findByPk: jest.fn(),
}));
jest.mock('../models/user', () => ({
    findByPk: jest.fn(),
}));
// Mock the Order model methods
jest.mock('../models/order', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
}));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sync the database before running tests
        yield database_1.sequelize.sync({ force: true });
    }
    catch (error) {
        console.error('Error syncing database:', error);
        throw error; // Ensure the test fails if the database sync fails
    }
}));
afterEach(() => {
    jest.clearAllMocks(); // Clear mocks to ensure clean state between tests
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close(); // Close the database connection after all tests
}));
describe('Order Controller Tests', () => {
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
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
        // Make the API request to create the order
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order.status).toBe('Pending');
        expect(order_1.Order.create).toHaveBeenCalledWith({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
    }));
    it('should return an error if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockService = { id: 1, name: 'Test Service' };
        // Mock the response for finding the user and service
        user_1.User.findByPk.mockResolvedValueOnce(null); // No user found
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        // Make the API request to create the order
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: 999, // Non-existing user
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    }));
    it('should return an error if service is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        // Mock the response for finding the user and service
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(null); // No service found
        // Make the API request to create the order
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: 999, // Non-existing service
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    }));
});
