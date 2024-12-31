// src/test/sample.test.ts
import { Service } from '../models/services';
import User from '../models/user';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';
describe('Service Model Tests', () => {
    let user; // Declare user at the top to use across tests
    beforeAll(async () => {
        // Sync the database (ensure it's ready before tests)
        await sequelize.sync({ force: true });
        // Create a user before tests
        user = await User.create({
            id: '176019c7-46ea-4e86-aa00-caf519a26b3e', // Sample UUID for testing
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true,
        });
    });
    afterAll(async () => {
        // Close the database connection after tests
        await sequelize.close();
    });
    it('should create a new service', async () => {
        const serviceData = {
            id: uuidv4(), // Assuming service.id is a UUID (string)
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // user.id is a string (UUID) from the user created in beforeAll
        };
        // Create the service and associate it with the user
        const service = await Service.create(serviceData);
        // Ensure that the userId is correctly compared as a string (UUID)
        expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
//# sourceMappingURL=sample.test.js.map