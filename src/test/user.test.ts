import { Sequelize } from 'sequelize';
import { User } from '../models/user';
import { sequelize } from '../config/database';

// Before all tests, synchronize the database
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Drops and recreates tables
});

// After each test, clear the database
afterEach(async () => {
  await User.destroy({ where: {} });
});

// After all tests, close the connection
afterAll(async () => {
  await sequelize.close();
});

describe('User Model', () => {
  it('should create a new user', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      subscriptionStatus: 'free',
    });

    expect(user).toBeDefined();
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
    expect(user.subscriptionStatus).toBe('free');
  });
});
