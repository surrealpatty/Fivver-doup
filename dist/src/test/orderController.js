"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _orderController = require("../controllers/orderController");
const _order = require("../models/order");
const _authenticateToken = require("../middlewares/authenticateToken");
// Mock Order model methods
jest.mock('../models/order'); // Mock the Order model to intercept its method calls
describe('Order Controller', ()=>{
    let req; // Mocked request of type CustomAuthRequest
    let res;
    let next; // Mock next with correct argument type
    beforeEach(()=>{
        req = {
            // For authenticated users
            user: {
                id: '123',
                email: 'test@example.com',
                username: 'testuser',
                tier: 'free'
            },
            body: {
                userId: 123,
                serviceId: 1,
                orderDetails: 'Test order',
                status: 'pending'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn(); // Mocked next function
    });
    afterEach(()=>{
        jest.clearAllMocks(); // Clean mocks after each test
    });
    test('createOrder should return 201 when order is successfully created', async ()=>{
        const mockOrder = {
            userId: 123,
            serviceId: 1,
            orderDetails: 'Test order',
            status: 'pending'
        };
        // Mock Order.create to resolve with the mock order
        _order.Order.create.mockResolvedValue(mockOrder);
        // Call the createOrder controller
        await (0, _orderController.createOrder)(req, res);
        // Verify the response status and JSON output
        expect(res.status).toHaveBeenCalledWith(201); // Check status code 201 (created)
        expect(res.json).toHaveBeenCalledWith(mockOrder); // Ensure the correct order data is returned
    });
    test('createOrder should return 500 when there is an error creating the order', async ()=>{
        // Mock Order.create to reject with an error
        _order.Order.create.mockRejectedValue(new Error('Database error'));
        // Call the createOrder controller
        await (0, _orderController.createOrder)(req, res);
        // Verify the response status and error message
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Error creating order',
            error: expect.any(Error)
        });
    });
    test('authenticateToken should call next if user is authenticated', async ()=>{
        req.user = {
            id: '123',
            email: 'test@example.com',
            username: 'testuser',
            tier: 'free'
        }; // Cast to CustomAuthRequest['user']
        // Call authenticateToken middleware
        await (0, _authenticateToken.authenticateToken)(req, res, next);
        // Check that the next function was called
        expect(next).toHaveBeenCalledTimes(1); // Ensure next is called once
    });
    test('authenticateToken should return 401 if no user is authenticated', async ()=>{
        req.user = undefined; // Mock unauthenticated user (no user)
        // Call authenticateToken middleware
        await (0, _authenticateToken.authenticateToken)(req, res, next);
        // Verify that the response status is 401 and error message
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: 'User is not authenticated or missing tier information'
        });
    });
});

//# sourceMappingURL=orderController.js.map