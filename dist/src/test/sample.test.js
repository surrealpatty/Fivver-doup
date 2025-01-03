"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _services = require("../models/services");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _database = require("../config/database");
const _uuid = require("uuid");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Service Model Tests', ()=>{
    let user; // Declare user at the top to use across tests
    beforeAll(async ()=>{
        // Sync the database (ensure it's ready before tests)
        await _database.sequelize.sync({
            force: true
        });
        // Create a user before tests
        user = await _user.default.create({
            id: '176019c7-46ea-4e86-aa00-caf519a26b3e',
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true
        });
    });
    afterAll(async ()=>{
        // Close the database connection after tests
        await _database.sequelize.close();
    });
    it('should create a new service', async ()=>{
        const serviceData = {
            id: (0, _uuid.v4)(),
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id
        };
        // Create the service and associate it with the user
        const service = await _services.Service.create(serviceData);
        // Ensure that the userId is correctly compared as a string (UUID)
        expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
