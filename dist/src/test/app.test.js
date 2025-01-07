// src/test/app.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _user = require("../models/user");
const _services = require("../models/services");
const _index = require("../index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config(); // Load environment variables from .env file
let sequelizeInstance;
beforeAll(async ()=>{
    // Initialize Sequelize with models explicitly
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
    // Add models and define associations after models are loaded
    sequelizeInstance.addModels([
        _user.User,
        _services.Service
    ]);
    // Define associations explicitly (belongsTo and hasMany)
    _services.Service.belongsTo(_user.User, {
        foreignKey: 'userId'
    });
    _user.User.hasMany(_services.Service, {
        foreignKey: 'userId'
    });
    // Check the database connection and sync with the DB
    await sequelizeInstance.authenticate(); // Ensure connection is successful
    await sequelizeInstance.sync({
        force: true
    }); // Sync the database (force: true resets the database)
});
describe('Authentication Tests', ()=>{
    it('should authenticate and return a valid JWT token', async ()=>{
        // First, create a test user (for registration)
        const userResponse = await (0, _supertest.default)(_index.app).post('/register') // Make sure the registration route is correct
        .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser'
        });
        // Ensure the user was created successfully
        expect(userResponse.status).toBe(201);
        // Now, attempt to log in and get a token
        const loginResponse = await (0, _supertest.default)(_index.app).post('/login') // Adjust the login route based on your app's setup
        .send({
            email: 'test@example.com',
            password: 'password123'
        });
        // Ensure the login was successful and the token is returned
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.token).toBeDefined(); // Ensure a token is returned
        // Decode the token to verify its contents
        const decoded = _jsonwebtoken.default.verify(loginResponse.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id'); // Ensure the decoded token contains 'id'
        expect(decoded).toHaveProperty('email'); // Ensure the decoded token contains 'email'
    });
    it('should reject invalid credentials', async ()=>{
        // Attempt to login with incorrect credentials
        const response = await (0, _supertest.default)(_index.app).post('/login') // Ensure this route matches your app's login endpoint
        .send({
            email: 'invalid@example.com',
            password: 'wrongpassword'
        });
        // Ensure the response is a 401 Unauthorized with the correct error message
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.'); // Adjust message if necessary
    });
});
// Clean up after tests
afterAll(async ()=>{
    // Close the Sequelize connection after all tests are completed
    await sequelizeInstance.close();
});
