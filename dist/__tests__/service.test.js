const { createService, getServices } = require('../../src/controllers/serviceController');
const Service = require('../../src/models/services'); // Correct path for import
const { Op } = require('sequelize');

// Mock the Service model methods to avoid actual database interactions
jest.mock('../../src/models/services', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
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

    const req = { 
      body: mockServiceData,
      user: { id: 1 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call createService with the mock request and response
    await createService(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCreatedService);
    expect(Service.create).toHaveBeenCalledWith({
      ...mockServiceData,
      userId: req.user.id,
    });
  });

  test('should retrieve all services', async () => {
    const mockServicesData = [
      { id: 1, title: 'Test Service 1', description: 'Service 1 description', price: 10.0, category: 'Test' },
      { id: 2, title: 'Test Service 2', description: 'Service 2 description', price: 20.0, category: 'Test' },
    ];

    // Mock the Service.findAll method to simulate fetching all services
    Service.findAll.mockResolvedValue(mockServicesData);

    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getServices with the mock request and response
    await getServices(req, res);

    // Updated expectation
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockServicesData);
    expect(Service.findAll).toHaveBeenCalled(); // Checks if findAll was called without specific argument
  });
});
