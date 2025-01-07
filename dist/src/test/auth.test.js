"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Import your app instance
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import jsonwebtoken for token verification
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
const sequelize_1 = require("sequelize"); // Import Sequelize for database operations
const user_1 = require("../models/user"); // Import User model
const services_1 = require("../models/services"); // Import Service model
dotenv_1.default.config(); // Load environment variables
let sequelizeInstance; // Initialize Sequelize instance
beforeAll(async () => {
    sequelizeInstance = new sequelize_1.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
    });
    // Set models and define associations
    sequelizeInstance.models.User = user_1.User;
    sequelizeInstance.models.Service = services_1.Service;
    services_1.Service.belongsTo(user_1.User, { foreignKey: 'userId' });
    user_1.User.hasMany(services_1.Service, { foreignKey: 'userId' });
    // Authenticate and sync models
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync({ force: true });
});
describe('Authentication Tests', () => {
    it('should register a user and return a valid JWT token', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/users/register')
            .send({
            email: 'authuser@example.com',
            password: 'securepassword',
            username: 'authuser',
        });
        expect(response.status).toBe(201); // Ensure user is created successfully
        expect(response.body.token).toBeDefined(); // Verify token is returned
        const decoded = jsonwebtoken_1.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id'); // Verify token contains user ID
    });
    it('should login a user and return a valid JWT token', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/users/login')
            .send({
            email: 'authuser@example.com',
            password: 'securepassword',
        });
        expect(response.status).toBe(200); // Ensure login is successful
        expect(response.body.token).toBeDefined(); // Verify token is returned
        const decoded = jsonwebtoken_1.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id'); // Verify token contains user ID
        expect(decoded).toHaveProperty('email'); // Verify token contains email
    });
    it('should reject login with invalid credentials', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/users/login')
            .send({
            email: 'invaliduser@example.com',
            password: 'wrongpassword',
        });
        expect(response.status).toBe(401); // Unauthorized status
        expect(response.body.message).toBe('Invalid credentials');
    });
    it('should reject a request with an expired token', async () => {
        const expiredToken = jsonwebtoken_1.default.sign({ id: 1, email: 'authuser@example.com' }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '-1s' } // Token is already expired
        );
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/protected-route') // Replace with your protected route
            .set('Authorization', `Bearer ${expiredToken}`);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
    it('should reject a request with a malformed token', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/protected-route') // Replace with your protected route
            .set('Authorization', 'Bearer malformed.token.value');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
});
afterAll(async () => {
    await sequelizeInstance.close(); // Close the Sequelize connection
});
