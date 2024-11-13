"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index"); // Adjust path to match the main app export
const user_1 = require("../models/user"); // Adjust path to your User model
// Set up a mock JWT secret for testing
process.env.JWT_SECRET = 'testsecret';
// Mock jwt and User model methods
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn(),
}));
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));
describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset all mocks after each test
    });
    test('should register a new user', async () => {
        // Mock findOne to simulate that the user does not already exist
        user_1.User.findOne.mockResolvedValue(null);
        // Mock create to simulate successful user creation
        user_1.User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword',
        });
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/register')
            .send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    test('should login a user and return a token', async () => {
        const hashedPassword = await bcryptjs_1.default.hash('testpassword', 10);
        // Mock findOne to simulate a user with the hashed password
        user_1.User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });
        const mockToken = 'mock.jwt.token';
        // Mock jwt.sign to return a test token
        jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
        const response = await (0, supertest_1.default)(index_1.app)
            .post('/api/users/login')
            .send({
            email: 'test@example.com',
            password: 'testpassword',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', mockToken);
    });
    test('should return user profile', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt.verify to decode the token and return a mock user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        // Mock findByPk to return a user profile
        user_1.User.findByPk.mockResolvedValue(mockUser);
        const response = await (0, supertest_1.default)(index_1.app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    test('should update user profile', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt.verify to decode the token and return a mock user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        // Mock update to simulate a successful update
        user_1.User.update.mockResolvedValue([1]); // Sequelize returns [1] on successful update
        const response = await (0, supertest_1.default)(index_1.app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ username: 'updatedUser' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });
    test('should delete user account', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock jwt.verify to decode the token and return a mock user id
        jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
        // Mock destroy to simulate user deletion
        user_1.User.destroy.mockResolvedValue(1); // Sequelize returns 1 on successful deletion
        const response = await (0, supertest_1.default)(index_1.app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3QvdXNlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQWdDO0FBQ2hDLHdEQUE4QjtBQUM5QixnRUFBK0I7QUFDL0Isb0NBQStCLENBQUUsMkNBQTJDO0FBQzVFLHlDQUFzQyxDQUFFLGlDQUFpQztBQUV6RSx1Q0FBdUM7QUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBRXRDLGtDQUFrQztBQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO0lBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDbEIsQ0FBQyxDQUFDLENBQUM7QUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDbkIsQ0FBQyxDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO0lBQy9CLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBRSxrQ0FBa0M7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDNUMsZ0VBQWdFO1FBQy9ELFdBQUksQ0FBQyxPQUFxQixDQUFDLGlCQUFp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