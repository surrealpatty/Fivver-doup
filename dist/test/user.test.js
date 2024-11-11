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
const user_1 = require("../../src/models/user"); // Correct named import
const app_1 = require("../../src/app"); // Adjust if using a different path for your app
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Ensure jwt is imported
jest.mock('../../src/models/user'); // Mock the User model (adjust path if needed)
// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';
// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken');
describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    test('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.User.findOne.mockResolvedValue(null);
        user_1.User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword', // Simulating the hashed password
        });
        const response = yield (0, supertest_1.default)(app_1.app).post('/api/users/register').send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    }));
    test('should login a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash('testpassword', 10);
        user_1.User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });
        const mockToken = 'mock.jwt.token';
        jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
        const response = yield (0, supertest_1.default)(app_1.app).post('/api/users/login').send({
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', mockToken);
    }));
    test('should return user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        user_1.User.findByPk.mockResolvedValue(mockUser);
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    }));
    test('should update user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        user_1.User.update.mockResolvedValue([1]);
        const response = yield (0, supertest_1.default)(app_1.app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ username: 'updatedUser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    }));
    test('should delete user account', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        user_1.User.destroy.mockResolvedValue(1);
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }));
});
//# sourceMappingURL=user.test.js.map