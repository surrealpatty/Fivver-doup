"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure reflect-metadata is imported for decorators to work
const index_1 = require("../index"); // Correct import for the app
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../config/database"); // Correct import for sequelize instance
const user_1 = __importDefault(require("../models/user")); // Import User model to ensure it's added to Sequelize
const services_1 = __importDefault(require("../models/services")); // Import Service model to ensure it's added to Sequelize
// Ensure the models are added and synced before running the tests
beforeAll(async () => {
    // Add models to Sequelize instance before associations
    database_1.sequelize.addModels([user_1.default, services_1.default]);
    // Define the associations after models are loaded
    services_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
    user_1.default.hasMany(services_1.default, { foreignKey: 'userId' });
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await database_1.sequelize.sync({ force: false });
});
describe('Database connection and API routes', () => {
    // Async test to check if the database connection is successful
    test('should establish database connection', async () => {
        // Ensure the database connection is established before the test
        await database_1.sequelize.authenticate(); // This ensures the connection is successful
        console.log('Database connection established');
    });
    // Async test for an API route
    test('should return 200 OK on root route', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Fiverr backend is running');
    });
    // Test if Service can be associated with User
    test('Service can be associated with User', () => {
        // Check if the 'belongsTo' association is defined for the Service model
        expect(services_1.default.belongsTo).toBeDefined();
        // You can also check if it's associated correctly with User
        const association = services_1.default.associations.User;
        expect(association).toBeDefined();
    });
});
// Clean up after tests
afterAll(async () => {
    await database_1.sequelize.close(); // Close the Sequelize connection after tests
});
