// src/test/userServiceTest.ts
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
        // Create a user with all required fields (password and role)
        const user = await _user.User.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'testPassword123',
            role: 'free'
        });
        // Prepare the service data with the correct type
        const serviceData = {
            userId: user.id,
            title: 'Test Service',
            description: 'A test service description',
            price: 100.0
        };
        // Create the service and ensure it's properly typed
        const service = await _services.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(user.id);
        expect(service.title).toBe('Test Service');
        expect(service.price).toBe(100.0);
    });
});

//# sourceMappingURL=userServiceTest.js.map