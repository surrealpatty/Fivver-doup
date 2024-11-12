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
  afterEach(() => {
    jest.clearAllMocks(); // Clears mock calls between tests
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

  // Other tests here...
});
