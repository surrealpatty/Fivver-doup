// Mock the sequelize import to avoid actual DB interaction during tests
jest.mock('../config/database', () => ({
    sequelize: { sync: jest.fn() },  // Mocking sequelize.sync() for testing
  }));
  
  // Mock the Service model's findAll method to avoid querying the database
  jest.mock('../models/services', () => ({
    Service: {
      findAll: jest.fn(),
    },
  }));
  
  import { createService, getServices } from '../controllers/serviceController';
  import { Service } from '../models/services';
  
  describe('Service Functions', () => {
    beforeAll(async () => {
      // Sync the Sequelize models (mocked, so it won't actually interact with DB)
      await sequelize.sync();
    });
  
    test('should create a new service', async () => {
      const req = {
        body: {
          title: 'Test Service',
          description: 'This is a test service',
          price: 100,
          category: 'Test Category',
        },
        user: {
          id: 1, // Mock the user ID
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the actual creation logic in your controller
      const createServiceMock = jest.fn().mockResolvedValue({
        title: 'Test Service',
        description: 'This is a test service',
        price: 100,
        category: 'Test Category',
      });
  
      // Call the createService controller
      await createServiceMock(req, res);
  
      // Check that the response's status and JSON method were called
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Test Service',
        description: 'This is a test service',
        price: 100,
        category: 'Test Category',
      }));
    });
  
    test('should retrieve all services', async () => {
      const req = {
        query: {
          userId: 1, // Mock the userId query parameter
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Service.findAll method to return a list of services
      Service.findAll.mockResolvedValue([
        {
          title: 'Service 1',
          description: 'Description 1',
          price: 50,
          category: 'Category 1',
        },
        {
          title: 'Service 2',
          description: 'Description 2',
          price: 75,
          category: 'Category 2',
        },
      ]);
  
      // Call the getServices controller
      await getServices(req, res);
  
      // Check that the response's status and JSON method were called
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({
          title: 'Service 1',
          description: 'Description 1',
          price: 50,
          category: 'Category 1',
        }),
        expect.objectContaining({
          title: 'Service 2',
          description: 'Description 2',
          price: 75,
          category: 'Category 2',
        }),
      ]));
    });
  });
  