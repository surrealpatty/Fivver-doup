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
const app_1 = require("../src/app"); // Adjusted the path relative to `src/test`
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';
// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
// Mock User model
jest.mock('../src/models/user', () => ({
    User: {
        findOne: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));
describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        User.findOne.mockResolvedValue(null); // Simulate user not found
        User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword',
        });
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/users/register')
            .send({
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
        User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });
        const mockToken = 'mock.jwt.token';
        jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/api/users/login')
            .send({
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
        User.findByPk.mockResolvedValue(mockUser);
        const response = yield (0, supertest_1.default)(app_1.app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    }));
    test('should update user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        User.update.mockResolvedValue([1]);
        const response = yield (0, supertest_1.default)(app_1.app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ username: 'updatedUser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    }));
    test('should delete user account', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        User.destroy.mockResolvedValue(1);
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }));
});
//# sourceMappingURL=user.test.js.map