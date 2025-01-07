"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import in the test file
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct import for Sequelize
const index_1 = require("../index"); // Correct import for the app
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for JWT verification
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
const user_1 = require("../models/user"); // User model import
const services_1 = require("../models/services"); // Service model import
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Sequelize instance for testing
let sequelizeInstance;
beforeAll(async () => {
    sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST, // Use environment variables for DB configuration
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [user_1.User, services_1.Service], // Add models to Sequelize instance
    });
    // Log models to check if they are correctly imported
    console.log('User Model:', user_1.User);
    console.log('Service Model:', services_1.Service);
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([user_1.User, services_1.Service]);
    // Define associations
    services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' });
    user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' });
    // Test database connection and sync models
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync({ force: true });
});
describe('Authentication Tests', () => {
    it('should authenticate and return a valid JWT token', async () => {
        // Create a test user
        const userResponse = await (0, supertest_1.default)(index_1.app)
            .post('/users/register') // Ensure the correct registration route
            .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser',
        });
        // Validate user creation
        expect(userResponse.status).toBe(201);
        expect(userResponse.body.token).toBeDefined(); // Ensure token is returned
        // Authenticate the user (login)
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/users/login') // Ensure the correct login route
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        // Validate login response
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined(); // Ensure token is returned
        // Verify the JWT token
        const decoded = jsonwebtoken_1.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
    it('should reject invalid credentials', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/users/login') // Ensure the correct login route
            .send({
            email: 'invalid@example.com',
            password: 'wrongpassword',
        });
        // Validate error response
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.');
    });
});
afterAll(async () => {
    // Close the Sequelize connection after tests
    await sequelizeInstance.close();
});
