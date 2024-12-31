// src/test/server.test.ts

import request from 'supertest'; // For making HTTP requests in tests
import app from '../index'; // Your Express app (adjust the path as necessary)

let server: any;

beforeAll(() => {
  // Start the server before any tests
  server = app.listen(3001, () => {
    console.log('Test server is running on port 3001');
  });
});

afterAll(async () => {
  // Close the server after all tests to release the port
  await server.close(() => {
    console.log('Test server closed.');
  });
});

describe('GET /', () => {
  it('should respond with 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
