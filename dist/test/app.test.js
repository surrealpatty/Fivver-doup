"use strict";
const request = require('supertest');
const path = require('path');
// Adjust path to point to the correct location of the compiled index.js in dist
const { app } = require(path.resolve(__dirname, '../dist/index')); // Ensure the path is correct
describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    });
});
//# sourceMappingURL=app.test.js.map