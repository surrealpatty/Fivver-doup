const request = require('supertest');
const app = require('../src/server'); // Ensure this path points to your Express server

describe('Basic Test Suite', () => {
  it('should run the test file successfully', () => {
    console.log("Test file is running successfully!");
    // This is a simple assertion to ensure the test runs
    expect(true).toBe(true);
  });

  it('should respond with a message from the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Fiverr backend is running');
  });
});
