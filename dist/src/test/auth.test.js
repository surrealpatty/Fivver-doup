"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import in the test file
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Import your app instance from index.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for JWT verification
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
const sequelize_1 = require("sequelize"); // Import Sequelize from the sequelize package
const user_1 = require("../models/user"); // User model import
const services_1 = require("../models/services"); // Service model import
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Sequelize instance for testing
let sequelizeInstance; // Explicitly define the type as Sequelize
beforeAll(async () => {
    // Initialize Sequelize instance for testing without models option
    sequelizeInstance = new sequelize_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
    });
    // Manually set models after Sequelize instance initialization
    sequelizeInstance.models.User = user_1.User; // Manually assign models
    sequelizeInstance.models.Service = services_1.Service;
    // Define associations manually
    services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' });
    user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' });
    // Test database connection and sync models
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync({ force: true }); // Force sync to ensure clean database state
});
describe('Authentication Tests', () => {
    it('should authenticate and return a valid JWT token', async () => {
        // Step 1: Create a test user
        const userResponse = await (0, supertest_1.default)(index_1.app)
            .post('/users/register') // Ensure the correct registration route
            .send({
            email: 'testuser@example.com',
            password: 'validpassword',
            username: 'testuser',
        });
        expect(userResponse.status).toBe(201); // Validate user creation
        expect(userResponse.body.token).toBeDefined(); // Ensure token is returned
        // Step 2: Authenticate the user (login)
        const loginResponse = await (0, supertest_1.default)(index_1.app)
            .post('/users/login') // Ensure the correct login route
            .send({
            email: 'testuser@example.com',
            password: 'validpassword',
        });
        expect(loginResponse.status).toBe(200); // Adjusted to expect 200 (success)
        expect(loginResponse.body.token).toBeDefined(); // Ensure token is returned
        // Step 3: Verify the JWT token
        const decoded = jsonwebtoken_1.default.verify(loginResponse.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
    it('should reject invalid credentials', async () => {
        const invalidLoginResponse = await (0, supertest_1.default)(index_1.app)
            .post('/users/login') // Ensure the correct login route
            .send({
            email: 'invaliduser@example.com',
            password: 'wrongpassword',
        });
        expect(invalidLoginResponse.status).toBe(401); // Check for unauthorized status
        expect(invalidLoginResponse.body.message).toBe('Invalid credentials'); // Validate error message
    });
});
afterAll(async () => {
    // Close the Sequelize connection after tests
    await sequelizeInstance.close();
});
