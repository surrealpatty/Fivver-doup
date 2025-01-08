"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jwt = require("../utils/jwt");
const _types = require("../types");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mocking jwt functions
jest.mock('jsonwebtoken', ()=>({
        sign: jest.fn(),
        verify: jest.fn()
    }));
// Example user object with the correct properties
const user = {
    id: '123',
    email: 'user@example.com',
    username: 'username',
    tier: _types.UserTier.Paid,
    role: _types.UserRole.User
};
describe('JWT Utility Functions', ()=>{
    describe('generateToken', ()=>{
        it('should generate a token successfully', ()=>{
            const mockToken = 'mockToken';
            _jsonwebtoken.default.sign.mockReturnValue(mockToken);
            const token = (0, _jwt.generateToken)(user);
            expect(token).toBe(mockToken);
            expect(_jsonwebtoken.default.sign).toHaveBeenCalledWith({
                id: user.id,
                email: user.email,
                username: user.username,
                tier: user.tier,
                role: user.role
            }, process.env.JWT_SECRET_KEY || 'your-secret-key', {
                expiresIn: '1h'
            });
        });
        it('should throw an error if token generation fails', ()=>{
            _jsonwebtoken.default.sign.mockImplementationOnce(()=>{
                throw new Error('Mock error');
            });
            expect(()=>(0, _jwt.generateToken)(user)).toThrowError('Failed to generate token');
        });
    });
    describe('verifyToken', ()=>{
        it('should return the decoded token for a valid token', ()=>{
            const mockDecoded = {
                ...user
            };
            _jsonwebtoken.default.verify.mockReturnValue(mockDecoded);
            const decoded = (0, _jwt.verifyToken)('validToken');
            expect(decoded).toEqual(mockDecoded);
        });
        it('should return null for an expired token', ()=>{
            _jsonwebtoken.default.verify.mockImplementationOnce(()=>{
                throw new _jsonwebtoken.default.TokenExpiredError('jwt expired', new Date());
            });
            const result = (0, _jwt.verifyToken)('expiredToken');
            expect(result).toBeNull();
        });
        it('should return null for a malformed token', ()=>{
            _jsonwebtoken.default.verify.mockImplementationOnce(()=>{
                throw new _jsonwebtoken.default.JsonWebTokenError('jwt malformed');
            });
            const result = (0, _jwt.verifyToken)('malformedToken');
            expect(result).toBeNull();
        });
        it('should return null for any other verification error', ()=>{
            _jsonwebtoken.default.verify.mockImplementationOnce(()=>{
                throw new Error('Some other error');
            });
            const result = (0, _jwt.verifyToken)('someOtherErrorToken');
            expect(result).toBeNull();
        });
    });
    describe('generateToken and verifyToken integration', ()=>{
        it('should generate and verify a JWT token correctly', ()=>{
            const token = (0, _jwt.generateToken)(user); // Generate token
            // Verify the token
            const decoded = (0, _jwt.verifyToken)(token);
            // Assert that the decoded token matches the user information
            if (decoded) {
                expect(decoded.id).toBe(user.id);
                expect(decoded.email).toBe(user.email);
                expect(decoded.username).toBe(user.username);
                expect(decoded.tier).toBe(user.tier);
                expect(decoded.role).toBe(user.role);
            } else {
                fail('Token verification failed'); // Fail the test if the token could not be decoded
            }
        });
    });
});
