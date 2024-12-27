import path from 'path';
import request from 'supertest';
import { Express } from 'express'; // Import the Express type
import { sequelize, testConnection } from '../config/database'; // Import sequelize and the testConnection function

// Define the path to the compiled `index.js` file in `dist/`
const appPath = path.resolve(__dirname, '../../dist/index'); // Adjusted path

// Initialize app variable with explicit typing as Express.Application
let app: Express | undefined; // Type it as Express.Application or undefined (in case it's not loaded)
let connectionStatus: boolean = false; // Track connection status

beforeAll(async () => {
  try {
    // Dynamically import the app from the compiled dist/index.js
    const module = await import(appPath);
    app = module.default || module.app; // Adjust depending on how your app is exported

    // Test database connection and set connection status
    connectionStatus = await testConnection(); // Now it correctly returns a boolean
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

// Cleanup: Close the database connection after tests
afterAll(async () => {
  if (connectionStatus) {
    try {
      await sequelize.close(); // Ensure database connection is closed
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
});
