"use strict";
// src/test/server.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index"); // Ensure your app is properly imported
const database_1 = require("../config/database"); // Sequelize connection
const services_1 = require("../models/services");
const user_1 = require("../models/user");
let server; // Explicitly define the type of the server
let user;
beforeAll(async () => {
    // Sync the database before running tests
    await database_1.sequelize.sync({ force: true });
    // Setup the server
    server = index_1.app.listen(3000); // Start the server on port 3000
    // Create a user before running tests
    user = await user_1.User.create({
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword', // In a real scenario, this should be hashed
        role: 'user',
        tier: 'paid', // Use 'paid' instead of 'Tier 2'
        isVerified: true,
    });
});
afterAll(async () => {
    // Ensure the server is closed after all tests
    server.close();
    // Close the Sequelize connection after all tests
    await database_1.sequelize.close();
});
describe('Service API', () => {
    it('should define the Service model', () => {
        expect(services_1.Service).toBeDefined(); // Ensure Service model is defined
    });
    it('should create a new service and return a generated ID', async () => {
        const serviceData = {
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id, // Associate service with user
            role: 'user', // Valid role
        };
        // Create a new service
        const service = await services_1.Service.create(serviceData);
        console.log('Created service ID:', service.id);
        // Assertions
        expect(service.id).toBeDefined();
        expect(service.userId).toBe(user.id);
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
        expect(service.description).toBe('A test service');
        expect(service.role).toBe('user');
    });
    it('should retrieve a service by ID', async () => {
        const service = await services_1.Service.create({
            title: 'Test Service to Retrieve',
            description: 'A service for retrieving test',
            price: 20,
            userId: user.id,
            role: 'user',
        });
        const retrievedService = await services_1.Service.findByPk(service.id);
        expect(retrievedService).not.toBeNull();
        expect(retrievedService?.title).toBe('Test Service to Retrieve');
    });
    it('should update a service', async () => {
        const service = await services_1.Service.create({
            title: 'Service to Update',
            description: 'A service that will be updated',
            price: 30,
            userId: user.id,
            role: 'user',
        });
        const [updatedRowsCount] = await services_1.Service.update({ price: 600 }, { where: { id: service.id } });
        expect(updatedRowsCount).toBe(1);
        const updatedService = await services_1.Service.findByPk(service.id);
        expect(updatedService?.price).toBe(600);
    });
    it('should delete a service', async () => {
        const service = await services_1.Service.create({
            title: 'Service to Delete',
            description: 'A service that will be deleted',
            price: 40,
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
