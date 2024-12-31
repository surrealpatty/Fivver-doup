import request from 'supertest';
import app from '../index'; // Import the app instance
describe('API Root Route', () => {
    it('should return a 200 response with the correct message', async () => {
        // Send a GET request to the root endpoint
        const response = await request(app).get('/');
        // Assert the response status and message
        expect(response.status).toBe(200);
        expect(response.text).toBe('Welcome to Fiverr Clone!');
    });
});
