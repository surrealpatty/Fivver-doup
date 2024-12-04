"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _service = require("../models/service");
const _database = require("../config/database");
const _user = require("../models/user");
describe('Service Model Tests', ()=>{
    let testUser;
    beforeAll(async ()=>{
        // Set up your test database (if needed)
        await _database.sequelize.sync({
            force: true
        });
        // Create a test user to associate with services
        testUser = await _user.User.create({
            email: 'testuser@example.com',
            username: 'testuser',
            password: 'password123'
        });
    });
    it('should create a new service', async ()=>{
        const service = await _service.Service.create({
            title: 'Test Service',
            description: 'This is a test service.',
            price: 100,
            userId: testUser.id
        });
        expect(service).toHaveProperty('id');
        expect(service.title).toBe('Test Service');
        expect(service.userId).toBe(testUser.id); // Ensure the userId is correctly set
    });
    it('should find all services', async ()=>{
        const services = await _service.Service.findAll();
        expect(services).toBeInstanceOf(Array);
        expect(services.length).toBeGreaterThan(0); // Optionally check length
    });
    it('should update a service', async ()=>{
        const service = await _service.Service.create({
            title: 'Old Service',
            description: 'This is an old service.',
            price: 50,
            userId: testUser.id
        });
        service.title = 'Updated Service';
        await service.save();
        expect(service.title).toBe('Updated Service');
    });
    it('should delete a service', async ()=>{
        const service = await _service.Service.create({
            title: 'Service to Delete',
            description: 'This service will be deleted.',
            price: 30,
            userId: testUser.id
        });
        await service.destroy();
        const deletedService = await _service.Service.findByPk(service.id);
        expect(deletedService).toBeNull();
    });
});

//# sourceMappingURL=service.test.js.map