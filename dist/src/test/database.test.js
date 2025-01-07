"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import in the test file
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct import for Sequelize
const database_1 = require("../config/database"); // Correct import for sequelize instance
const index_1 = require("../index"); // Correct import for the app
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for JWT verification
const user_1 = require("../models/user"); // Import User model to ensure it's added to Sequelize
const services_1 = require("../models/services"); // Correct named import
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
// Load environment variables from .env file
dotenv_1.default.config();
// Ensure the models are added and synced before running the tests
beforeAll(async () => {
    // Initialize Sequelize with models explicitly
    const sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST, // Use environment variables for DB configuration
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [user_1.User, services_1.Service], // Add models to Sequelize instance
    });
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([user_1.User, services_1.Service]);
    // Define the associations after models are loaded
    services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' });
    user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' }); // Define the reverse association (optional)
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await sequelizeInstance.sync({ force: true }); // Reset DB to ensure a clean state
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
        console.log('User registration response:', userResponse.body);
        // Example request to authenticate and get a token
        const response = await (0, supertest_1.default)(index_1.app) // Use supertest to make a request to the app
            .post('/login') // Adjust the route based on your actual login route
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        // Ensure the response includes a valid token
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        console.log('Login response with token:', response.body);
        // Decode the token to verify its contents (if JWT is used)
        try {
            const decoded = jsonwebtoken_1.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
            expect(decoded).toHaveProperty('id');
            expect(decoded).toHaveProperty('email');
        }
        catch (err) {
            console.error('Error decoding JWT:', err);
            throw new Error('Invalid token or JWT decoding error');
        }
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
// Clean up after tests
afterAll(async () => {
    await database_1.sequelize.close(); // Close the Sequelize connection after tests
});
