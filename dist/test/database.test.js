"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Import the sequelize instance
const index_1 = __importDefault(require("../index")); // Import your Express app
const supertest_1 = __importDefault(require("supertest"));
const services_1 = require("../models/services"); // Import your models
describe('Database connection and API routes', () => {
    // Async test to check if the database connection is successful
    test('should establish database connection', async () => {
        // Ensure the database connection is established before the test
        await database_1.sequelize.authenticate(); // This ensures the connection is successful
        console.log('Database connection established');
    });
    // Async test for an API route
    test('should return 200 OK on root route', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Fiverr backend is running');
    });
    // Test database synchronization and associations
    beforeAll(async () => {
        // Sync the models with the database before running tests
        await database_1.sequelize.sync({ force: true }); // 'force: true' to drop and re-create tables for a clean state
    });
    afterAll(async () => {
        // Clean up after tests
        await database_1.sequelize.close(); // Close the Sequelize connection after tests
    });
    // Test if Service can be associated with User
    test('Service can be associated with User', () => {
        // Check if the 'belongsTo' association is defined for the Service model
        expect(services_1.Service.belongsTo).toBeDefined();
        // You can also check if it's associated correctly with User
        const association = services_1.Service.associations.User;
        expect(association).toBeDefined();
    });
});
