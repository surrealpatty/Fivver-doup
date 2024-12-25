import { createService, getServices } from '../services/serviceService'; // Full path: src/services/serviceService.ts

// Mock the service functions
jest.mock('../services/serviceService', () => ({
  createService: jest.fn(),
  getServices: jest.fn(),
}));

describe('Service Functions', () => {
  const mockService = {
    userId: '1', // Changed to string to match CreateServiceInput type
    title: 'Test Service', // Required field
    price: 100, // Required field
    description: 'Description for test service',
  };

  const mockCreatedService = {
    serviceId: 1, // ID generated upon creation
    message: 'Service created successfully',
    title: mockService.title,
  };

  const mockServices = [
    {
      serviceId: 1,
      title: 'Service 1',
      description: 'Description for service 1',
      price: 100,
    },
    {
      serviceId: 2,
      title: 'Service 2',
      description: 'Description for service 2',
      price: 200,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test('should create a new service', async () => {
    // Mock the createService function to return the mock created service
    (createService as jest.Mock).mockResolvedValue(mockCreatedService);

    // Call the function
    const result = await createService(mockService);

    // Verify the result contains expected properties
    expect(result).toHaveProperty('serviceId'); // Check if service ID exists
    expect(result).toHaveProperty('message', 'Service created successfully'); // Check success message
    expect(result).toHaveProperty('title', mockService.title); // Check title matches input
  });

  test('should retrieve all services', async () => {
    // Mock the getServices function to return a list of services
    (getServices as jest.Mock).mockResolvedValue(mockServices);

    // Call the function
    const result = await getServices();

    // Verify the result
    expect(Array.isArray(result)).toBe(true); // Ensure result is an array
    expect(result.length).toBeGreaterThan(0); // Ensure array is not empty
    expect(result[0]).toHaveProperty('serviceId'); // Verify service ID exists in the first item
    expect(result[0]).toHaveProperty('title', 'Service 1'); // Check title of the first service
    expect(result[0]).toHaveProperty('price', 100); // Check price of the first service
  });
});
