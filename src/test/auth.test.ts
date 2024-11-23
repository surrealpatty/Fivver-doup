import { authenticateToken } from '../src/middleware/authMiddleware';  // Ensure correct import
import jwt from 'jsonwebtoken';  // Correct import for jwt
import mockResponse from 'mock-response';  // Correct import for mock-response
import mockRequest from 'mock-request';  // Correct import for mock-request

describe('Authentication Middleware', () => {
    let mockNext;
    let validToken;
    let invalidToken;

    beforeEach(() => {
        // Setup a valid token and an invalid token
        validToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
        invalidToken = 'invalidtoken';
        
        // Mock next function
        mockNext = jest.fn();
    });

    test('should authenticate a valid token', async () => {
        // Mocking the request and response objects
        const req = mockRequest({ headers: { authorization: `Bearer ${validToken}` } });
        const res = mockResponse();

        // Run the middleware
        await authenticateToken(req, res, mockNext);

        // Check if next() was called (indicating that authentication succeeded)
        expect(mockNext).toHaveBeenCalled();
    });

    test('should return an error for an invalid token', async () => {
        // Mocking the request and response objects
        const req = mockRequest({ headers: { authorization: `Bearer ${invalidToken}` } });
        const res = mockResponse();

        // Run the middleware
        await authenticateToken(req, res, mockNext);

        // Check if next() was not called and the response contains an error
        expect(mockNext).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(403); // Forbidden status
        expect(res.body.message).toBe('Invalid token');
    });

    test('should return an error if token is missing', async () => {
        // Mocking the request and response objects without an authorization header
        const req = mockRequest({});
        const res = mockResponse();

        // Run the middleware
        await authenticateToken(req, res, mockNext);

        // Check if next() was not called and the response contains an error
        expect(mockNext).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(401); // Unauthorized status
        expect(res.body.message).toBe('Token required');
    });
});
