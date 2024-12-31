import request from 'supertest';
import jwt from 'jsonwebtoken';
import { sequelize } from '../config/database';
import app from '../index';
import User from '../models/user';
import Service from '../models/services';

let server: any;
let serviceId: number | null = null;

const paidToken = jwt.sign(
  { id: '1', role: 'Paid' },
  process.env.JWT_SECRET || 'default_secret',
  { expiresIn: '1h' }
);

beforeAll(async () => {
  await sequelize.sync({ force: true });
  server = app.listen(3000, () => {
    console.log('Test server running on port 3000');
  });
});

afterAll(async () => {
  await sequelize.close();
  server.close();
});

describe('Service Model Tests', () => {
  it('should correctly associate userId when creating a service', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'Free',
      tier: 'Tier1',
      isVerified: true,
    });

    const service = await Service.create({
      title: 'Test Service',
      description: 'Service Description',
      price: 10,
      userId: user.id,
    });

    expect(service.userId).toBe(user.id);
    serviceId = service.id;
  });

  it('should return 404 if the service is not found', async () => {
    const response = await request(app)
      .put('/services/9999') // Assuming service with ID 9999 does not exist
      .set('Authorization', `Bearer ${paidToken}`)
      .send({ title: 'Non-existent Service' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Service not found');
  });

  it('should return 400 if the price is invalid', async () => {
    if (!serviceId) {
      throw new Error('serviceId is not set');
    }

    // Test with invalid negative price
    const response = await request(app)
      .put(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${paidToken}`)
      .send({
        title: 'Invalid Service Title',
        description: 'Description with invalid price',
        price: -1, // Invalid price
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid price value');
  });

  it('should return 400 if price is a string', async () => {
    if (!serviceId) {
      throw new Error('serviceId is not set');
    }

    // Test with invalid string price
    const response = await request(app)
      .put(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${paidToken}`)
      .send({
        title: 'Invalid Service Title',
        description: 'Description with invalid price',
        price: 'invalid' as any, // Forcefully cast as a string
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid price value');
  });
});
