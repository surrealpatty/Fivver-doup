const request = require('supertest');
const app = require('../dist/app'); // Ensure this points to the transpiled app
const Service = require('../dist/models/services'); // Ensure this points to the transpiled service model

jest.mock('../dist/models/services'); // Mock the Service model (correct path for transpiled file)

describe('Service Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clears mock calls between tests
    });

    test('should create a new service', async () => {
        // Mock the response for Service.create
        Service.create.mockResolvedValue({
            id: 1,
            name: 'Test Service',
            description: 'Service description',
        });

        const response = await request(app).post('/api/services').send({
            name: 'Test Service',
            description: 'Service description',
        });

        // Check if the response is as expected
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'Test Service');
        expect(response.body).toHaveProperty('description', 'Service description');
    });

    test('should get all services', async () => {
        // Mock the response for Service.findAll
        const mockServices = [
            { id: 1, name: 'Service 1' },
            { id: 2, name: 'Service 2' },
        ];
        Service.findAll.mockResolvedValue(mockServices);

        const response = await request(app).get('/api/services');

        // Check if the response matches the mocked services
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockServices);
    });

    test('should get a specific service by ID', async () => {
        // Mock the response for Service.findByPk
        const mockService = {
            id: 1,
            name: 'Service 1',
            description: 'Service description',
        };
        Service.findByPk.mockResolvedValue(mockService);

        const response = await request(app).get('/api/services/1');

        // Check if the response matches the mocked service
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Service 1');
        expect(response.body).toHaveProperty('description', 'Service description');
    });

    test('should update a specific service by ID', async () => {
        // Mock the response for Service.update
        Service.update.mockResolvedValue([1]); // Simulate that one row was updated

        const response = await request(app).put('/api/services/1').send({
            name: 'Updated Service Name',
            description: 'Updated description',
        });

        // Check if the service was updated successfully
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Service updated successfully');
    });

    test('should delete a specific service by ID', async () => {
        // Mock the response for Service.destroy
        Service.destroy.mockResolvedValue(1); // Simulate that one row was deleted

        const response = await request(app).delete('/api/services/1');

        // Check if the service was deleted successfully
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Service deleted successfully');
    });
});
