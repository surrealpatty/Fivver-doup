"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _index = require("../index");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
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
    sequelizeInstance = new _sequelizetypescript.Sequelize({
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
    // Log models to check if they are correctly imported
    console.log('User Model:', _user.User);
    console.log('Service Model:', _services.Service);
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
    });
});
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // Create a test user
        const userResponse = await (0, _supertest.default)(_index.app).post('/users/register') // Ensure the correct registration route
        .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser'
        });
        // Validate user creation
        expect(userResponse.status).toBe(201);
        expect(userResponse.body.token).toBeDefined(); // Ensure token is returned
        // Authenticate the user (login)
        const response = await (0, _supertest.default)(_index.app).post('/users/login') // Ensure the correct login route
        .send({
            email: 'test@example.com',
            password: 'password123'
        });
        // Validate login response
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined(); // Ensure token is returned
        // Verify the JWT token
        const decoded = _jsonwebtoken.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
    it('should reject invalid credentials', async ()=>{
        const response = await (0, _supertest.default)(_index.app).post('/users/login') // Ensure the correct login route
        .send({
            email: 'invalid@example.com',
            password: 'wrongpassword'
        });
        // Validate error response
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.');
    });
});
afterAll(async ()=>{
    // Close the Sequelize connection after tests
    await sequelizeInstance.close();
});
