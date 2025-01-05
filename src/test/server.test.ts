import http from 'http';
import { app } from '../index'; // Correct import path for the app entry point
import request from 'supertest';
import { Sequelize } from 'sequelize-typescript'; // Correct import for Sequelize
import { sequelize } from '../config/database'; // Import sequelize instance to close connection
import { Service } from '../models/services'; // Correct named import

describe('Server Tests', () => {
  let server: http.Server;

  beforeAll(async () => {
    // Ensure that the Service model is added to sequelize
    sequelize.addModels([Service]);

    // Sync the models with the database (use force: true if you want to reset the DB)
    await sequelize.sync({ force: false });

    // Create and start the server before tests
    server = http.createServer(app);
    server.listen(3000); // Start the server
  });

  it('should respond to a GET request', async () => {
    const res = await request(app).get('/some-route');  // Replace with an actual route for the test
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    // Close the Sequelize connection and the server after all tests
    await sequelize.close();  // Close the Sequelize connection after tests
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });
});
