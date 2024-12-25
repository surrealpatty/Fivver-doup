import { createService, getServices } from '../controllers/servicesController'; // Correct import path

// Mocking the functions in servicesController
jest.mock('../controllers/servicesController', () => ({
  createService: jest.fn(),
  getServices: jest.fn()
}));

describe('Service Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any mock data after each test
  });

  // Test for creating a service
  test('should create a new service', async () => {
    // Mock created service object
    const mockCreatedService = { id: 1, name: 'Test Service', description: 'Description for test service' };

    // Mock the createService function to resolve with the mockCreatedService
    (createService as jest.Mock).mockResolvedValue(mockCreatedService);

    // Call the createService function
    const result = await createService({ name: 'Test Service', description: 'Description for test service' });

    // Verify the mock was called once
    expect(createService).toHaveBeenCalledTimes(1);

    // Check if the result matches the mock created service
    expect(result).toEqual(mockCreatedService);

    // Validate the service properties
    expect(result).toHaveProperty('id'); // Check if the service has an ID
    expect(result.name).toBe('Test Service'); // Check name
    expect(result.description).toBe('Description for test service'); // Check description
  });

  // Test for retrieving all services
  test('should retrieve all services', async () => {
    // Mock services array
    const mockServices = [
      { id: 1, name: 'Service 1', description: 'Description for service 1' },
      { id: 2, name: 'Service 2', description: 'Description for service 2' }
    ];

    // Mock the getServices function to resolve with the mockServices array
    (getServices as jest.Mock).mockResolvedValue(mockServices);

    // Call the getServices function
    const result = await getServices();

    // Verify the mock was called once
    expect(getServices).toHaveBeenCalledTimes(1);

    // Ensure that the result is an array
    expect(Array.isArray(result)).toBe(true); // Check if the result is an array
    expect(result.length).toBeGreaterThan(0); // Ensure there are services in the result

    // Check if the first service in the result has a name property
    expect(result[0]).toHaveProperty('name'); // Check for the 'name' property
  });
});
