"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _uuid = require("uuid");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Service Model Tests', ()=>{
    let user; // Declare a user variable to be used across tests
    beforeAll(async ()=>{
        // Ensure the database is ready before running tests
        await _database.sequelize.sync({
            force: true
        });
        // Create a test user before running the tests
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
        // Close the database connection after running tests
        await _database.sequelize.close();
    });
    it('should create a new service', async ()=>{
        // Define service data
        const serviceData = {
            id: (0, _uuid.v4)(),
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: user.id
        };
        // Create the service and save it in the database
        const service = await _services.default.create(serviceData);
        // Validate the created service's attributes
        expect(service.userId).toBe(user.id); // Ensure the userId matches
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(10);
    });
});
