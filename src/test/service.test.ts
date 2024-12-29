import { sequelize } from '../config/database'; // Assuming sequelize is imported from your database config
import { createService, getServices } from '../services/serviceService'; // Adjust paths as necessary

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

  // Runs before any test starts
  beforeAll(async () => {
    // Initialize your database connection before running any tests
    await sequelize.authenticate();
    console.log('Database connection established');
  });

  // Runs after all tests have finished
  afterAll(async () => {
    // Close the database connection after tests finish
    await sequelize.close();
    console.log('Database connection closed');
  });

  // Runs after each test case
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to ensure clean test environment
  });

  // Test case for creating a service
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

  // Test case for retrieving all services
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
