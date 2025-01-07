"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _services = require("../models/services");
const _user = require("../models/user");
const _database = require("../config/database");
describe('Service Model', ()=>{
    let user;
    beforeAll(async ()=>{
        // Sync the database before running tests
        await _database.sequelize.sync({
            force: true
        });
        // Create a user before running tests
        user = await _user.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpassword',
            role: 'user',
            tier: 'paid',
            isVerified: true
        });
    });
    afterAll(async ()=>{
        // Close the Sequelize connection after all tests
        await _database.sequelize.close();
    });
    it('should define the Service model', ()=>{
        expect(_services.Service).toBeDefined(); // Sanity check: Ensure the Service model is defined
    });
    it('should create a new service and return a generated ID', async ()=>{
        const serviceData = {
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id,
            role: 'user'
        };
        // Create a new service
        const service = await _services.Service.create(serviceData);
        // Assertions to validate that the service has been created successfully
        expect(service.id).toBeDefined(); // Ensure the ID is generated and not undefined
        expect(service.userId).toBe(user.id); // Ensure userId is correctly set
        expect(service.title).toBe('Test Service'); // Ensure title is set correctly
        expect(service.price).toBe(10); // Ensure price is set correctly
        expect(service.description).toBe('A test service'); // Ensure description is correct
        expect(service.role).toBe('user'); // Ensure role is set correctly
    });
    it('should retrieve a service by ID', async ()=>{
        // Create a service to retrieve
        const service = await _services.Service.create({
            title: 'Test Service to Retrieve',
            description: 'A service for retrieving test',
            price: 20,
            userId: user.id,
            role: 'user'
        });
        const retrievedService = await _services.Service.findByPk(service.id); // Retrieve using the created ID
        expect(retrievedService).not.toBeNull(); // Ensure the service exists
        expect(retrievedService?.title).toBe('Test Service to Retrieve'); // Ensure title matches
    });
    it('should update a service', async ()=>{
        // Create a service to update
        const service = await _services.Service.create({
            title: 'Service to Update',
            description: 'A service that will be updated',
            price: 30,
            userId: user.id,
            role: 'user'
        });
        // Update the service price
        const [updatedRowsCount] = await _services.Service.update({
            price: 600
        }, {
            where: {
                id: service.id
            }
        } // Use the created service ID
        );
        expect(updatedRowsCount).toBe(1); // Ensure one row was updated
        // Retrieve the updated service
        const updatedService = await _services.Service.findByPk(service.id);
        expect(updatedService?.price).toBe(600); // Ensure the price was updated correctly
    });
    it('should delete a service', async ()=>{
        // Create a service to delete
        const service = await _services.Service.create({
            title: 'Service to Delete',
            description: 'A service that will be deleted',
            price: 40,
            userId: user.id,
            role: 'user'
        });
        // Delete the service
        const deletedRowsCount = await _services.Service.destroy({
            where: {
                id: service.id
            }
        });
        expect(deletedRowsCount).toBe(1); // Ensure one row was deleted
        // Attempt to retrieve the deleted service
        const deletedService = await _services.Service.findByPk(service.id);
        expect(deletedService).toBeNull(); // Ensure the service is no longer found
    });
});
