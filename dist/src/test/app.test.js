"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure reflect-metadata is imported for decorators to work
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct import for Sequelize
const index_1 = require("../index"); // Correct import for the app
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for JWT verification
const database_1 = require("../config/database"); // Correct import for sequelize instance
const user_1 = __importDefault(require("../models/user")); // Import User model to ensure it's added to Sequelize
const services_1 = __importDefault(require("../models/services")); // Import Service model to ensure it's added to Sequelize
// Ensure the models are added and synced before running the tests
beforeAll(async () => {
    // Initialize Sequelize with models explicitly
    const sequelizeInstance = new sequelize_typescript_1.Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'password', // Use your actual password here
        database: 'fivver_doup',
        models: [user_1.default, services_1.default], // Add models to Sequelize instance
    });
    // Add models to Sequelize instance and define associations
    sequelizeInstance.addModels([user_1.default, services_1.default]);
    // Define the associations after models are loaded
    services_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
    user_1.default.hasMany(services_1.default, { foreignKey: 'userId' }); // Define the reverse association (optional)
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await sequelizeInstance.sync({ force: false });
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
    await database_1.sequelize.close(); // Close the Sequelize connection after tests
});
