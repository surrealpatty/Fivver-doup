"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Adjust path if needed
const database_1 = require("../config/database"); // Ensure sequelize is correctly imported
const models_1 = require("../models"); // Your models
// Mock models
jest.mock('../models/user');
jest.mock('../models/service');
jest.mock('../models/order');
describe('Order Controller Tests', () => {
    beforeAll(async () => {
        // Sync the database for testing (You might want to use an in-memory DB for tests)
        await database_1.sequelize.sync();
    });
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test to avoid state issues
    });
    afterAll(async () => {
        await database_1.sequelize.close(); // Close the connection after all tests
    });
    // Test Create Order
    it('should create a new order', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
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
        const response = await (0, supertest_1.default)(index_1.default)
            .post('/orders')
            .send({
            userId: 1,
            serviceId: 1,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order.status).toBe('Pending');
        expect(response.body.order.userId).toBe(1); // Check user ID in response
    });
    // Test Get All Orders
    it('should fetch all orders', async () => {
        const mockOrders = [
            {
                id: 1,
                userId: 1,
                serviceId: 1,
                orderDetails: 'Test order 1',
                status: 'Pending',
            },
            {
                id: 2,
                userId: 2,
                serviceId: 2,
                orderDetails: 'Test order 2',
                status: 'Completed',
            },
        ];
        // Mock Order.findAll
        models_1.Order.findAll.mockResolvedValue(mockOrders);
        const response = await (0, supertest_1.default)(index_1.default).get('/orders');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].status).toBe('Pending');
    });
    // Test Get Order by ID
    it('should fetch a specific order by ID', async () => {
        const mockOrder = {
            id: 1,
            userId: 1,
            serviceId: 1,
            orderDetails: 'Test order details',
            status: 'Pending',
        };
        // Mock Order.findByPk
        models_1.Order.findByPk.mockResolvedValue(mockOrder);
        const response = await (0, supertest_1.default)(index_1.default).get('/orders/1');
        expect(response.status).toBe(200);
        expect(response.body.orderDetails).toBe('Test order details');
        expect(response.body.status).toBe('Pending');
    });
    // Test Update Order
    it('should update an order', async () => {
        const mockOrder = {
            id: 1,
            userId: 1,
            serviceId: 1,
            orderDetails: 'Old details',
            status: 'Pending',
        };
        // Mock Order.findByPk and save method
        models_1.Order.findByPk.mockResolvedValue(mockOrder);
        models_1.Order.prototype.save.mockResolvedValue({
            ...mockOrder,
            orderDetails: 'Updated details',
            status: 'Completed',
        });
        const response = await (0, supertest_1.default)(index_1.default)
            .put('/orders/1')
            .send({
            orderDetails: 'Updated details',
            status: 'Completed',
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Order updated successfully');
        expect(response.body.order.status).toBe('Completed');
        expect(response.body.order.orderDetails).toBe('Updated details');
    });
    // Test Delete Order
    it('should delete an order', async () => {
        const mockOrder = {
            id: 1,
            userId: 1,
            serviceId: 1,
            orderDetails: 'Test order details',
            status: 'Pending',
        };
        // Mock Order.findByPk and destroy method
        models_1.Order.findByPk.mockResolvedValue(mockOrder);
        models_1.Order.prototype.destroy.mockResolvedValue(undefined);
        const response = await (0, supertest_1.default)(index_1.default).delete('/orders/1');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Order deleted successfully');
    });
});
//# sourceMappingURL=orderController.js.map