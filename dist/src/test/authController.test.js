"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Adjust to the path where your Express app is initialized
describe('Authentication Controller', () => {
    it('should authenticate a user and return a token', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/auth/login') // Replace with your actual login route
            .send({
            email: 'user@example.com',
            password: 'correctPassword',
        });
        expect(response.status).toBe(200); // Adjust based on your expected status code
        expect(response.body.token).toBeDefined();
    });
    it('should return 401 for invalid credentials', async () => {
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/auth/login') // Replace with your actual login route
            .send({
            email: 'user@example.com',
            password: 'wrongPassword',
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });
});
