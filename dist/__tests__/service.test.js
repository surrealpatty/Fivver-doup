// dist/__tests__/service.test.js

const { createService, getServices } = require('../controllers/serviceController'); // Import the functions from serviceController
const Service = require('../models/services'); // Import the Service model
const sequelize = require('../config/database').sequelize; // Import the sequelize instance for testing
const { Op } = require('sequelize'); // Import Sequelize operators if needed for queries

// Mock the Service model methods to avoid actual database interactions
jest.mock('../models/services'); // Mock the entire Service model

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

    // Call the createService function with the mock data
    const response = await createService(mockServiceData);

    // Check that the function returned the expected result
    expect(response).toEqual(mockCreatedService);
    expect(Service.create).toHaveBeenCalledWith(mockServiceData); // Ensure the Service.create method was called with correct data
  });

  test('should retrieve all services', async () => {
    const mockServices = [
      { id: 1, title: 'Test Service 1', description: 'Service 1 description', price: 10.0, category: 'Test' },
      { id: 2, title: 'Test Service 2', description: 'Service 2 description', price: 20.0, category: 'Test' },
    ];

    // Mock the Service.findAll method to simulate fetching all services
    Service.findAll.mockResolvedValue(mockServices);

    // Call the getServices function
    const response = await getServices();

    // Check that the function returned the expected result
    expect(response).toEqual(mockServices);
    expect(Service.findAll).toHaveBeenCalledWith({ where: { price: { [Op.gt]: 0 } } }); // Check if the query includes price condition
  });
});
