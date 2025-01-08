// src/test/authenticateToken.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mock jsonwebtoken methods
jest.mock('jsonwebtoken', ()=>({
        sign: jest.fn(()=>'mocked-token'),
        verify: jest.fn(()=>({
                userId: 'some-user-id'
            }))
    }));
describe('Authentication Middleware Tests', ()=>{
    const secret = process.env.JWT_SECRET || 'secret';
    it('should allow access with a valid token', async ()=>{
        const validToken = _jsonwebtoken.default.sign({
            userId: 'some-user-id'
        }, secret); // Use the mocked sign function
        const response = await (0, _supertest.default)(_index.default).get('/api/protected') // Replace with your actual protected route
        .set('Authorization', `Bearer ${validToken}`); // Add the mocked token in the Authorization header
        expect(response.status).toBe(200); // Expect 200 status for valid token
        expect(_jsonwebtoken.default.verify).toHaveBeenCalledTimes(1); // Ensure jwt.verify was called
        expect(_jsonwebtoken.default.verify).toHaveBeenCalledWith(validToken, secret); // Ensure jwt.verify was called with the correct arguments
    });
    it('should deny access with an invalid token', async ()=>{
        // Update the mock for the verify method to throw an error
        _jsonwebtoken.default.verify.mockImplementationOnce(()=>{
            throw new Error('Invalid token');
        });
        const response = await (0, _supertest.default)(_index.default).get('/api/protected') // Replace with your actual protected route
        .set('Authorization', 'Bearer invalid-token'); // Use an invalid token
        expect(response.status).toBe(401); // Expect 401 Unauthorized status
        expect(response.body.message).toBe('Invalid or expired token'); // Check for the correct error message
    });
});
