"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import for authenticateToken
// Mock request and response functions
const mockRequest = (userPayload) => ({
    headers: { authorization: 'Bearer valid-token' }, // Mock authorization header
    user: userPayload, // Attach mock user payload to the request
});
const mockResponse = () => {
    const res = {}; // Create a mock response object
    res.status = jest.fn().mockReturnValue(res); // Mock status method
    res.json = jest.fn().mockReturnValue(res); // Mock json method
    return res;
};
describe('Order Controller Tests', () => {
    it('should authenticate the user correctly', () => {
        // Create a userPayload that satisfies the UserPayload interface
        const userPayload = {
            id: 'userId',
            email: 'user@example.com',
            username: 'user123', // Ensure the username is included
            tier: 'free',
        };
        // Mock request, response, and next function
        const req = mockRequest(userPayload); // Create a mock request
        const res = mockResponse(); // Create a mock response
        const next = jest.fn(); // Create a mock next function
        (0, authMiddleware_1.authenticateToken)(req, res, next); // Call the middleware
        // Check that user data is attached to req.user
        expect(req.user).toEqual(userPayload);
        expect(next).toHaveBeenCalled(); // Ensure next is called
    });
    it('should return 401 if no token is provided', () => {
        const req = mockRequest({}); // No user payload
        const res = mockResponse();
        const next = jest.fn();
        req.headers['authorization'] = ''; // Empty token
        (0, authMiddleware_1.authenticateToken)(req, res, next); // Call the middleware
        expect(res.status).toHaveBeenCalledWith(401); // Expect 401 response
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied, no token provided.' });
        expect(next).not.toHaveBeenCalled(); // Ensure next is not called
    });
});
//# sourceMappingURL=orderController.js.map