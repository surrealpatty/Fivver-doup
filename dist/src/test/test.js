"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
const _services = require("../models/services");
const _database = require("../config/database");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
jest.mock('../models/services', ()=>({
        Service: {
            create: jest.fn(),
            findOne: jest.fn()
        }
    }));
// Ensure database sync before tests
beforeAll(async ()=>{
    try {
        await _database.sequelize.sync({
            force: true
        }); // Sync the database for testing
    } catch (error) {
        console.error('Database sync failed:', error); // Log errors for debugging
        throw error; // Rethrow to ensure test suite halts on critical setup failures
    }
});
// Close database connection after tests
afterAll(async ()=>{
    await _database.sequelize.close();
});
describe('Service Tests', ()=>{
    it('should create a service successfully', async ()=>{
        // Mock resolved value for Service.create
        _services.Service.create.mockResolvedValueOnce({
            id: '1',
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
            userId: 'test-user-id',
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const response = await (0, _supertest.default)(_index.app).post('/api/services/create').send({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100
        });
        expect(response.status).toBe(201); // Check for successful response
        expect(response.body).toHaveProperty('id'); // Check response contains id
        expect(response.body.title).toBe('Test Service'); // Verify title
        expect(_services.Service.create).toHaveBeenCalledWith({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100
        }); // Verify mock function was called with correct arguments
    });
});
