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
const { authenticateToken } = require('../src/middleware/authMiddleware'); // Adjust the path as needed
const jwt = require('jsonwebtoken'); // For generating and verifying tokens
const mockResponse = require('mock-response'); // Mock response object for testing purposes
const mockRequest = require('mock-request'); // Mock request object for testing purposes
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
    test('should authenticate a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the request and response objects
        const req = mockRequest({ headers: { authorization: `Bearer ${validToken}` } });
        const res = mockResponse();
        // Run the middleware
        yield authenticateToken(req, res, mockNext);
        // Check if next() was called (indicating that authentication succeeded)
        expect(mockNext).toHaveBeenCalled();
    }));
    test('should return an error for an invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the request and response objects
        const req = mockRequest({ headers: { authorization: `Bearer ${invalidToken}` } });
        const res = mockResponse();
        // Run the middleware
        yield authenticateToken(req, res, mockNext);
        // Check if next() was not called and the response contains an error
        expect(mockNext).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(403); // Forbidden status
        expect(res.body.message).toBe('Invalid token');
    }));
    test('should return an error if token is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking the request and response objects without an authorization header
        const req = mockRequest({});
        const res = mockResponse();
        // Run the middleware
        yield authenticateToken(req, res, mockNext);
        // Check if next() was not called and the response contains an error
        expect(mockNext).not.toHaveBeenCalled();
        expect(res.statusCode).toBe(401); // Unauthorized status
        expect(res.body.message).toBe('Token required');
    }));
});
//# sourceMappingURL=auth.test.js.map