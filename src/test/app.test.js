const request = require('supertest');
const path = require('path');

// Ensure the path is correct, pointing to the compiled index.js in dist
let app;

try {
  // Dynamically require the compiled app from dist/index.js
  app = require(path.resolve(__dirname, '../dist/index')).app;
} catch (error) {
  console.error("Error loading app from dist:", error);
  process.exit(1);  // Exit the process if app cannot be loaded
}

describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    });
});
