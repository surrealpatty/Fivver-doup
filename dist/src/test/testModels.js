"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _database = require("../config/database");
const _uuid = require("uuid");
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
        const user = await _user.default.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            role: 'free',
            tier: 'free',
            isVerified: true,
            id: (0, _uuid.v4)()
        });
        // Prepare the service data without the 'image' property
        const serviceData = {
            id: 1,
            title: 'Test Service',
            description: 'A test service',
            price: 10,
            userId: String(user.id)
        };
        // Create the service and ensure it's properly typed
        const service = await _services.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(Number(user.id)); // Ensure userId is correctly typed as a number
        expect(service.title).toBe('Test Service'); // Ensure 'title' is used correctly instead of 'name'
        expect(service.price).toBe(10); // Ensure 'price' is correctly set
    });
});

//# sourceMappingURL=testModels.js.map