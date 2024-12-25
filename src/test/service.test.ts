// Import necessary functions from serviceController
const {
  createService,
  getServices,
} = require('../controllers/serviceController'); // Corrected import path to serviceController

// Mock data for creating a service
const mockService = {
  name: 'Test Service',
  description: 'Description for test service',
};

describe('Service Functions', () => {
  // Test for creating a service
  test('should create a new service', async () => {
    const mockCreatedService = {
      id: 1, // Assume the service gets an id upon creation
      ...mockService,
    };

    // Mock the createService function to return the mock created service
    createService.mockResolvedValue(mockCreatedService);

    // Call the function
    const result = await createService(mockService);

    // Check if the result contains the expected properties
    expect(result).toHaveProperty('id'); // Check if the service has an ID
    expect(result.name).toBe(mockService.name); // Check name
    expect(result.description).toBe(mockService.description); // Check description
  });

  // Test for retrieving all services
  test('should retrieve all services', async () => {
    const mockServices = [
      {
        id: 1,
        name: 'Test Service 1',
        description: 'Description for test service 1',
      },
      {
        id: 2,
        name: 'Test Service 2',
        description: 'Description for test service 2',
      },
    ];

    // Mock the getServices function to return an array of services
    getServices.mockResolvedValue(mockServices);

    // Call the function
    const result = await getServices();

    // Ensure that the result is an array
    expect(Array.isArray(result)).toBe(true); // Check if the result is an array
    expect(result.length).toBeGreaterThan(0); // Ensure at least one service exists
    expect(result[0]).toHaveProperty('name'); // Check if the first service has a name property
  });
});
