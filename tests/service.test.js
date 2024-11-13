import { Sequelize } from 'sequelize';
import request from 'supertest';

// Adjusted to point to the transpiled app (entry point in dist/src)
const app = require('../dist/src/index'); 
// Adjusted path to transpiled services model
const Service = require('../dist/models/services');

// Mock the Service model (correct path for transpiled file)
jest.mock('../dist/models/services', () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('Service Controller', () => {
  // Clear mock calls between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a new service', async () => {
    // Mock the response for Service.create
    Service.create.mockResolvedValue({
      id: 1,
      name: 'Test Service',
      description: 'Service description',
    });

    const response = await request(app).post('/api/services').send({
      name: 'Test Service',
      description: 'Service description',
    });

    // Check if the response is as expected
    expect(response.status).toBe(201);  // Created status code
    expect(response.body).toHaveProperty('name', 'Test Service');
    expect(response.body).toHaveProperty('description', 'Service description');
  });

  test('should retrieve all services', async () => {
    // Mock the response for Service.findAll
    Service.findAll.mockResolvedValue([
      {
        id: 1,
        name: 'Test Service',
        description: 'Service description',
      },
      {
        id: 2,
        name: 'Another Service',
        description: 'Another description',
      },
    ]);

    const response = await request(app).get('/api/services');

    // Check if the response is as expected
    expect(response.status).toBe(200);  // OK status code
    expect(response.body).toHaveLength(2); // Expecting two services
    expect(response.body[0]).toHaveProperty('name', 'Test Service');
    expect(response.body[1]).toHaveProperty('name', 'Another Service');
  });

  test('should update a service', async () => {
    // Mock the response for Service.update
    Service.update.mockResolvedValue([1]);  // Sequelize's update method returns [number of affected rows]

    const response = await request(app)
      .put('/api/services/1')
      .send({
        name: 'Updated Service',
        description: 'Updated description',
      });

    // Check if the response is as expected
    expect(response.status).toBe(200);  // OK status code
    expect(response.body).toHaveProperty('name', 'Updated Service');
    expect(response.body).toHaveProperty('description', 'Updated description');
  });

  test('should delete a service', async () => {
    // Mock the response for Service.destroy
    Service.destroy.mockResolvedValue(1);  // Sequelize's destroy method returns the number of deleted rows

    const response = await request(app).delete('/api/services/1');

    // Check if the response is as expected
    expect(response.status).toBe(200);  // OK status code
    expect(response.body).toHaveProperty('message', 'Service deleted successfully');
  });

  // Other tests for different scenarios can be added here...
});
