import app from '../index'; // Adjust the path to your app entry point
import request from 'supertest';

describe('Server Tests', () => {
  it('should respond to a GET request', async () => {
    const res = await request(app).get('/some-route');
    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await app.close(); // Ensure your app has a close method
  });
});
