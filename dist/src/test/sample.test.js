// src/test/sample.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _uuid = require("uuid");
const _services = require("../models/services");
const _user = require("../models/user");
const _UserRoles = require("../types/UserRoles");
describe('Service Model Tests', ()=>{
    let user; // Declare a user variable to be used across tests
    beforeAll(async ()=>{
        // Ensure the test database (fivver_doup_test) is used and ready
        await _database.sequelize.authenticate(); // Test connection
        // Sync the database and force recreation of tables in the test database
        await _database.sequelize.sync({
            force: true
        });
        // Create a test user before running the tests
        user = await _user.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Free,
            isVerified: true
        });
    });
    afterAll(async ()=>{
        // Close the database connection after running tests
        await _database.sequelize.close();
    });
    it('should create a new service', async ()=>{
        // Define service data with the missing 'role' field
        const serviceData = {
            id: (0, _uuid.v4)(),
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id.toString(),
            role: _UserRoles.UserRole.User
        };
        // Create the service and save it in the database
        const service = await _services.Service.create(serviceData);
        // Validate the created service's attributes
        expect(service.id).toBeDefined(); // Ensure the service has an ID
        expect(service.userId).toBe(user.id.toString()); // Ensure the userId matches (as string)
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
        expect(service.role).toBe(_UserRoles.UserRole.User); // Ensure the role is correctly set
    });
});
