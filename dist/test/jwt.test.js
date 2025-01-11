"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt"); // Adjust the import path if necessary
const types_1 = require("../types"); // Correctly import from '../types'
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mocking jwt functions
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
// Example user object with the correct properties
const user = {
    id: '123',
    email: 'user@example.com',
    username: 'username',
    tier: types_1.UserTier.Paid, // Use the correct enum value for tier
    role: types_1.UserRole.User, // Use the correct enum value for role
};
describe('JWT Utility Functions', () => {
    describe('generateToken', () => {
        it('should generate a token successfully', () => {
            const mockToken = 'mockToken';
            jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
            const token = (0, jwt_1.generateToken)(user);
            expect(token).toBe(mockToken);
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({
                id: user.id,
                email: user.email,
                username: user.username,
                tier: user.tier,
                role: user.role,
            }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });
        });
        it('should throw an error if token generation fails', () => {
            jsonwebtoken_1.default.sign.mockImplementationOnce(() => {
                throw new Error('Mock error');
            });
            expect(() => (0, jwt_1.generateToken)(user)).toThrowError('Failed to generate token');
        });
    });
    describe('verifyToken', () => {
        it('should return the decoded token for a valid token', () => {
            const mockDecoded = { ...user };
            jsonwebtoken_1.default.verify.mockReturnValue(mockDecoded);
            const decoded = (0, jwt_1.verifyToken)('validToken');
            expect(decoded).toEqual(mockDecoded);
        });
        it('should return null for an expired token', () => {
            jsonwebtoken_1.default.verify.mockImplementationOnce(() => {
                throw new jsonwebtoken_1.default.TokenExpiredError('jwt expired', new Date());
            });
            const result = (0, jwt_1.verifyToken)('expiredToken');
            expect(result).toBeNull();
        });
        it('should return null for a malformed token', () => {
            jsonwebtoken_1.default.verify.mockImplementationOnce(() => {
                throw new jsonwebtoken_1.default.JsonWebTokenError('jwt malformed');
            });
            const result = (0, jwt_1.verifyToken)('malformedToken');
            expect(result).toBeNull();
        });
        it('should return null for any other verification error', () => {
            jsonwebtoken_1.default.verify.mockImplementationOnce(() => {
                throw new Error('Some other error');
            });
            const result = (0, jwt_1.verifyToken)('someOtherErrorToken');
            expect(result).toBeNull();
        });
    });
    describe('generateToken and verifyToken integration', () => {
        it('should generate and verify a JWT token correctly', () => {
            const token = (0, jwt_1.generateToken)(user); // Generate token
            // Verify the token
            const decoded = (0, jwt_1.verifyToken)(token);
            // Assert that the decoded token matches the user information
            if (decoded) {
                expect(decoded.id).toBe(user.id);
                expect(decoded.email).toBe(user.email);
                expect(decoded.username).toBe(user.username);
                expect(decoded.tier).toBe(user.tier);
                expect(decoded.role).toBe(user.role);
            }
            else {
                fail('Token verification failed'); // Fail the test if the token could not be decoded
            }
        });
    });
});
