"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Example JWT tokens (use actual generated tokens for your tests)
// In a real test, you would generate valid tokens based on your authentication logic.
const paidToken = 'your-valid-paid-user-token'; // Replace with actual paid user token
const freeToken = 'your-valid-free-user-token'; // Replace with actual free user token
describe('Role-based Access for Premium Service', ()=>{
    it('should allow paid users to access premium services', async ()=>{
        // Make a request to the /premium-service endpoint
        const response = await (0, _supertest.default)(_index.app).get('/premium-service') // Ensure this is the correct route
        .set('Authorization', `Bearer ${paidToken}`); // Add the paid token in Authorization header
        // Assert that the response status is 200 and the message is correct
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny free users from accessing premium services', async ()=>{
        // Make a request to the /premium-service endpoint with a free token
        const response = await (0, _supertest.default)(_index.app).get('/premium-service') // Ensure this is the correct route
        .set('Authorization', `Bearer ${freeToken}`); // Add the free token in Authorization header
        // Assert that the response status is 403 and the message is correct
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
