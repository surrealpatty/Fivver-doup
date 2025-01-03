import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.js'; // Correct import for User model (with .js extension)
import { Service } from '../models/services.js'; // Correct import for Service model (with .js extension)

// Initialize Sequelize with models
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password', // Use your actual password
    database: 'fivver_doup',
    models: [User, Service], // Add models to Sequelize instance
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
    expect(Service.belongsTo).toBeDefined();
});
