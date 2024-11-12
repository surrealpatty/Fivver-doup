const request = require('supertest');
const path = require('path');
const { app } = require(path.resolve(__dirname, '../dist/index')); // Resolves absolute path

describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    });
});
