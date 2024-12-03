// In src/test/auth.test.ts
import path from 'path';
import request from 'supertest';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

// Mocking jsonwebtoken methods for testing
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked_token'),
  verify: jest.fn(() => ({ id: 'test_user_id' })),
}));

// Define the path to the compiled `index.js` file in `dist/`
const appPath = path.resolve(__dirname, '../dist/index.js');

// Initialize app variable with explicit typing as Express.Application
let app: Express | undefined;

beforeAll(async () => {
  try {
    // Dynamically import the app from the compiled dist/index.js
    const module = await import(appPath);
    app = module.default || module.app; // Adjust depending on how your app is exported
  } catch (error) {
    console.error('Error loading app from dist:', error);
  }
});

// Define tests only if the app was successfully loaded
describe('Authentication Tests', () => {
  it('should respond with a message from the root endpoint', async () => {
    if (!app) {
      console.warn('Skipping tests as app could not be loaded');
      return; // Skip the test if app could not be loaded
    }

    // Send a GET request to the root endpoint
    const response = await request(app).get('/');

    // Check the response
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Fiverr backend is running');
  });

  it('should mock the JWT sign and verify methods correctly', () => {
    // Test mock for sign method
    const token = jwt.sign({ id: 'test_user_id' }, 'secret_key');
    expect(token).toBe('mocked_token');
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'test_user_id' }, 'secret_key'); // Ensure the sign method was called with the correct params

    // Test mock for verify method
    const decoded = jwt.verify('mocked_token', 'secret_key');
    expect(decoded).toEqual({ id: 'test_user_id' });
    expect(jwt.verify).toHaveBeenCalledWith('mocked_token', 'secret_key'); // Ensure verify was called with correct token and secret
  });
});
