import 'reflect-metadata';  // Ensure this is the first import in the test file
import { Sequelize } from 'sequelize-typescript';  // Correct import for Sequelize
import { app } from '../index';  // Correct import for the app
import request from 'supertest';
import { sequelize } from '../config/database';  // Correct import for sequelize instance
import User from '../models/user';  // Import User model to ensure it's added to Sequelize
import Service from '../models/services';  // Ensure Service is properly imported

// Ensure the models are added and synced before running the tests
beforeAll(async () => {
  // Add models to Sequelize instance before associations
  sequelize.addModels([User, Service]);

  // Define the associations after models are loaded
  Service.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Service, { foreignKey: 'userId' });

  // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
  await sequelize.sync({ force: false });
});

describe('API Routes Tests', () => {
  test('should return 200 OK on root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Fiverr backend is running');  // Adjust this according to your route
  });

  test('should return 404 for undefined routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404);
  });
});

// Clean up after tests
afterAll(async () => {
  // Gracefully close the Sequelize connection after all tests
  await sequelize.close();
});
