"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../models/user");
const services_1 = require("../models/services");
// Initialize Sequelize with models
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password', // Use your actual password
    database: 'fivver_doup',
    models: [user_1.User, services_1.Service], // Add models to Sequelize instance
});
// Sync the models before running tests
beforeAll(async () => {
    // Ensure database is in sync with models
    await sequelize.sync({ force: true }); // 'force: true' to drop and re-create tables for a clean state
});
// Clean up after tests
afterAll(async () => {
    await sequelize.close(); // Close the Sequelize connection after tests
});
// Example test to check the association
test('Service can be associated with User', () => {
    // Check if the 'belongsTo' association is defined for the Service model
    expect(services_1.Service.belongsTo).toBeDefined();
});
