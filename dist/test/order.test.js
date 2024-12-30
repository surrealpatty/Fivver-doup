import request from 'supertest';
import { Order } from '../models/order'; // Ensure the correct import for Order model
import { sequelize } from '../config/database'; // Correct import for sequelize
import app from '../../src/index'; // Import app from src/index directly
import User from '../models/user'; // Import User model
import Service from '../models/services'; // Import Service model
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
        await sequelize.sync({ force: true });
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
    await sequelize.close(); // Close the database connection after all tests
});
describe('Order Controller Tests', () => {
    it('should create a new order', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
        // Mock the response for finding the user and service
        User.findByPk.mockResolvedValueOnce(mockUser);
        Service.findByPk.mockResolvedValueOnce(mockService);
        // Mock the Order.create method to return a mock order
        Order.create.mockResolvedValueOnce({
            id: 1,
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
            status: 'Pending',
        });
        // Make the API request to create the order
        const response = await request(app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order.status).toBe('Pending');
        expect(Order.create).toHaveBeenCalledWith({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
    });
    it('should return an error if user is not found', async () => {
        const mockService = { id: 1, name: 'Test Service' };
        // Mock the response for finding the user and service
        User.findByPk.mockResolvedValueOnce(null); // No user found
        Service.findByPk.mockResolvedValueOnce(mockService);
        // Make the API request to create the order
        const response = await request(app).post('/api/orders').send({
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
        User.findByPk.mockResolvedValueOnce(mockUser);
        Service.findByPk.mockResolvedValueOnce(null); // No service found
        // Make the API request to create the order
        const response = await request(app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: 999, // Non-existing service
            orderDetails: 'Test order details',
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    });
});
