"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jwt = require("./jwt");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _types = require("../types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mock the JWT methods to avoid actual signing and verifying during tests
jest.mock('jsonwebtoken', ()=>({
        sign: jest.fn(),
        verify: jest.fn()
    }));
describe('JWT Utility Functions', ()=>{
    const mockUser = {
        id: '123',
        email: 'user@example.com',
        username: 'testuser',
        tier: _types.UserTier.Free,
        role: _types.UserRole.User
    };
    beforeAll(()=>{
        // Mock the sign method to simulate the token generation
        _jsonwebtoken.default.sign.mockReturnValue('mock-token');
    });
    describe('generateToken', ()=>{
        it('should generate a token for a user', ()=>{
            const token = (0, _jwt.generateToken)(mockUser);
            // Check if jwt.sign was called with the correct arguments
            expect(_jsonwebtoken.default.sign).toHaveBeenCalledWith({
                id: '123',
                email: 'user@example.com',
                username: 'testuser',
                tier: _types.UserTier.Free,
                role: _types.UserRole.User
            }, process.env.JWT_SECRET_KEY || 'your-secret-key', {
                expiresIn: '1h'
            });
            // Check that the returned token matches the mocked token
            expect(token).toBe('mock-token');
        });
        it('should throw an error if token generation fails', ()=>{
            // Mock jwt.sign to throw an error
            _jsonwebtoken.default.sign.mockImplementation(()=>{
                throw new Error('Failed to generate token');
            });
            expect(()=>(0, _jwt.generateToken)(mockUser)).toThrow('Failed to generate token');
        });
    });
    describe('verifyToken', ()=>{
        it('should verify a valid token and return decoded user data', ()=>{
            // Mock the decoded payload
            const mockDecoded = {
                id: '123',
                email: 'user@example.com',
                username: 'testuser',
                tier: _types.UserTier.Free,
                role: _types.UserRole.User
            };
            _jsonwebtoken.default.verify.mockReturnValue(mockDecoded);
            const decoded = (0, _jwt.verifyToken)('mock-token');
            // Check if jwt.verify was called with the correct arguments
            expect(_jsonwebtoken.default.verify).toHaveBeenCalledWith('mock-token', process.env.JWT_SECRET_KEY || 'your-secret-key');
            // Check if the returned decoded data matches the mock data
            expect(decoded).toEqual(mockDecoded);
        });
        it('should return null if token verification fails', ()=>{
            // Mock jwt.verify to throw an error
            _jsonwebtoken.default.verify.mockImplementation(()=>{
                throw new Error('Token verification failed');
            });
            const decoded = (0, _jwt.verifyToken)('invalid-token');
            expect(decoded).toBeNull();
        });
    });
});
