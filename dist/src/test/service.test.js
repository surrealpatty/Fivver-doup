"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../models/services"); // Adjust the import path as needed
const user_1 = require("../models/user"); // Import the User model to ensure the `userId` is valid
const database_1 = require("../config/database"); // Ensure Sequelize instance is correctly imported
describe('Service Model Tests', () => {
    let user;
    beforeAll(async () => {
        // Sync the database before running the tests
        await database_1.sequelize.sync({ force: true }); // Use `force: true` to recreate tables
        // Set up a user before running tests
        user = await user_1.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpassword', // Make sure this is hashed in a real scenario
            role: 'user', // Assuming "role" is a required field
            tier: 'Tier 1', // Assuming "tier" is a required field
            isVerified: true, // Assuming "isVerified" is a required field
        });
    });
    afterAll(async () => {
        // Close the Sequelize connection after all tests
        await database_1.sequelize.close();
    });
    it('should define the Service model', () => {
        expect(services_1.Service).toBeDefined(); // Sanity check: Ensure the Service model is defined
    });
    it('should create a new service', async () => {
        // Define service attributes including 'role'
        const serviceData = {
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Ensure user.id is valid and exists in the database
            role: 'user', // Add the role field here
        };
        // Create the service using the defined attributes
        const service = await services_1.Service.create(serviceData);
        // Logging to check if the service is created and if the ID is set correctly
        console.log('Created service ID:', service.id); // Log the generated ID
        // Assertions to validate the creation of the service
        expect(service.id).toBeDefined(); // Ensure the ID is generated
        expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
        expect(service.description).toBe('A test service');
        expect(service.role).toBe('user'); // Ensure role is set correctly
    });
    it('should retrieve a service by ID', async () => {
        const service = await services_1.Service.findByPk('123e4567-e89b-12d3-a456-426614174000');
        expect(service).not.toBeNull();
        expect(service?.title).toBe('Test Service');
    });
    it('should update a service', async () => {
        const service = await services_1.Service.create({
            title: 'Test Service for Update',
            description: 'Test description',
            price: 100,
            userId: user.id,
            role: 'user',
        });
        const [updatedRowsCount] = await services_1.Service.update({ price: 600 }, // New price
        { where: { id: service.id } } // Use dynamic service ID
        );
        expect(updatedRowsCount).toBe(1);
        const updatedService = await services_1.Service.findByPk(service.id);
        expect(updatedService?.price).toBe(600);
    });
    it('should delete a service', async () => {
        const service = await services_1.Service.create({
            title: 'Test Service for Deletion',
            description: 'Test description',
            price: 100,
            userId: user.id,
            role: 'user',
        });
        const deletedRowsCount = await services_1.Service.destroy({
            where: { id: service.id },
        });
        expect(deletedRowsCount).toBe(1);
        const deletedService = await services_1.Service.findByPk(service.id);
        expect(deletedService).toBeNull();
    });
});
