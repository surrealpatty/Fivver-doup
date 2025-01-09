"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _database = require("../config/database");
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = require("../models/services");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Ensure the models are added and synced before running the tests
beforeAll(async ()=>{
    // Initialize Sequelize with models explicitly
    const sequelizeInstance = new _sequelizetypescript.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [
            _user.default,
            _services.Service
        ]
    });
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([
        _user.default,
        _services.Service
    ]);
    // Define the associations after models are loaded
    _services.Service.belongsTo(_user.default, {
        foreignKey: 'userId'
    });
    _user.default.hasMany(_services.Service, {
        foreignKey: 'userId'
    }); // Define the reverse association (optional)
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await sequelizeInstance.sync({
        force: true
    }); // Reset DB to ensure a clean state
});
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // First, create a test user (for the purpose of the test)
        const userResponse = await (0, _supertest.default)(_index.default).post('/register') // Assuming you have a route for user registration
        .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser'
        });
        // Check if the user was successfully created
        expect(userResponse.status).toBe(201);
        console.log('User registration response:', userResponse.body);
        // Example request to authenticate and get a token
        const response = await (0, _supertest.default)(_index.default) // Use supertest to make a request to the app
        .post('/login') // Adjust the route based on your actual login route
        .send({
            email: 'test@example.com',
            password: 'password123'
        });
        // Ensure the response includes a valid token
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        console.log('Login response with token:', response.body);
        // Decode the token to verify its contents (if JWT is used)
        try {
            const decoded = _jsonwebtoken.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
            expect(decoded).toHaveProperty('id');
            expect(decoded).toHaveProperty('email');
        } catch (err) {
            console.error('Error decoding JWT:', err);
            throw new Error('Invalid token or JWT decoding error');
        }
    });
    it('should reject invalid credentials', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/login') // Replace with your actual login route
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
