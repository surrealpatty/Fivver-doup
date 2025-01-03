import { Service } from '../models/services';
import User from '../models/user';
import { sequelize } from '../config/database'; // Correct import
import { v4 as uuidv4 } from 'uuid';
describe('Service Model Tests', () => {
    let user; // Declare user at the top to use across tests
    beforeAll(async () => {
        // Sync the database (ensure it's ready before tests)
        await sequelize.sync({ force: true });
        // Create a user before tests
        user = await User.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true,
            id: uuidv4(),
        });
    });
    afterAll(async () => {
        // Close the database connection after tests
        await sequelize.close();
    });
    it('should create a new service', async () => {
        const serviceData = {
            id: uuidv4(), // Generate a valid UUID string
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // user.id is a string (UUID)
        };
        const service = await Service.create(serviceData);
        // Ensure that the userId is correctly compared as a string
        expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
