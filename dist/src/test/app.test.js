"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import in the test file
const index_1 = require("../index"); // Correct import for the app
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../config/database"); // Correct import for sequelize instance
const user_1 = __importDefault(require("../models/user")); // Import User model to ensure it's added to Sequelize
const services_1 = __importDefault(require("../models/services")); // Ensure Service is properly imported
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
describe('API Routes Tests', () => {
    test('should return 200 OK on root route', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Fiverr backend is running'); // Adjust this according to your route
    });
    test('should return 404 for undefined routes', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/nonexistent');
        expect(res.status).toBe(404);
    });
});
// Clean up after tests
afterAll(async () => {
    // Gracefully close the Sequelize connection after all tests
    await database_1.sequelize.close();
});
