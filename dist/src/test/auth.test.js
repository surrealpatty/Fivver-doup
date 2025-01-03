"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _index = require("../index");
const _database = /*#__PURE__*/ _interop_require_default(require("../config/database"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Ensure the models are added and synced before running the tests
beforeAll(async ()=>{
    // Add models to Sequelize instance
    _database.default.addModels([
        _user.default,
        _services.Service
    ]);
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await _database.default.sync({
        force: false
    });
});
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // First, create a test user (for the purpose of the test)
        const userResponse = await (0, _supertest.default)(_index.app).post('/register') // Assuming you have a route for user registration
        .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser'
        });
        // Check if the user was successfully created
        expect(userResponse.status).toBe(201);
        // Example request to authenticate and get a token
        const response = await (0, _supertest.default)(_index.app) // Use supertest to make a request to the app
        .post('/login') // Adjust the route based on your actual login route
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
