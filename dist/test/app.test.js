import 'reflect-metadata'; // Ensure reflect-metadata is imported for decorators to work
import { Sequelize } from 'sequelize-typescript'; // Correct import for Sequelize
import { User } from '../models/user'; // Correct import for User model
import { Service } from '../models/services'; // Correct import for Service model
import { app } from '../index'; // Correct import for the app
import request from 'supertest';
// Initialize Sequelize with models
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password', // Use your actual MySQL password here
    database: 'fivver_doup',
    models: [User, Service], // Add models to Sequelize instance
});
// Define the associations between models **after** they are loaded
Service.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Service, { foreignKey: 'userId' }); // Define the reverse association (optional)
// Sync the models before running tests
beforeAll(async () => {
    // Ensure the models are synced before tests run
    await sequelize.sync({ force: true }); // 'force: true' will drop and re-create tables for a clean slate
});
// Clean up after tests
afterAll(async () => {
    await sequelize.close(); // Close the Sequelize connection after tests
});
// Example of a test with role-based access
describe('Role-based Access for Premium Service', () => {
    // Example test for paid user accessing premium service
    it('should allow paid users to access premium services', async () => {
        const paidToken = 'your-valid-paid-user-token'; // Replace with actual paid user token
        const response = await request(app)
            .get('/premium-service') // Ensure this route exists in your app
            .set('Authorization', `Bearer ${paidToken}`); // Add token to the Authorization header
        // Debugging logs
        console.log('Response for paid user:', response.status, response.body);
        // Assert the response status and message
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    // Test for denying free users access
    it('should deny free users from accessing premium services', async () => {
        const freeToken = 'your-valid-free-user-token'; // Replace with actual free user token
        const response = await request(app)
            .get('/premium-service') // Ensure this route exists in your app
            .set('Authorization', `Bearer ${freeToken}`); // Add token to the Authorization header
        // Debugging logs
        console.log('Response for free user:', response.status, response.body);
        // Assert the response status and message
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
