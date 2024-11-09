const request = require('supertest'); // Ensure supertest is installed
const app = require('../dist/app'); // Import your Express app from transpiled code (adjust if needed)
const User = require('../src/models/user'); // Import the User model from the correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/models/user'); // Mock the User model (adjust path if needed)

// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';

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

        const response = await request(app).post('/api/users/login').send({
            email: 'test@example.com',
            password: 'testpassword',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Ensure token is returned

        // Optionally, decode and verify the JWT token
        const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
        expect(decoded).toHaveProperty('userId', 1);
    });

    test('should return user profile', async () => {
        // Mock the JWT verification process
        const mockToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
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
        const mockToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
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
        const mockToken = jwt.sign({ userId: 1 }, process.env.JWT_SECRET);
        // Mock User.destroy to simulate a successful account deletion
        User.destroy.mockResolvedValue(1); // Simulate user deletion

        const response = await request(app)
            .delete('/api/users/profile')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });
});
