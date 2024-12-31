"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _user = require("../models/user");
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
const _database = require("../config/database");
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Generate a JWT token for testing (assuming you have JWT-based authentication)
const paidToken = _jsonwebtoken.default.sign({
    id: '1',
    role: 'Paid'
}, process.env.JWT_SECRET);
describe('Service Model', ()=>{
    let serviceId;
    beforeAll(async ()=>{
        // Sync the database before tests
        await _database.sequelize.sync();
    });
    it('should associate userId correctly when creating a service', async ()=>{
        // Step 1: Create the user first
        const user = await _user.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'Free',
            tier: 'Tier1',
            isVerified: true
        });
        // Step 2: Create the service and associate it with the user
        const service = await _services.default.create({
            title: 'Test Service',
            description: 'Service Description',
            price: 10,
            userId: user.id
        });
        // Step 3: Verify the service is correctly associated with the user
        expect(service.userId).toBe(user.id); // This should pass if association is correct
        // Store the serviceId for later tests
        serviceId = service.id;
    });
    it('should return 404 if the service is not found', async ()=>{
        const response = await (0, _supertest.default)(_index.default).put('/services/9999') // Assuming service with ID 9999 does not exist
        .set('Authorization', `Bearer ${paidToken}`).send({
            title: 'Non-existent Service'
        });
        // Assertions
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    });
    it('should return 400 if the price is invalid', async ()=>{
        const response = await (0, _supertest.default)(_index.default).put(`/services/${serviceId}`).set('Authorization', `Bearer ${paidToken}`).send({
            title: 'Invalid Service Title',
            description: 'Description with invalid price',
            price: 'invalid' // Invalid price value
        });
        // Assertions
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid price value');
    });
});

//# sourceMappingURL=service.test.js.map