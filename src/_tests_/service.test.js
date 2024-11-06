// Import necessary functions
const { createService, getServices } = require('../src/controllers/serviceController'); // Adjust the path as needed

// Mock data
const mockService = {
    name: 'Test Service',
    description: 'Description for test service'
};

describe('Service Functions', () => {
    // Test for creating a service
    test('should create a new service', async () => {
        // Assuming createService function returns the created service with an id
        const result = await createService(mockService);

        // Check if the result contains the expected properties
        expect(result).toHaveProperty('id'); // Check if the service has an ID
        expect(result.name).toBe(mockService.name); // Check name
        expect(result.description).toBe(mockService.description); // Check description
    });

    // Test for retrieving all services
    test('should retrieve all services', async () => {
        // Assuming getServices returns an array of services
        const result = await getServices();

        // Ensure that the result is an array
        expect(Array.isArray(result)).toBe(true); // Check if the result is an array
        expect(result.length).toBeGreaterThan(0); // Ensure at least one service exists
        expect(result[0]).toHaveProperty('name'); // Check if the first service has a name property
    });
});
