"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const authenticateToken_1 = require("./authenticateToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mock jsonwebtoken module
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));
describe('authenticateToken Middleware', () => {
    const mockNext = jest.fn();
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext.mockClear();
    });
    it('should attach user to req.user if token is valid', () => {
        const mockToken = 'validToken';
        const mockPayload = { id: '123', email: 'user@example.com' };
        // Mock jwt.verify to return the expected payload
        jsonwebtoken_1.default.verify.mockReturnValue(mockPayload);
        // Mock request with Authorization header
        mockRequest = {
            headers: {
                authorization: `Bearer ${mockToken}`,
            },
        };
        (0, authenticateToken_1.authenticateToken)(mockRequest, mockResponse, mockNext);
        // Verify that next() was called
        expect(mockNext).toHaveBeenCalled();
        // Verify that the user was attached to req.user
        expect(mockRequest.user).toEqual(mockPayload);
    });
    it('should return 401 if no token is provided', () => {
        mockRequest = {
            headers: {
                authorization: '',
            },
        };
        (0, authenticateToken_1.authenticateToken)(mockRequest, mockResponse, mockNext);
        // Verify response for missing token
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Authorization token is missing' });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 403 if token is invalid or expired', () => {
        const mockToken = 'invalidToken';
        // Mock jwt.verify to throw an error for invalid token
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });
        mockRequest = {
            headers: {
                authorization: `Bearer ${mockToken}`,
            },
        };
        (0, authenticateToken_1.authenticateToken)(mockRequest, mockResponse, mockNext);
        // Verify response for invalid token
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
