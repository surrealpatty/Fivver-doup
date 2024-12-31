// src/test/auth.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Ensure that you are requiring the correct path for the compiled app file
const app = require('../index').app; // Adjust path if needed
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // Example request to authenticate and get a token
        const response = await (0, _supertest.default)(app).post('/login') // Adjust the route based on your actual route
        .send({
            email: 'test@example.com',
            password: 'password123'
        });
        // Ensure the response includes a valid token
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        // Decode the token to verify its contents
        const decoded = _jsonwebtoken.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
});

//# sourceMappingURL=auth.test.js.map