// src/test/userServiceTest.ts
import { sequelize } from '../config/database';
import { User } from '../models/user';
import { Service } from '../models/services';

describe('User and Service Models', () => {
  beforeAll(async () => {
    // Sync the database before running tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the connection after tests
    await sequelize.close();
  });

  it('should create a user', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'free',
    });

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('testuser@example.com');
  });

  it('should create a service for a user', async () => {
    // Create a user first
    const user = await User.create({
      username: 'testuser2',
      email: 'testuser2@example.com',
      password: 'password123',
      role: 'free',
    });

    // Create a service for that user
    const service = await Service.create({
      title: 'Test Service',
      description: 'This is a test service description.',
      price: 100.0,
      userId: user.id,
    });

    expect(service).toHaveProperty('id');
    expect(service.userId).toBe(user.id);
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(100.0);
  });
});
