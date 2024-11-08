"use strict";
const request = require('supertest'); // Make sure to install supertest
const app = require('../index'); // Assuming index.js is the entry point
const User = require('../models/user'); // User model
const bcrypt = require('bcrypt');
jest.mock('../models/user'); // Mock the User model
describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    test('should register a new user', async () => {
        // Mock the User.findOne method to return null (user does not exist)
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedpassword' });
        const response = await request(app).post('/api/users/register').send({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    test('should login a user', async () => {
        const hashedPassword = await bcrypt.hash('testpassword', 10);
        User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com', password: hashedPassword });
        const response = await request(app).post('/api/users/login').send({
            email: 'test@example.com',
            password: 'testpassword'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Ensure token is returned
    });
    test('should return user profile', async () => {
        const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedpassword' };
        User.findByPk.mockResolvedValue(mockUser);
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', 'Bearer mocktoken'); // Mock token here
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', 'testuser');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    });
    // Add additional tests for updateUserProfile and deleteUser as needed
});
