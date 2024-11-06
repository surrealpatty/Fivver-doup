const request = require('supertest');
const app = require('../app'); // Ensure this is the path to your Express app
const Service = require('../models/services'); // Ensure this is the path to your Service model

jest.mock('../models/services'); // Mock the Service model

describe('Service Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clears mock calls between tests
    });

    test('should create a new service', async () => {
        Service.create.mockResolvedValue({
            id: 1,
            name: 'Test Service',
            description: 'Service description',
        });

        const response = await request(app).post('/api/services').send({
            name: 'Test Service',
            description: 'Service description',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Service');
    });

    test('should get all services', async () => {
        const mockServices = [
            { id: 1, name: 'Service 1' },
            { id: 2, name: 'Service 2' },
        ];
        Service.findAll.mockResolvedValue(mockServices);

        const response = await request(app).get('/api/services');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockServices);
    });

    test('should get a specific service by ID', async () => {
        const mockService = {
            id: 1,
            name: 'Service 1',
            description: 'Service description',
        };
        Service.findByPk.mockResolvedValue(mockService);

        const response = await request(app).get('/api/services/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Service 1');
    });

    test('should update a specific service by ID', async () => {
        Service.update.mockResolvedValue([1]); // Mock response indicating one row updated

        const response = await request(app).put('/api/services/1').send({
            name: 'Updated Service Name',
            description: 'Updated description',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Service updated successfully');
    });

    test('should delete a specific service by ID', async () => {
        Service.destroy.mockResolvedValue(1); // Mock response indicating one row deleted

        const response = await request(app).delete('/api/services/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Service deleted successfully');
    });
});
