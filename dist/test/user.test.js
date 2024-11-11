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
const supertest_1 = __importDefault(require("supertest")); // Ensure supertest is installed
const app_1 = __importDefault(require("../../dist/app")); // Import your Express app from transpiled code (adjust if needed)
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Ensure jwt is imported
// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';
// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken');
// Mock User model methods
jest.mock('../../src/models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));
describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    test('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock User.findOne to simulate that the user does not exist
        User.findOne.mockResolvedValue(null);
        // Mock User.create to simulate successful user creation
        User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword', // Simulating the hashed password
        });
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users/register').send({
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
        // Mock User.findOne to simulate user found with a hashed password
        User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });
        // Mocking JWT to avoid actual verification process
        const mockToken = 'mock.jwt.token';
        jsonwebtoken_1.default.sign = jest.fn().mockReturnValue(mockToken); // Mock JWT signing
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/users/login').send({
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', mockToken); // Ensure token is returned
    }));
    test('should return user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the JWT verification process
        const mockToken = 'mock.jwt.token';
        jsonwebtoken_1.default.verify = jest.fn().mockReturnValue({ userId: 1 }); // Mock JWT token verification
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        // Mock User.findByPk to return the mocked user
        User.findByPk.mockResolvedValue(mockUser);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    }));
    test('should update user profile', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        // Mock User.update to simulate a successful profile update
        User.update.mockResolvedValue([1]); // Simulate one row updated
        const response = yield (0, supertest_1.default)(app_1.default)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ username: 'updatedUser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    }));
    test('should delete user account', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockToken = 'mock.jwt.token';
        // Mock User.destroy to simulate a successful account deletion
        User.destroy.mockResolvedValue(1); // Simulate user deletion
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    }));
});
//# sourceMappingURL=user.test.js.map