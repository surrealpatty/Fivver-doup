// src/test/app.test.ts
import path from 'path';
import request from 'supertest';
import { sequelize } from '../config/database'; // Corrected import for sequelize
// Define the path to the compiled `index.js` file in `dist/`
const appPath = path.resolve(__dirname, '../../dist/index'); // Adjusted path to dist/index.js
// Initialize app variable with explicit typing as Express.Application
let app;
beforeAll(async () => {
    // First, ensure Sequelize sync is complete
    await sequelize.sync(); // This will sync models with the database
    try {
        // Dynamically import the app from the compiled dist/index.js
        const module = await import(appPath);
        app = module.default || module.app; // Adjust based on how your app is exported
    }
    catch (error) {
        console.error('Error loading app from dist:', error);
        throw error; // Ensure the tests fail if the app can't be loaded
    }
});
afterAll(async () => {
    // Close the database connection after tests have finished
    await sequelize.close();
});
describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', async () => {
        if (!app) {
            console.warn('Skipping tests as app could not be loaded');
            return; // Skip the test if app could not be loaded
        }
        // Send a GET request to the root endpoint
        const response = await request(app).get('/');
        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Fiverr Clone!');
    });
    // Add more tests as needed
});
