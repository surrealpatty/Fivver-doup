"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _database = require("../config/database");
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let server;
let serviceId = null;
const paidToken = _jsonwebtoken.default.sign({
    id: '1',
    role: 'Paid'
}, process.env.JWT_SECRET || 'default_secret', {
    expiresIn: '1h'
});
beforeAll(async ()=>{
    await _database.sequelize.sync({
        force: true
    });
    server = _index.default.listen(3000, ()=>{
        console.log('Test server running on port 3000');
    });
});
afterAll(async ()=>{
    await _database.sequelize.close();
    server.close();
});
describe('Service Model Tests', ()=>{
    it('should correctly associate userId when creating a service', async ()=>{
        const user = await _user.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'Free',
            tier: 'Tier1',
            isVerified: true
        });
        const service = await _services.Service.create({
            title: 'Test Service',
            description: 'Service Description',
            price: 10,
            userId: user.id
        });
        expect(service.userId).toBe(user.id);
        serviceId = Number(service.id); // Convert service.id to a number
    });
    it('should return 404 if the service is not found', async ()=>{
        const response = await (0, _supertest.default)(_index.default).put('/services/9999') // Assuming service with ID 9999 does not exist
        .set('Authorization', `Bearer ${paidToken}`).send({
            title: 'Non-existent Service'
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    });
    it('should return 400 if the price is invalid', async ()=>{
        if (!serviceId) {
            throw new Error('serviceId is not set');
        }
        // Test with invalid negative price
        const response = await (0, _supertest.default)(_index.default).put(`/services/${serviceId}`).set('Authorization', `Bearer ${paidToken}`).send({
            title: 'Invalid Service Title',
            description: 'Description with invalid price',
            price: -1
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid price value');
    });
    it('should return 400 if price is a string', async ()=>{
        if (!serviceId) {
            throw new Error('serviceId is not set');
        }
        // Test with invalid string price
        const response = await (0, _supertest.default)(_index.default).put(`/services/${serviceId}`).set('Authorization', `Bearer ${paidToken}`).send({
            title: 'Invalid Service Title',
            description: 'Description with invalid price',
            price: 'invalid'
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid price value');
    });
});

//# sourceMappingURL=service.test.js.map