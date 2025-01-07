"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mock JWT methods to avoid actual signing and verifying
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
describe('JWT Utilities', () => {
    const mockUser = {
        id: '123',
        email: 'user@example.com',
        username: 'testuser',
        tier: 'free',
        role: 'user',
    };
    describe('generateToken', () => {
        it('should generate a token for a user', () => {
            // Mock JWT sign
            jsonwebtoken_1.default.sign.mockReturnValue('mock-token');
            const token = (0, jwt_1.generateToken)(mockUser);
            // Check that jwt.sign was called with correct arguments
            expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({
                id: '123',
                email: 'user@example.com',
                username: 'testuser',
                tier: 'free',
                role: 'user',
            }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });
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
        it('should verify a token and return decoded user data', () => {
            // Mock JWT verify
            const mockDecoded = {
                id: '123',
                email: 'user@example.com',
                username: 'testuser',
                tier: 'free',
                role: 'user',
            };
            jsonwebtoken_1.default.verify.mockReturnValue(mockDecoded);
            const decoded = (0, jwt_1.verifyToken)('mock-token');
            expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('mock-token', process.env.JWT_SECRET_KEY || 'your-secret-key');
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
