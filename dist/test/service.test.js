import { createService, getServices } from 'controllers/serviceController';
import { Service } from 'models/services'; // Assuming you're using Service model
import { sequelize } from 'config/database'; // If you need to interact with the database in tests

describe('Service Functions', () => {
  beforeAll(async () => {
    // Sync the Sequelize models (if you're interacting with DB in tests)
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

    // Call the createService controller
    await createService(req, res);

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
    Service.findAll = jest.fn().mockResolvedValue([
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
