"use strict";
// src/test/app.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import in the test file
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct import for Sequelize
const index_1 = require("../index"); // Adjust the import for your app
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for JWT verification
const user_1 = __importDefault(require("../models/user")); // Import User model to ensure it's added to Sequelize
const services_1 = __importDefault(require("../models/services")); // Import Service model to ensure it's added to Sequelize
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
// Load environment variables from .env file
dotenv_1.default.config();
// Sequelize setup for test environment
let sequelizeInstance;
beforeAll(async () => {
    // Initialize Sequelize with models explicitly
    sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST, // Use environment variables for DB configuration
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [user_1.default, services_1.default], // Add models to Sequelize instance
    });
    // Define associations between models
    services_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
    user_1.default.hasMany(services_1.default, { foreignKey: 'userId' });
    // Sync the database (force: true to reset DB for each test)
    await sequelizeInstance.sync({ force: true });
});
describe('Authentication Tests', () => {
    it('should authenticate and return a valid JWT token', async () => {
        // First, create a test user (for the purpose of the test)
        const userResponse = await (0, supertest_1.default)(index_1.app)
            .post('/register') // Assuming you have a route for user registration
            .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser',
        });
        // Check if the user was successfully created
        expect(userResponse.status).toBe(201);
        // Now, authenticate and get a token
        const response = await (0, supertest_1.default)(index_1.app) // Use supertest to make a request to the app
            .post('/login') // Adjust the route based on your actual login route
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        // Ensure the response includes a valid token
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        // Decode the token to verify its contents (if JWT is used)
        const decoded = jsonwebtoken_1.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
    it('should reject invalid credentials', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/login') // Replace with your actual login route
            .send({ email: 'invalid@example.com', password: 'wrongpassword' });
        // Assert the response status and message
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.');
    });
});
describe('Service Tests', () => {
    it('should create a service successfully', async () => {
        // Mock resolved value for Service.create if necessary
        const mockServiceCreate = jest.spyOn(services_1.default, 'create').mockResolvedValueOnce({
            id: '1',
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        // Send a POST request to create service endpoint
        const response = await (0, supertest_1.default)(index_1.app).post('/api/services/create').send({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        // Verify the response
        expect(response.status).toBe(201); // Expecting a 201 Created status
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Service');
        // Verify that Service.create was called with the correct parameters
        expect(mockServiceCreate).toHaveBeenCalledWith({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        // Clean up the mock after test
        mockServiceCreate.mockRestore();
    });
    it('should return an error if service creation fails', async () => {
        // Mock rejected value for Service.create if necessary
        const mockServiceCreate = jest.spyOn(services_1.default, 'create').mockRejectedValueOnce(new Error('Service creation failed'));
        const response = await (0, supertest_1.default)(index_1.app).post('/api/services/create').send({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        expect(response.status).toBe(400); // Correct the expected status code
        expect(response.body).toHaveProperty('error', 'Service creation failed');
        // Clean up the mock after test
        mockServiceCreate.mockRestore();
    });
});
// Clean up after tests
afterAll(async () => {
    // Gracefully close the Sequelize connection after all tests
    await sequelizeInstance.close();
});
