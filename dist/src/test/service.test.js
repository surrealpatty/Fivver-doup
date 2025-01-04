"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _services = require("../models/services");
const _index = require("../index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mocking the Service model methods
jest.mock('../models/services', ()=>({
        Service: {
            create: jest.fn(),
            findOne: jest.fn()
        }
    }));
describe('Service Tests', ()=>{
    // Apply retry logic to all tests in this suite
    beforeEach(()=>{
        jest.retryTimes(3); // Retries failed tests 3 times before reporting an error
    });
    describe('POST /api/services/create', ()=>{
        it('should create a service successfully', async ()=>{
            // Mock resolved value for Service.create
            _services.Service.create.mockResolvedValueOnce({
                id: '1',
                title: 'Test Service',
                description: 'This is a test service',
                price: 100
            });
            // Send a POST request to create service endpoint
            const response = await (0, _supertest.default)(_index.app).post('/api/services/create').send({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100
            });
            // Verify the response
            expect(response.status).toBe(201); // Expecting a 201 Created status
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Test Service');
            // Verify that Service.create was called with the correct parameters
            expect(_services.Service.create).toHaveBeenCalledWith({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100
            });
        });
        it('should return an error if service creation fails', async ()=>{
            // Mock rejected value for Service.create
            _services.Service.create.mockRejectedValueOnce(new Error('Service creation failed'));
            const response = await (0, _supertest.default)(_index.app).post('/api/services/create').send({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100
            });
            expect(response.status).toBe(400); // Correcting the expected status
            expect(response.body).toHaveProperty('error', 'Service creation failed');
        });
    });
});
