const request = require('supertest'); // Ensure supertest is installed
const app = require('../dist/app'); // Import your Express app from transpiled code (adjust if needed)
const User = require('../src/models/user'); // Import the User model from the correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Ensure jwt is imported
jest.mock('../src/models/user'); // Mock the User model (adjust path if needed)

// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';

// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken');

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    test('should register a new user', async () => {
        // Mock User.findOne to simulate that the user does not exist
        User.findOne.mockResolvedValue(null);
        // Mock User.create to simulate successful user creation
        User.create.mockResolvedValue({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            password: 'hashedpassword', // Simulating the hashed password
        });

        const response = await request(app).post('/api/users/register').send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    test('should login a user and return a token', async () => {
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        // Mock User.findOne to simulate user found with a hashed password
        User.findOne.mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: hashedPassword,
        });

        // Mocking JWT to avoid actual verification process
        const mockToken = 'mock.jwt.token';
        jwt.sign.mockReturnValue(mockToken); // Mock JWT signing

        const response = await request(app).post('/api/users/login').send({
            email: 'test@example.com',
            password: 'testpassword',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', mockToken); // Ensure token is returned
    });

    test('should return user profile', async () => {
        // Mock the JWT verification process
        const mockToken = 'mock.jwt.token';
        jwt.verify.mockReturnValue({ userId: 1 }); // Mock JWT token verification
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        };
        User.findByPk.mockResolvedValue(mockUser);

        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });

    test('should update user profile', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock User.update to simulate a successful profile update
        User.update.mockResolvedValue([1]); // Simulate one row updated

        const response = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ username: 'updatedUser' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Profile updated successfully');
    });

    test('should delete user account', async () => {
        const mockToken = 'mock.jwt.token';
        // Mock User.destroy to simulate a successful account deletion
        User.destroy.mockResolvedValue(1); // Simulate user deletion

        const response = await request(app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
});
