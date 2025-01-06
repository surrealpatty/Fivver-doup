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
const services_1 = __importDefault(require("../models/services")); // Ensure this import path is correct
const user_1 = require("../models/user"); // User model import
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Sequelize instance for testing
let sequelizeInstance;
beforeAll(async () => {
    // Initialize Sequelize with models explicitly
    sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST, // Use environment variables for DB configuration
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [user_1.User, services_1.default], // Add models to Sequelize instance
    });
    // Log models to check if they are correctly imported
    console.log('User Model:', user_1.User);
    console.log('Service Model:', services_1.default);
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([user_1.User, services_1.default]);
    // Define the associations after models are loaded
    services_1.default.belongsTo(user_1.User, { foreignKey: 'userId' });
    user_1.User.hasMany(services_1.default, { foreignKey: 'userId' }); // Define the reverse association (optional)
    // Check database connection
    await sequelizeInstance.authenticate();
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
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
// Clean up after tests
afterAll(async () => {
    // Close the Sequelize connection after tests
    await sequelizeInstance.close(); // Close the test database connection
});
