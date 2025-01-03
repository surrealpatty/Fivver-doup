import { sequelize } from '../config/database'; // Import the sequelize instance
import { app } from '../index'; // Import your Express app
import request from 'supertest';
import { Service } from '../models/services'; // Import your models
import { User } from '../models/user'; // Import your models

describe('Database connection and API routes', () => {
  // Async test to check if the database connection is successful
  test('should establish database connection', async () => {
    // Ensure the database connection is established before the test
    await sequelize.authenticate(); // This ensures the connection is successful
    console.log('Database connection established');
  });

  // Async test for an API route
  test('should return 200 OK on root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Fiverr backend is running');
  });

  // Test database synchronization and associations
  beforeAll(async () => {
    // Sync the models with the database before running tests
    await sequelize.sync({ force: true }); // 'force: true' to drop and re-create tables for a clean state
  });

  afterAll(async () => {
    // Clean up after tests
    await sequelize.close();  // Close the Sequelize connection after tests
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
