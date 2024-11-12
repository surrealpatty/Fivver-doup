import request from 'supertest';
import app from '../dist/src/index';  // Adjusted to point to the transpiled app (entry point in dist/src)
import Service from '../dist/src/models/services';  // Adjusted path to transpiled services model

// Mock the Service model (correct path for transpiled file)
jest.mock('../dist/src/models/services', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

describe('Service Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();  // Clears mock calls between tests
    });

    test('should create a new service', async () => {
        // Mock the response for Service.create
        Service.create.mockResolvedValue({
            id: 1,
            title: 'Test Service',  // Changed to match model's field name
            description: 'Service description',
        });

        const response = await request(app)
            .post('/api/services')
            .send({
                title: 'Test Service',  // Changed to match model's field name
                description: 'Service description',
            });

        // Check if the response is as expected
        expect(response.status).toBe(201);  // Created status code
        expect(response.body).toHaveProperty('title', 'Test Service');
        expect(response.body).toHaveProperty('description', 'Service description');
    });

    test('should get all services', async () => {
        // Mock the response for Service.findAll
        const mockServices = [
            { id: 1, title: 'Service 1', description: 'Description 1' },
            { id: 2, title: 'Service 2', description: 'Description 2' },
        ];
        Service.findAll.mockResolvedValue(mockServices);

        const response = await request(app).get('/api/services');

        // Check if the response matches the mocked services
        expect(response.status).toBe(200);  // OK status code
        expect(response.body).toEqual(mockServices);  // Should match mocked services
    });

    test('should get a specific service by ID', async () => {
        // Mock the response for Service.findByPk
        const mockService = {
            id: 1,
            title: 'Service 1',
            description: 'Service description',
        };
        Service.findByPk.mockResolvedValue(mockService);

        const response = await request(app).get('/api/services/1');

        // Check if the response matches the mocked service
        expect(response.status).toBe(200);  // OK status code
        expect(response.body).toHaveProperty('title', 'Service 1');
        expect(response.body).toHaveProperty('description', 'Service description');
    });

    test('should update a specific service by ID', async () => {
        // Mock the response for Service.update
        Service.update.mockResolvedValue([1]);  // Simulate that one row was updated

        const response = await request(app).put('/api/services/1').send({
            title: 'Updated Service Name',
            description: 'Updated description',
        });

        // Check if the service was updated successfully
        expect(response.status).toBe(200);  // OK status code
        expect(response.body).toHaveProperty('message', 'Service updated successfully');
    });

    test('should delete a specific service by ID', async () => {
        // Mock the response for Service.destroy
        Service.destroy.mockResolvedValue(1);  // Simulate that one row was deleted

        const response = await request(app).delete('/api/services/1');

        // Check if the service was deleted successfully
        expect(response.status).toBe(200);  // OK status code
        expect(response.body).toHaveProperty('message', 'Service deleted successfully');
    });
});
