"use strict";
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
beforeAll(async () => {
    try {
        // Sync the database before running tests
        await database_1.sequelize.sync({ force: true });
    }
    catch (error) {
        console.error('Error syncing database:', error);
        throw error; // Ensure the test fails if the database sync fails
    }
});
afterEach(() => {
    jest.clearAllMocks(); // Clear mocks to ensure clean state between tests
});
afterAll(async () => {
    await database_1.sequelize.close(); // Close the database connection after all tests
});
describe('Order Controller Tests', () => {
    it('should create a new order', async () => {
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
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
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
    });
    it('should return an error if user is not found', async () => {
        const mockService = { id: 1, name: 'Test Service' };
        // Mock the response for finding the user and service
        user_1.User.findByPk.mockResolvedValueOnce(null); // No user found
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        // Make the API request to create the order
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: 999, // Non-existing user
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });
    it('should return an error if service is not found', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        // Mock the response for finding the user and service
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(null); // No service found
        // Make the API request to create the order
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: 999, // Non-existing service
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    });
});
