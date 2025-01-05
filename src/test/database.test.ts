import 'reflect-metadata';  // Ensure reflect-metadata is imported for decorators to work
import { Sequelize } from 'sequelize-typescript';  // Correct import for Sequelize
import { app } from '../index';                     // Correct import for the app
import request from 'supertest';
import { sequelize } from '../config/database';  // Correct import for sequelize instance
import User from '../models/user';  // Import User model to ensure it's added to Sequelize
import Service from '../models/services';  // Import Service model to ensure it's added to Sequelize

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

describe('Database connection and API routes', () => {
  // Async test to check if the database connection is successful
  test('should establish database connection', async () => {
    // Ensure the database connection is established before the test
    await sequelize.authenticate();  // This ensures the connection is successful
    console.log('Database connection established');
  });

  // Async test for an API route
  test('should return 200 OK on root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Fiverr backend is running');
  });

  // Test if Service can be associated with User
  test('Service can be associated with User', () => {
    // Check if the 'belongsTo' association is defined for the Service model
    expect(Service.belongsTo).toBeDefined();
    // You can also check if it's associated correctly with User
    const association = Service.associations.User;
    expect(association).toBeDefined();
  });
});

// Clean up after tests
afterAll(async () => {
  await sequelize.close();  // Close the Sequelize connection after tests
});
