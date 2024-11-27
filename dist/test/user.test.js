var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import { app, server } from '../index'; // Import app and server from index.ts
import User from '../models/user'; // Named import
import { sequelize } from '../config/database'; // Sequelize instance
// Mocking User model and JWT
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'), // Mocked token for signing
    verify: jest.fn(() => ({ userId: 1 })), // Mocked decoded token
}));
// Set a global timeout for all tests
jest.setTimeout(10000); // Set timeout to 10 seconds for all tests
describe('User Controller Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Set up mocked responses for User model methods
        User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });
        User.create.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });
        User.findByPk.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        });
        User.update.mockResolvedValue([1]); // Sequelize update returns [affectedRows]
        User.destroy.mockResolvedValue(1); // Return affected rows count
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close Sequelize connection and Express server
        yield sequelize.close();
        server.close();
    }));
    test('should log in a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/users/login') // Login route
            .send({
            email: 'test@example.com',
            password: 'password123', // Mocked login credentials
        });
        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('token', 'mockedToken'); // Mocked token
    }));
    test('should update the user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .put('/users/profile') // Profile update route
            .set('Authorization', 'Bearer mockedToken') // Mocked Authorization header
            .send({
            email: 'updated@example.com',
            password: 'newpassword123',
        });
        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('id', 1); // Updated user ID
        expect(response.body).toHaveProperty('email', 'updated@example.com'); // Updated email
    }));
    test('should delete the user account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .delete('/users/profile') // Delete user route
            .set('Authorization', 'Bearer mockedToken'); // Mocked Authorization header
        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('message', 'User deleted successfully'); // Deletion message
    }));
});
