import request from 'supertest';
import app from '../src/index.js'; // Adjust the path to your app entry point
import sequelize from '../src/config/database.js';
import { init as initUser } from '../src/models/user.js';
import User from '../src/models/user.js'; // Ensure you import the User model for testing

beforeAll(async () => {
    await sequelize.authenticate();
    initUser(sequelize); // Initialize User model
    await sequelize.sync({ force: true }); // Reset the database before tests
});

afterAll(async () => {
    await sequelize.close();
});

describe('User Routes', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'User created successfully');
        expect(response.body.user).toHaveProperty('username', 'testuser');
        expect(response.body.user).toHaveProperty('email', 'test@example.com'); // Verify email is returned
    });

    it('should login an existing user', async () => {
        // First register the user
        await request(app)
            .post('/api/register')
            .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

        const response = await request(app)
            .post('/api/login')
            .send({ email: 'test@example.com', password: 'password123' });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 404 for non-existing user login', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ email: 'nonexistent@example.com', password: 'password123' });
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });
});
