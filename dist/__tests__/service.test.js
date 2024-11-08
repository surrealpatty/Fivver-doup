const { createService, getServices } = require('../controllers/serviceController'); // Import the functions from serviceController
const { Service } = require('../models/services'); // Ensure you're importing the Service model correctly
const sequelize = require('../config/database').sequelize; // Import the sequelize instance for testing
const { Op } = require('sequelize'); // Import Sequelize operators if needed for queries

// Mock the Service model methods to avoid actual database interactions
jest.mock('../models/services', () => {
  return {
    Service: {
      create: jest.fn(),
      findAll: jest.fn(),
    },
  };
});

describe('Service Functions', () => {

  beforeAll(() => {
    // Setup any necessary test initialization, like database connection, if needed
  });

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
      user: { id: 1 } // Simulate that the user is authenticated and has an id
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; // Mock response object

    // Call createService with the mock request and response
    await createService(req, res);

    // Check that the response was correct
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreatedService);
    expect(Service.create).toHaveBeenCalledWith({
      ...mockServiceData,
      userId: req.user.id, // Make sure the userId is passed correctly
    });
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
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; // Mock the response object

    // Call getServices with the mock request and response
    await getServices(req, res);

    // Check that the response was correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockServicesData);
    expect(Service.findAll).toHaveBeenCalledWith({ where: { price: { [Op.gt]: 0 } } }); // Check if the query includes price condition
  });
});
