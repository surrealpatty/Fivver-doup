"use strict";
// src/test/service.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Ensure this is the first import
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Adjusting to the source directory directly
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv to load environment variables
const sequelize_typescript_1 = require("sequelize-typescript"); // Correct import of Sequelize
const services_1 = require("../models/services"); // Correct import path for Service model
// Mocking the Service model methods
jest.mock('../models/services', () => ({
    Service: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));
// Load environment variables from .env file
dotenv_1.default.config();
// Sequelize initialization for test database
const sequelize = new sequelize_typescript_1.Sequelize({
    username: process.env.TEST_DB_USERNAME, // Use test DB credentials
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST, // Ensure correct host for the test DB
    dialect: 'mysql',
    models: [services_1.Service], // Add models to Sequelize initialization for tests
});
// Sync database before tests
beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate tables for each test
});
// Retry logic for all tests in this suite
beforeEach(() => {
    jest.retryTimes(3); // Retries failed tests 3 times before reporting an error
});
describe('Service Tests', () => {
    describe('POST /api/services/create', () => {
        it('should create a service successfully', async () => {
            // Mock resolved value for Service.create
            services_1.Service.create.mockResolvedValueOnce({
                id: '1',
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
            // Send a POST request to create service endpoint
            const response = await (0, supertest_1.default)(index_1.app).post('/api/services/create').send({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
            // Verify the response
            expect(response.status).toBe(201); // Expecting a 201 Created status
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe('Test Service');
            // Verify that Service.create was called with the correct parameters
            expect(services_1.Service.create).toHaveBeenCalledWith({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
        });
        it('should return an error if service creation fails', async () => {
            // Mock rejected value for Service.create
            services_1.Service.create.mockRejectedValueOnce(new Error('Service creation failed'));
            const response = await (0, supertest_1.default)(index_1.app).post('/api/services/create').send({
                title: 'Test Service',
                description: 'This is a test service',
                price: 100,
            });
            expect(response.status).toBe(400); // Correcting the expected status
            expect(response.body).toHaveProperty('error', 'Service creation failed');
        });
    });
});
