"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Import app and server from index.ts
const user_1 = __importDefault(require("../models/user")); // User model
const database_1 = require("../config/database"); // Sequelize instance
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
        user_1.default.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });
        user_1.default.create.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });
        user_1.default.findByPk.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        });
        user_1.default.update.mockResolvedValue([1]); // Sequelize update returns [affectedRows]
        user_1.default.destroy.mockResolvedValue(1); // Return affected rows count
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close Sequelize connection and Express server
        yield database_1.sequelize.close();
        index_1.server.close();
    }));
    test('should log in a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
            .post('/users/login') // Login route
            .send({
            email: 'test@example.com',
            password: 'password123', // Mocked login credentials
        });
        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('token', 'mockedToken'); // Mocked token
    }));
    test('should update the user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
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
        const response = yield (0, supertest_1.default)(index_1.app)
            .delete('/users/profile') // Delete user route
            .set('Authorization', 'Bearer mockedToken'); // Mocked Authorization header
        expect(response.status).toBe(200); // Expect HTTP 200 OK
        expect(response.body).toHaveProperty('message', 'User deleted successfully'); // Deletion message
    }));
});
