import { sequelize } from '../config/database.js'; // Correct import with .js extension
import { v4 as uuidv4 } from 'uuid'; // UUID generator
import User from '../models/user.js'; // Ensure the path is correct with .js extension
import Service from '../models/services.js'; // Ensure the path is correct with .js extension

describe('Service Model Tests', () => {
    let user; // Declare a user variable to be used across tests

    beforeAll(async () => {
        // Ensure the database is ready before running tests
        await sequelize.sync({ force: true });
        // Create a test user before running the tests
        user = await User.create({
            id: '176019c7-46ea-4e86-aa00-caf519a26b3e', // Predefined UUID for the test
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true,
        });
    });

    afterAll(async () => {
        // Close the database connection after running tests
        await sequelize.close();
    });

    it('should create a new service', async () => {
        // Define service data
        const serviceData = {
            id: uuidv4(), // Generate a unique ID
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Associate the service with the created user
        };
        // Create the service and save it in the database
        const service = await Service.create(serviceData);
        // Validate the created service's attributes
        expect(service.userId).toBe(user.id); // Ensure the userId matches
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
