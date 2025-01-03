import http from 'http';
import { app } from '../index.js'; // Explicitly specify the file extension
import request from 'supertest';

describe('Server Tests', () => {
    let server;
    
    beforeAll(() => {
        // Create and start the server before tests
        server = http.createServer(app);
        server.listen(3000); // Start the server
    });
    
    it('should respond to a GET request', async () => {
        const res = await request(app).get('/some-route');
        expect(res.status).toBe(200);
    });
    
    afterAll(async () => {
        // Close the server after tests
        await new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
});
