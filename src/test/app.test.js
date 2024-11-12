const request = require('supertest');
const { app } = require('../dist/index'); // Adjust path if needed based on compiled file location

describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    });
});
