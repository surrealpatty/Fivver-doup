"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _index = require("../index");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _database = require("../config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Ensure the models are added and synced before running the tests
beforeAll(async ()=>{
    // Initialize Sequelize with models explicitly
    const sequelizeInstance = new _sequelizetypescript.Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'password',
        database: 'fivver_doup',
        models: [
            _user.default,
            _services.default
        ]
    });
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([
        _user.default,
        _services.default
    ]);
    // Define the associations after models are loaded
    _services.default.belongsTo(_user.default, {
        foreignKey: 'userId'
    });
    _user.default.hasMany(_services.default, {
        foreignKey: 'userId'
    }); // Define the reverse association (optional)
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await sequelizeInstance.sync({
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
    it('should reject invalid credentials', async ()=>{
        const response = await (0, _supertest.default)(_index.app).post('/login') // Replace with your actual login route
        .send({
            email: 'invalid@example.com',
            password: 'wrongpassword'
        });
        // Assert the response status and message
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.');
    });
});
// Clean up after tests
afterAll(async ()=>{
    await _database.sequelize.close(); // Close the Sequelize connection after tests
});
