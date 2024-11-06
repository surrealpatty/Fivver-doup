import request from 'supertest';
import app from '../src/server'; // Adjust path if needed
import { User } from '../src/models/user'; // Ensure the path is correct
import { initUser } from '../src/models/user'; // Import the initUser function to reset DB

// Ensure the User table is reset before each test
beforeAll(async () => {
    await initUser(); // Resets the User table before tests
});

// Clear mocks between tests
afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
});

// User registration test
describe('User Registration and Login', () => {

    it('should register a new user', async () => {
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        };

        const response = await request(app).post('/api/users/register').send(newUser);

        // Ensure successful registration
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should not allow duplicate email during registration', async () => {
        // First register the user
        await request(app).post('/api/users/register').send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });

        // Try registering again with the same email
        const response = await request(app).post('/api/users/register').send({
            username: 'anotheruser',
            email: 'testuser@example.com',
            password: 'newpassword123',
        });

        // Ensure duplicate email is rejected
        expect(response.status).toBe(400); // Assuming you handle it with a 400 error
        expect(response.body).toHaveProperty('error');
    });

    it('should login a user', async () => {
        const userData = {
            email: 'testuser@example.com',
            password: 'password123',
        };

        // Register the user first
        await request(app).post('/api/users/register').send({
            username: 'testuser',
            email: userData.email,
            password: userData.password,
        });

        // Now login
        const response = await request(app).post('/api/users/login').send(userData);

        // Ensure the login is successful
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Assuming a JWT is returned
    });

    it('should not login with incorrect credentials', async () => {
        const userData = {
            email: 'testuser@example.com',
            password: 'wrongpassword',
        };

        const response = await request(app).post('/api/users/login').send(userData);

        // Ensure the login fails with incorrect credentials
        expect(response.status).toBe(401); // Assuming 401 Unauthorized for incorrect credentials
        expect(response.body).toHaveProperty('error');
    });

    it('should return the user profile for a logged-in user', async () => {
        // Register and login the user
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        };
        const registerResponse = await request(app).post('/api/users/register').send(newUser);
        const loginResponse = await request(app).post('/api/users/login').send({
            email: newUser.email,
            password: newUser.password,
        });

        const token = loginResponse.body.token;

        // Fetch the user profile
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        // Ensure the user profile is returned correctly
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });
});

