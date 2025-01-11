"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _authenticateToken = require("./authenticateToken");
const _types = require("../types");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mock jsonwebtoken module
jest.mock('jsonwebtoken', ()=>({
        verify: jest.fn()
    }));
describe('authenticateToken Middleware', ()=>{
    const mockNext = jest.fn();
    let mockRequest;
    let mockResponse;
    beforeEach(()=>{
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        mockNext.mockClear();
    });
    it('should attach user to req.user if token is valid', ()=>{
        const mockToken = 'validToken';
        // Add the missing role and tier properties
        const mockPayload = {
            id: '123',
            email: 'user@example.com',
            role: _types.UserRole.User,
            tier: _types.UserTier.Free // Add tier
        };
        // Mock jwt.verify to return the expected payload
        _jsonwebtoken.default.verify.mockReturnValue(mockPayload);
        // Mock request with Authorization header
        mockRequest = {
            headers: {
                authorization: `Bearer ${mockToken}`
            }
        };
        (0, _authenticateToken.authenticateToken)(mockRequest, mockResponse, mockNext);
        // Verify that next() was called
        expect(mockNext).toHaveBeenCalled();
        // Verify that the user was attached to req.user
        expect(mockRequest.user).toEqual(mockPayload);
    });
    it('should return 401 if no token is provided', ()=>{
        mockRequest = {
            headers: {
                authorization: ''
            }
        };
        (0, _authenticateToken.authenticateToken)(mockRequest, mockResponse, mockNext);
        // Verify response for missing token
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Authorization token is missing'
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
    it('should return 403 if token is invalid or expired', ()=>{
        const mockToken = 'invalidToken';
        // Mock jwt.verify to throw an error for invalid token
        _jsonwebtoken.default.verify.mockImplementation(()=>{
            throw new Error('Invalid token');
        });
        mockRequest = {
            headers: {
                authorization: `Bearer ${mockToken}`
            }
        };
        (0, _authenticateToken.authenticateToken)(mockRequest, mockResponse, mockNext);
        // Verify response for invalid token
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Invalid or expired token'
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
