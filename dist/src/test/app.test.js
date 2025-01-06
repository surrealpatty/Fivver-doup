"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure reflect-metadata is imported first for sequelize-typescript
const sequelize_typescript_1 = require("sequelize-typescript"); // Import Sequelize from sequelize-typescript
const index_1 = require("../index"); // Import the app to be tested
const supertest_1 = __importDefault(require("supertest")); // For making HTTP requests to your app
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For verifying JWT tokens
const dotenv_1 = __importDefault(require("dotenv")); // To load environment variables
const user_1 = require("../models/user"); // Correct import for the User model
const services_1 = require("../models/services"); // Correct import for the Service model
dotenv_1.default.config(); // Load environment variables from .env file
let sequelizeInstance;
beforeAll(async () => {
    // Initialize Sequelize with models explicitly
    sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        models: [user_1.User, services_1.Service], // Add models to Sequelize instance
    });
    // Add models and define associations after models are loaded
    sequelizeInstance.addModels([user_1.User, services_1.Service]);
    // Define associations explicitly (belongsTo and hasMany)
    services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' });
    user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' });
    // Check the database connection and sync with the DB
    await sequelizeInstance.authenticate(); // Ensure connection is successful
    await sequelizeInstance.sync({ force: true }); // Sync the database (force: true resets the database)
});
describe('Authentication Tests', () => {
    it('should authenticate and return a valid JWT token', async () => {
        // First, create a test user (for registration)
        const userResponse = await (0, supertest_1.default)(index_1.app)
            .post('/register') // Make sure the registration route is correct
            .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser',
        });
        // Ensure the user was created successfully
        expect(userResponse.status).toBe(201);
        // Now, attempt to log in and get a token
        const loginResponse = await (0, supertest_1.default)(index_1.app)
            .post('/login') // Adjust the login route based on your app's setup
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        // Ensure the login was successful and the token is returned
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.token).toBeDefined(); // Ensure a token is returned
        // Decode the token to verify its contents
        const decoded = jsonwebtoken_1.default.verify(loginResponse.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id'); // Ensure the decoded token contains 'id'
        expect(decoded).toHaveProperty('email'); // Ensure the decoded token contains 'email'
    });
    it('should reject invalid credentials', async () => {
        // Attempt to login with incorrect credentials
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/login') // Ensure this route matches your app's login endpoint
            .send({
            email: 'invalid@example.com',
            password: 'wrongpassword',
        });
        // Ensure the response is a 401 Unauthorized with the correct error message
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.'); // Adjust message if necessary
    });
});
// Clean up after tests
afterAll(async () => {
    // Close the Sequelize connection after all tests are completed
    await sequelizeInstance.close();
});
