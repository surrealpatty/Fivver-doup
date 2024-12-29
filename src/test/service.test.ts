import { app } from '../index';  // Use named import
import http from 'http';  // Import http module to create a server instance
import { sequelize } from '../config/database'; // Import your Sequelize instance
import * as serviceService from '../services/serviceService'; // Import your service functions

jest.mock('../services/serviceService'); // Mocking the service module

let server: http.Server;  // Declare server variable
const port = process.env.PORT || 3002;  // Use a different port if 3001 is in use

describe('Service Functions', () => {
  // Runs before any test starts
  beforeAll(async () => {
    // Ensure the database connection is established before any tests run
    try {
      await sequelize.authenticate();
      console.log('Database connection established');
      // Create the server using http.createServer and specify the port
      server = http.createServer(app);
      await new Promise<void>((resolve) => server.listen(port, resolve)); // Use the dynamic port
      console.log(`Server started on port ${port}`);
    } catch (error) {
      console.error('Error establishing database connection or starting server:', error);
      throw error; // Rethrow the error to ensure the test suite fails
    }
  });

  // Runs after all tests have finished
  afterAll(async () => {
    // Ensure the server and database connection are closed after all tests have finished
    try {
      await server.close();  // Close the server
      console.log('Server closed successfully');
    } catch (error) {
      console.error('Error closing server:', error);
    }

    try {
      await sequelize.close();  // Close the database connection
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  });

  // Runs after each test case
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock data after each test
  });

  // Test case for creating a service
  test('should create a new service', async () => {
    const mockCreatedService = {
      serviceId: 1,
      title: 'Test Service',
      message: 'Service created successfully',
    };

    // Mock the createService function to return the mock service data
    (serviceService.createService as jest.Mock).mockResolvedValue(mockCreatedService);

    const result = await serviceService.createService({
      userId: '1',
      title: 'Test Service',
      description: 'Description for test service',
      price: 100,
    });

    // Verify the function was called once
    expect(serviceService.createService).toHaveBeenCalledTimes(1);
    // Check if the result matches the mock created service
    expect(result).toEqual(mockCreatedService);
    // Validate the service properties
    expect(result).toHaveProperty('serviceId');
    expect(result.title).toBe('Test Service');
    expect(result.message).toBe('Service created successfully');
  });

  // Test case for retrieving all services
  test('should retrieve all services', async () => {
    const mockServices = [
      { serviceId: 1, title: 'Service 1', description: 'Description for service 1' },
      { serviceId: 2, title: 'Service 2', description: 'Description for service 2' },
    ];

    // Mock the getServices function to return the mock services
    (serviceService.getServices as jest.Mock).mockResolvedValue(mockServices);

    const result = await serviceService.getServices();

    // Verify the function was called once
    expect(serviceService.getServices).toHaveBeenCalledTimes(1);
    // Check if the result matches the mock services
    expect(result).toEqual(mockServices);
  });
});
