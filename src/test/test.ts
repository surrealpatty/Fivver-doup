import request from 'supertest'; // Import 'supertest' for testing HTTP requests
import { app } from '../index'; // Correctly import the named export 'app'
import  Service  from '../models/services';  // Adjust path as needed

// Describe a basic test suite
describe('Basic Test Suite', () => {
  // Test for ensuring the test file runs correctly
  it('should run the test file successfully', () => {
    console.log('Test file is running successfully!');
    expect(true).toBe(true); // Simple test to verify the test file is running
  });

  // Test to check if the root endpoint is responding correctly
  it('should respond with a message from the root endpoint', async () => {
    const response = await request(app).get('/'); // Send a GET request to the root endpoint
    expect(response.statusCode).toBe(200); // Expect a status code of 200 (OK)
    expect(response.text).toBe('Fiverr backend is running'); // Expect the correct response message
  });
});
