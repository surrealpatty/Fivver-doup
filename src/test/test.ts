import request from 'supertest';
import { app } from '../index';  // Adjust path as needed
import { Service } from '../models/services';  // Ensure correct import path
import { sequelize } from '../config/database';  // Ensure sequelize instance is imported

jest.mock('../models/services', () => ({
  Service: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

beforeAll(async () => {
  await sequelize.sync({ force: true });  // Sync test database
});

describe('Service Tests', () => {
  it('should create a service successfully', async () => {
    // Mock resolved value for Service.create
    (Service.create as jest.Mock).mockResolvedValueOnce({
      id: '1',
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    });

    const response = await request(app).post('/api/services/create').send({
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Test Service');
    expect(Service.create).toHaveBeenCalledWith({
      title: 'Test Service',
      description: 'This is a test service',
      price: 100,
    });
  });
});
