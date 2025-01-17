// C:\surrealsystems\Fivver-doup\src\test\test.ts

import request from 'supertest'; // Replace `require()` with `import`
import { app } from '../index'; // Import 'app' from the compiled JS file

describe('Basic Test Suite', () => {
  // Test for ensuring the test file runs correctly
  it('should run the test file successfully', () => {
    console.log('Test file is running successfully!');
    expect(true).toBe(true);
  });

  // Test to check if the root endpoint is responding correctly
  it('should respond with a message from the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200); // Check if status code is 200
    expect(response.text).toBe('Fiverr backend is running'); // Expect correct response message
  });
});
