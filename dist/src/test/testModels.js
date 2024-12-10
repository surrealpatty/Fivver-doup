// src/test/testModels.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
const _user = require("../models/user");
const _database = require("../config/database");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Service Model Tests', ()=>{
    beforeAll(async ()=>{
        // Sync the database (ensure it's ready before tests)
        await _database.sequelize.sync({
            force: true
        });
    });
    it('should create a new service', async ()=>{
        // Create a user with all required fields (password, role, and isVerified)
        const user = await _user.User.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true
        });
        // Prepare the service data with the correct type
        const serviceData = {
            name: 'Test Service',
            description: 'A test service description',
            price: 100.0,
            userId: String(user.id)
        };
        // Create the service and ensure it's properly typed
        const service = await _services.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(String(user.id)); // Ensure userId is a string
        expect(service.name).toBe('Test Service'); // Ensure 'name' is correctly used
        expect(service.price).toBe(100.0);
    });
});

//# sourceMappingURL=testModels.js.map