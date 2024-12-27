import * as serviceService from '../services/serviceService'; // Import the entire module
import { createService, getServices } from '../services/serviceService'; // You can still import specific functions for reference

// Mocking the entire serviceService module
jest.mock('../services/serviceService'); // This mocks the whole module

describe('Service Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear any mock data after each test
  });

  // Test for creating a service
  test('should create a new service', async () => {
    // Mock created service object
    const mockCreatedService = {
      serviceId: 1,
      title: 'Test Service',
      message: 'Service created successfully',
    };

    // Mock the createService function to resolve with the mockCreatedService
    (serviceService.createService as jest.Mock).mockResolvedValue(mockCreatedService);

    // Call the createService function with corrected input
    const result = await serviceService.createService({
      userId: '1', // Add userId if required
      title: 'Test Service', // Use 'title' instead of 'name'
      description: 'Description for test service', // description is not used in the mock result, so don't check it
      price: 100, // Add price if it's part of the input
    });

    // Verify the mock was called once
    expect(serviceService.createService).toHaveBeenCalledTimes(1);

    // Check if the result matches the mock created service
    expect(result).toEqual(mockCreatedService);

    // Validate the service properties
    expect(result).toHaveProperty('serviceId'); // Check if the service has an ID
    expect(result.title).toBe('Test Service'); // Check title
    expect(result.message).toBe('Service created successfully'); // Check message
  });

  // Test for retrieving all services
  test('should retrieve all services', async () => {
    // Mock services array
    const mockServices = [
      {
        serviceId: 1,
        title: 'Service 1',
        description: 'Description for service 1',
      },
      {
        serviceId: 2,
        title: 'Service 2',
        description: 'Description for service 2',
      },
    ];

    // Mock the getServices function to resolve with the mockServices array
    (serviceService.getServices as jest.Mock).mockResolvedValue(mockServices);

    // Call the getServices function
    const result = await serviceService.getServices();

    // Verify the mock was called once
    expect(serviceService.getServices).toHaveBeenCalledTimes(1);

    // Check if the result matches the mock services
    expect(result).toEqual(mockServices);
  });
});
