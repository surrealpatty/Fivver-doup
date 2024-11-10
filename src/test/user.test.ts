import request from 'supertest';
import app from '../../dist/index';  // Adjust to the path of your compiled app
import { initUser } from '../../dist/models/user';  // Adjust path for transpiled model
import sequelize from '../../dist/config/database';  // Import Sequelize instance

// Sync database before running tests
beforeAll(async () => {
    console.log('Initializing database...');
    await sequelize.sync({ force: true });  // Clear and sync the database for testing
});

// Clear mocks and data between tests
afterEach(() => {
    jest.clearAllMocks();  // Clears mock calls
});

// Close the database connection after all tests
afterAll(async () => {
    await sequelize.close();  // Avoid open handles warning
    console.log('Sequelize connection closed');
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

        // Expect successful registration
        expect(response.status).toBe(201); // 201 Created
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });

    it('should not allow duplicate email during registration', async () => {
        // Register user once
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

        // Expect 400 error for duplicate email
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Email already in use');
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

        // Now attempt login
        const response = await request(app).post('/api/users/login').send(userData);

        // Expect successful login
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login with incorrect credentials', async () => {
        const userData = {
            email: 'testuser@example.com',
            password: 'wrongpassword',
        };

        const response = await request(app).post('/api/users/login').send(userData);

        // Expect 401 Unauthorized
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid email or password');
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

        // Expect profile details to be returned
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('username', newUser.username);
        expect(response.body).toHaveProperty('email', newUser.email);
    });
});
