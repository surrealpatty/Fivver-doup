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
const index_1 = __importDefault(require("../../dist/index")); // Path to transpiled app
const user_1 = require("../../dist/models/user"); // Path to transpiled user model
const database_1 = require("../../dist/config/database"); // Sequelize instance
// Reset the User table before each test
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Initializing user table...');
    yield (0, user_1.initUser)(); // Ensure User table is initialized before the tests
    yield database_1.sequelize.sync({ force: false }); // Sync without dropping tables
}));
// Clear mocks between tests
afterEach(() => {
    jest.clearAllMocks(); // Clears mock calls between tests
});
// Close database connection after all tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close(); // Close the connection to avoid open handles
    console.log('Sequelize connection closed');
}));
// User registration and login test suite
describe('User Registration and Login', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send(newUser);
        // Ensure successful registration
        expect(response.status).toBe(201); // 201 Created
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    }));
    it('should not allow duplicate email during registration', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, register the user
        yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });
        // Try registering again with the same email
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send({
            username: 'anotheruser',
            email: 'testuser@example.com',
            password: 'newpassword123',
        });
        // Ensure duplicate email is rejected
        expect(response.status).toBe(400); // 400 Bad Request for duplicate email
        expect(response.body).toHaveProperty('error', 'Email already in use');
    }));
    it('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: 'testuser@example.com',
            password: 'password123',
        };
        // Register the user first
        yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send({
            username: 'testuser',
            email: userData.email,
            password: userData.password,
        });
        // Now login
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send(userData);
        // Ensure the login is successful and returns a token
        expect(response.status).toBe(200); // 200 OK for successful login
        expect(response.body).toHaveProperty('token'); // Ensure the token is returned
    }));
    it('should not login with incorrect credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: 'testuser@example.com',
            password: 'wrongpassword',
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send(userData);
        // Ensure login fails with incorrect credentials
        expect(response.status).toBe(401); // 401 Unauthorized for incorrect credentials
        expect(response.body).toHaveProperty('error', 'Invalid email or password');
    }));
    it('should return the user profile for a logged-in user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Register and login the user
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        };
        const registerResponse = yield (0, supertest_1.default)(index_1.default).post('/api/users/register').send(newUser);
        const loginResponse = yield (0, supertest_1.default)(index_1.default).post('/api/users/login').send({
            email: newUser.email,
            password: newUser.password,
        });
        const token = loginResponse.body.token;
        // Fetch the user profile using the token
        const response = yield (0, supertest_1.default)(index_1.default)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        // Ensure the user profile is returned correctly
        expect(response.status).toBe(200); // 200 OK for fetching the profile
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    }));
});
//# sourceMappingURL=user.test.js.map