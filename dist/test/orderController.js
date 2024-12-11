"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_1 = require("../controllers/orderController"); // Correct import for the order controller
const order_1 = require("../models/order"); // Correct import for the Order model
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Corrected import
// Mock Order model methods
jest.mock('../models/order');
describe('Order Controller', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            user: {
                id: '123',
                tier: 'free', // Mock user with 'tier'
            },
            body: {
                userId: 123,
                serviceId: 1,
                orderDetails: 'Test order',
                status: 'pending',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('createOrder should return 201 when order is successfully created', async () => {
        // Mock Order.create to resolve with the order object
        const mockOrder = {
            userId: 123,
            serviceId: 1,
            orderDetails: 'Test order',
            status: 'pending',
        };
        order_1.Order.create.mockResolvedValue(mockOrder);
        // Call the createOrder controller
        await (0, orderController_1.createOrder)(req, res);
        // Verify the response status and JSON output
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockOrder);
    });
    test('createOrder should return 500 when there is an error creating the order', async () => {
        // Mock Order.create to reject with an error
        order_1.Order.create.mockRejectedValue(new Error('Database error'));
        // Call the createOrder controller
        await (0, orderController_1.createOrder)(req, res);
        // Verify the response status and error message
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error creating order', error: expect.any(Error) });
    });
    test('authenticateToken should call next if user is authenticated', async () => {
        // Mock req.user as an authenticated user
        req.user = { id: '123', tier: 'free' };
        // Call authenticateToken middleware
        await (0, authenticateToken_1.authenticateToken)(req, res, next);
        // Check that the next function was called
        expect(next).toHaveBeenCalled();
    });
    test('authenticateToken should return 401 if no user is authenticated', async () => {
        // Mock req.user as undefined (no user authenticated)
        req.user = undefined;
        // Call authenticateToken middleware
        await (0, authenticateToken_1.authenticateToken)(req, res, next);
        // Verify that the response status is 401
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'User is not authenticated or missing tier information' });
    });
});
//# sourceMappingURL=orderController.js.map