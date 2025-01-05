"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order"); // Import the Order model
const database_1 = require("../config/database"); // Correct import of sequelize
const index_1 = require("../index"); // Correct import of app
const supertest_1 = __importDefault(require("supertest")); // Import supertest for API requests
const user_1 = require("../models/user"); // Import User model
const services_1 = __importDefault(require("../models/services")); // Import Service model as default
// Mock the methods of the models
jest.mock('../models/services', () => ({
    findByPk: jest.fn(),
}));
jest.mock('../models/user', () => ({
    findByPk: jest.fn(),
}));
jest.mock('../models/order', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
}));
// Mock the sequelize instance to avoid interacting with a real database
jest.mock('../config/database', () => ({
    sequelize: {
        sync: jest.fn().mockResolvedValue(null),
        close: jest.fn().mockResolvedValue(null),
        authenticate: jest.fn().mockResolvedValue(null), // Mock authenticate
        addModels: jest.fn(), // Mock addModels method to include models in tests
    },
}));
beforeAll(async () => {
    try {
        await database_1.sequelize.authenticate(); // Mock database connection
        console.log('Mock database connected successfully!');
        // Mock adding models to sequelize
        database_1.sequelize.addModels([order_1.Order, user_1.User, services_1.default]); // Add necessary models here
        await database_1.sequelize.sync({ force: true }); // Ensure a clean state before tests
    }
    catch (error) {
        console.error('Error during database setup:', error);
        throw error; // Fail tests if database setup fails
    }
});
afterEach(() => {
    jest.clearAllMocks(); // Clear mocks to ensure a clean state
});
afterAll(async () => {
    await database_1.sequelize.close(); // Close the mock database connection
});
describe('Order Controller Tests', () => {
    it('should create a new order', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
        // Mock User and Service responses
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        // Mock Order.create method
        order_1.Order.create.mockResolvedValueOnce({
            id: 1,
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
            status: 'Pending',
        });
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
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
        user_1.User.findByPk.mockResolvedValueOnce(null); // Mock no user found
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: 999,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });
    it('should return an error if service is not found', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(null); // Mock no service found
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: 999,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    });
    it('should return an error if order details are missing', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        const response = await (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: mockService.id,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Order details are required');
    });
});
