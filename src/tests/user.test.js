import request from 'supertest';
import app from '../../dist/index';  // Adjusted path to the transpiled app
import { initUser } from '../../dist/models/user';  // Adjusted path to transpiled user model
import { sequelize } from '../../dist/config/database';  // Assuming you have sequelize set up

// Reset the User table before each test
beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset DB to ensure clean slate before each test
    await initUser(); // Ensure User table is initialized before the tests
});

// Clear mocks between tests
afterEach(() => {
    jest.clearAllMocks(); // Clears mock calls between tests
});

// User registration and login test suite
describe('User Registration and Login', () => {

    it('should register a new user', async () => {
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        };

        const response = await request(app).post('/api/users/register').send(newUser);

        // Ensure successful registration
        expect(response.status).toBe(201); // 201 Created
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should not allow duplicate email during registration', async () => {
        // First, register the user
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
        expect(response.status).toBe(400); // 400 Bad Request for duplicate email
        expect(response.body).toHaveProperty('error', 'Email already in use'); // Adjust the error message as needed
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

        // Ensure the login is successful and returns a token
        expect(response.status).toBe(200); // 200 OK for successful login
        expect(response.body).toHaveProperty('token'); // Ensure the token is returned
    });

    it('should not login with incorrect credentials', async () => {
        const userData = {
            email: 'testuser@example.com',
            password: 'wrongpassword',
        };

        const response = await request(app).post('/api/users/login').send(userData);

        // Ensure login fails with incorrect credentials
        expect(response.status).toBe(401); // 401 Unauthorized for incorrect credentials
        expect(response.body).toHaveProperty('error', 'Invalid email or password'); // Adjust the error message as needed
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

        // Fetch the user profile using the token
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        // Ensure the user profile is returned correctly
        expect(response.status).toBe(200); // 200 OK for fetching the profile
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });
});
