"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("../types"); // Import enums for UserRole and UserTier
// Mock the JWT methods to avoid actual signing and verifying during tests
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
describe('JWT Utility Functions', () => {
    const mockUser = {
        id: '123',
        email: 'user@example.com',
        username: 'testuser',
        tier: types_1.UserTier.Free, // Use the correct enum value for tier
        role: types_1.UserRole.User, // Use the correct enum value for role
    };
    beforeAll(() => {
        // Mock the sign method to simulate the token generation
        jsonwebtoken_1.default.sign.mockReturnValue('mock-token');
    });
    describe('generateToken', () => {
        it('should generate a token for a user', () => {
            const token = (0, jwt_1.generateToken)(mockUser);
            // Check if jwt.sign was called with the correct arguments
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({
                id: '123',
                email: 'user@example.com',
                username: 'testuser',
                tier: types_1.UserTier.Free, // Use enum value here
                role: types_1.UserRole.User, // Use enum value here
            }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });
            // Check that the returned token matches the mocked token
            expect(token).toBe('mock-token');
        });
        it('should throw an error if token generation fails', () => {
            // Mock jwt.sign to throw an error
            jsonwebtoken_1.default.sign.mockImplementation(() => {
                throw new Error('Failed to generate token');
            });
            expect(() => (0, jwt_1.generateToken)(mockUser)).toThrow('Failed to generate token');
        });
    });
    describe('verifyToken', () => {
        it('should verify a valid token and return decoded user data', () => {
            // Mock the decoded payload
            const mockDecoded = {
                id: '123',
                email: 'user@example.com',
                username: 'testuser',
                tier: types_1.UserTier.Free, // Use enum value here
                role: types_1.UserRole.User, // Use enum value here
            };
            jsonwebtoken_1.default.verify.mockReturnValue(mockDecoded);
            const decoded = (0, jwt_1.verifyToken)('mock-token');
            // Check if jwt.verify was called with the correct arguments
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('mock-token', process.env.JWT_SECRET_KEY || 'your-secret-key');
            // Check if the returned decoded data matches the mock data
            expect(decoded).toEqual(mockDecoded);
        });
        it('should return null if token verification fails', () => {
            // Mock jwt.verify to throw an error
            jsonwebtoken_1.default.verify.mockImplementation(() => {
                throw new Error('Token verification failed');
            });
            const decoded = (0, jwt_1.verifyToken)('invalid-token');
            expect(decoded).toBeNull();
        });
    });
});
