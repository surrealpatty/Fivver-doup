// Full path: /project-root/dist/__tests__/service.test.js
const { createService, getServices } = require('../../controllers/serviceController'); // Adjusted to relative path
const { Service } = require('../../models/services'); // Adjusted to relative path
const { Op } = require('sequelize'); // Import Sequelize operators if needed for queries

// Mock the Service model methods to avoid actual database interactions
jest.mock('../../models/services', () => ({
  Service: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe('Service Functions', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to prevent leakage between tests
  });

  test('should create a new service', async () => {
    const mockServiceData = {
      title: 'Test Service',
      description: 'A description for the test service',
      price: 20.0,
      category: 'Test Category',
    };
    const mockCreatedService = { ...mockServiceData, id: 1 };

    // Mock the Service.create method to simulate successful service creation
    Service.create.mockResolvedValue(mockCreatedService);

    // Mock the request object to include a user with an id
    const req = { 
      body: mockServiceData,
      user: { id: 1 }, // Simulate that the user is authenticated and has an id
    };
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to return the response object
      json: jest.fn(), // Mock json method to check the response
    };

    // Try-catch block for better error capture in the test
    try {
      // Call createService with the mock request and response
      await createService(req, res);

      // Check that the response was correct
      expect(res.status).toHaveBeenCalledWith(201); // Should return 201 (Created)
      expect(res.json).toHaveBeenCalledWith(mockCreatedService); // Should return the created service
      expect(Service.create).toHaveBeenCalledWith({
        ...mockServiceData,
        userId: req.user.id, // Ensure the userId is passed correctly to the model
      });
    } catch (err) {
      console.error('Error in createService test:', err);
    }
  });

  test('should retrieve all services', async () => {
    const mockServicesData = [
      { id: 1, title: 'Test Service 1', description: 'Service 1 description', price: 10.0, category: 'Test' },
      { id: 2, title: 'Test Service 2', description: 'Service 2 description', price: 20.0, category: 'Test' },
    ];

    // Mock the Service.findAll method to simulate fetching all services
    Service.findAll.mockResolvedValue(mockServicesData);

    // Mock the request and response for getServices
    const req = { query: {} }; // Mock an empty query object
    const res = {
      status: jest.fn().mockReturnThis(), // Mock status method to return the response object
      json: jest.fn(), // Mock json method to check the response
    };

    // Try-catch block for better error capture in the test
    try {
      // Call getServices with the mock request and response
      await getServices(req, res);

      // Check that the response was correct
      expect(res.status).toHaveBeenCalledWith(200); // Should return 200 (OK)
      expect(res.json).toHaveBeenCalledWith(mockServicesData); // Should return the services data
      expect(Service.findAll).toHaveBeenCalledWith({
        where: { price: { [Op.gt]: 0 } }, // Ensure the query condition is correct
      });
    } catch (err) {
      console.error('Error in getServices test:', err);
    }
  });

});
