"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _user = require("../models/user");
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Initialize Sequelize instance for testing
let sequelizeInstance;
beforeAll(async ()=>{
    // Initialize Sequelize instance for testing
    sequelizeInstance = new Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [
            _user.User,
            _services.Service
        ]
    });
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([
        _user.User,
        _services.Service
    ]);
    // Define associations
    _services.Service.belongsTo(_user.User, {
        foreignKey: 'userId'
    });
    _user.User.hasMany(_services.Service, {
        foreignKey: 'userId'
    });
    // Test database connection and sync models
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync({
        force: true
    }); // Force sync to ensure clean database state
});
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // Step 1: Create a test user
        const userResponse = await (0, _supertest.default)(_index.app).post('/users/register') // Ensure the correct registration route
        .send({
            email: 'testuser@example.com',
            password: 'validpassword',
            username: 'testuser'
        });
        expect(userResponse.status).toBe(201); // Validate user creation
        expect(userResponse.body.token).toBeDefined(); // Ensure token is returned
        // Step 2: Authenticate the user (login)
        const loginResponse = await (0, _supertest.default)(_index.app).post('/users/login') // Ensure the correct login route
        .send({
            email: 'testuser@example.com',
            password: 'validpassword'
        });
        expect(loginResponse.status).toBe(200); // Adjusted to expect 200 (success)
        expect(loginResponse.body.token).toBeDefined(); // Ensure token is returned
        // Step 3: Verify the JWT token
        const decoded = _jsonwebtoken.default.verify(loginResponse.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
    it('should reject invalid credentials', async ()=>{
        const invalidLoginResponse = await (0, _supertest.default)(_index.app).post('/users/login') // Ensure the correct login route
        .send({
            email: 'invaliduser@example.com',
            password: 'wrongpassword'
        });
        expect(invalidLoginResponse.status).toBe(401); // Check for unauthorized status
        expect(invalidLoginResponse.body.message).toBe('Invalid credentials'); // Validate error message
    });
});
afterAll(async ()=>{
    // Close the Sequelize connection after tests
    await sequelizeInstance.close();
});
