"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Helper function to generate JWT token with a role
const generateToken = (userId, role)=>{
    return _jsonwebtoken.default.sign({
        id: userId,
        role
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
describe('Role-based Access', ()=>{
    const paidToken = generateToken('1', 'Paid'); // Generate token for paid user
    const freeToken = generateToken('2', 'Free'); // Generate token for free user
    // Test case for allowing paid users to access premium services
    it('should allow paid users to access premium services', async ()=>{
        const response = await (0, _supertest.default)(_index.app).get('/services/premium').set('Authorization', `Bearer ${paidToken}`); // Send the paid user's token
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    // Test case for denying free users from accessing premium services
    it('should deny free users from accessing premium services', async ()=>{
        const response = await (0, _supertest.default)(_index.app).get('/services/premium').set('Authorization', `Bearer ${freeToken}`); // Send the free user's token
        expect(response.status).toBe(403); // Forbidden
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});

//# sourceMappingURL=role.test.js.map