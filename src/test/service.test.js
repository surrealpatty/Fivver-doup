const request = require('supertest');
const app = require('../app'); // Your Express app
const Service = require('../models/services'); // Service model

jest.mock('../models/services'); // Mock the Service model

describe('Service Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new service', async () => {
        Service.create.mockResolvedValue({ id: 1, name: 'Test Service', description: 'Service description' });

        const response = await request(app).post('/api/services').send({
            name: 'Test Service',
            description: 'Service description'
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Service');
    });

    test('should get all services', async () => {
        const mockServices = [{ id: 1, name: 'Service 1' }, { id: 2, name: 'Service 2' }];
        Service.findAll.mockResolvedValue(mockServices);

        const response = await request(app).get('/api/services');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockServices);
    });

    test('should get a specific service', async () => {
        const mockService = { id: 1, name: 'Service 1', description: 'Service description' };
        Service.findByPk.mockResolvedValue(mockService);

        const response = await request(app).get('/api/services/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Service 1');
    });

    // Add additional tests for update and delete service as needed
});
