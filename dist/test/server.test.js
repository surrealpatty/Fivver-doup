// src/test/server.test.ts
import http from 'http';
import { app } from '../index.js'; // Adjust the path to your app entry point with .js extension
import request from 'supertest';
import { sequelize } from '../config/database.js'; // Import sequelize instance to close connection

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
        // Close the Sequelize connection and the server after all tests
        await sequelize.close(); // Close the Sequelize connection after tests
        await new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
});
