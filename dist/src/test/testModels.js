"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../models/services"); // Correct import for Service model
const user_1 = require("../models/user"); // Correct import for User model
const database_1 = require("../config/database"); // Correct import for sequelize
describe('Service Model', () => {
    let user;
    beforeAll(async () => {
        // Sync the database before running tests
        await database_1.sequelize.sync({ force: true });
        // Create a user before running tests
        user = await user_1.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpassword', // In a real scenario, this should be hashed
            role: 'user', // Assuming role is a required field for the user model
            tier: 'Tier 1', // Assuming tier is a required field for the user model
            isVerified: true, // Assuming isVerified is required for the user model
        });
    });
    afterAll(async () => {
        // Close the Sequelize connection after all tests
        await database_1.sequelize.close();
    });
    it('should define the Service model', () => {
        expect(services_1.Service).toBeDefined(); // Sanity check: Ensure the Service model is defined
    });
    it('should create a new service and return a generated ID', async () => {
        const serviceData = {
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Associating the service with the user
            role: 'user', // Valid role
        };
        // Create a new service
        const service = await services_1.Service.create(serviceData);
        console.log('Created service ID:', service.id); // Log the generated ID
        // Assertions to validate that the service has been created successfully
        expect(service.id).toBeDefined(); // Ensure the ID is generated and not undefined
        expect(service.userId).toBe(user.id); // Ensure userId is correctly set
        expect(service.title).toBe('Test Service'); // Ensure title is set correctly
        expect(service.price).toBe(10); // Ensure price is set correctly
        expect(service.description).toBe('A test service'); // Ensure description is correct
        expect(service.role).toBe('user'); // Ensure role is set correctly
    });
    it('should retrieve a service by ID', async () => {
        // Create a service to retrieve
        const service = await services_1.Service.create({
            title: 'Test Service to Retrieve',
            description: 'A service for retrieving test',
            price: 20,
            userId: user.id,
            role: 'user', // Valid role
        });
        const retrievedService = await services_1.Service.findByPk(service.id); // Retrieve using the created ID
        expect(retrievedService).not.toBeNull(); // Ensure the service exists
        expect(retrievedService?.title).toBe('Test Service to Retrieve'); // Ensure title matches
    });
    it('should update a service', async () => {
        // Create a service to update
        const service = await services_1.Service.create({
            title: 'Service to Update',
            description: 'A service that will be updated',
            price: 30,
            userId: user.id,
            role: 'user', // Valid role
        });
        // Update the service price
        const [updatedRowsCount] = await services_1.Service.update({ price: 600 }, // New price
        { where: { id: service.id } } // Use the created service ID
        );
        expect(updatedRowsCount).toBe(1); // Ensure one row was updated
        // Retrieve the updated service
        const updatedService = await services_1.Service.findByPk(service.id);
        expect(updatedService?.price).toBe(600); // Ensure the price was updated correctly
    });
    it('should delete a service', async () => {
        // Create a service to delete
        const service = await services_1.Service.create({
            title: 'Service to Delete',
            description: 'A service that will be deleted',
            price: 40,
            userId: user.id,
            role: 'user', // Valid role
        });
        // Delete the service
        const deletedRowsCount = await services_1.Service.destroy({
            where: { id: service.id },
        });
        expect(deletedRowsCount).toBe(1); // Ensure one row was deleted
        // Attempt to retrieve the deleted service
        const deletedService = await services_1.Service.findByPk(service.id);
        expect(deletedService).toBeNull(); // Ensure the service is no longer found
    });
});
