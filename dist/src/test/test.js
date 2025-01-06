"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Adjust path as needed
const services_1 = require("../models/services"); // Ensure correct import path
const database_1 = require("../config/database"); // Ensure sequelize instance is imported
jest.mock('../models/services', () => ({
    Service: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
beforeAll(async () => {
    await database_1.sequelize.sync({ force: true }); // Sync test database
});
describe('Service Tests', () => {
    it('should create a service successfully', async () => {
        // Mock resolved value for Service.create
        services_1.Service.create.mockResolvedValueOnce({
            id: '1',
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        const response = await (0, supertest_1.default)(index_1.app).post('/api/services/create').send({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Service');
        expect(services_1.Service.create).toHaveBeenCalledWith({
            title: 'Test Service',
            description: 'This is a test service',
            price: 100,
        });
    });
});
