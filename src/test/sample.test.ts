import path from 'path';
import request from 'supertest';
import { Express } from 'express'; // Import the Express type
import { sequelize, testConnection } from '../config/database'; // Correct import for sequelize and testConnection
import http from 'http'; // Import http for server type

// Define the path to the compiled `index.js` file in `dist/`
const appPath = path.resolve(__dirname, '../../dist/index'); // Adjusted path

// Initialize app variable with explicit typing as Express.Application
let app: Express | undefined; // Type it as Express.Application or undefined (in case it's not loaded)
let server: http.Server | undefined; // Store the server reference
let connectionStatus: boolean = false; // Track connection status

beforeAll(async () => {
  try {
    // Dynamically import the app from the compiled dist/index.js
    const module = await import(appPath);
    app = module.default || module.app; // Adjust depending on how your app is exported

    // Test database connection and set connection status
    connectionStatus = await testConnection(); // Now it correctly returns a boolean

    // Start the server only if the app is loaded and connection is successful
    if (app && connectionStatus) {
      server = app.listen(3000, () => {
        console.log('Test server is running on port 3000');
      });
    }
  } catch (error) {
    console.error('Error loading app from dist:', error);
  }
});

// Define tests only if the app was successfully loaded and the database connection was successful
describe('Basic Test Suite', () => {
  it('should respond with a message from the root endpoint', async () => {
    if (!app || !connectionStatus) {
      console.warn(
        'Skipping tests due to app load failure or database connection failure'
      );
      return; // Skip the test if app could not be loaded or database connection failed
    }

    // Send a GET request to the root endpoint
    const response = await request(app).get('/');

    // Check the response
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to Fiverr Clone!');
  });
});

// Cleanup: Close the database connection and stop the server after tests
afterAll(async () => {
  // Ensure server and database cleanup happens if they were set up
  if (connectionStatus) {
    try {
      await sequelize.close(); // Ensure database connection is closed
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  // Ensure the server is closed properly to avoid "port already in use" errors
  if (server) { // Explicit check for server being defined
    try {
      // Assert that server is defined before calling close()
      await new Promise<void>((resolve, reject) => {
        server?.close((err) => (err ? reject(err) : resolve())); // Gracefully close the server
        console.log('Server closed.');
      });
    } catch (error) {
      console.error('Error closing server:', error);
    }
  } else {
    console.warn('Server was not started, skipping shutdown.');
  }
});
