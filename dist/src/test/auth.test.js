"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // Example request to authenticate and get a token
        const response = await (0, _supertest.default)(_index.default) // Use supertest to make a request to the app
        .post('/login') // Adjust the route based on your actual route
        .send({
            email: 'test@example.com',
            password: 'password123'
        });
        // Ensure the response includes a valid token
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        // Decode the token to verify its contents (if JWT is used)
        const decoded = _jsonwebtoken.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
});

//# sourceMappingURL=auth.test.js.map