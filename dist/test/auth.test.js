import request from 'supertest';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for JWT verification
import { app } from '../index'; // Corrected import to use named import
import { sequelize } from '../config/database'; // Correct import
import User from '../models/user'; // Import User model to ensure it's added to Sequelize
import { Service } from '../models/services'; // Import other models if needed
// Ensure the models are added and synced before running the tests
beforeAll(async () => {
    // Add models to Sequelize instance
    sequelize.addModels([User, Service]);
    // Sync the database (use force: true only if you want to reset the DB, set force: false to preserve data)
    await sequelize.sync({ force: false });
});
describe('Authentication Tests', () => {
    it('should authenticate and return a valid JWT token', async () => {
        // First, create a test user (for the purpose of the test)
        const userResponse = await request(app)
            .post('/register') // Assuming you have a route for user registration
            .send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser',
        });
        // Check if the user was successfully created
        expect(userResponse.status).toBe(201);
        // Example request to authenticate and get a token
        const response = await request(app) // Use supertest to make a request to the app
            .post('/login') // Adjust the route based on your actual login route
            .send({
            email: 'test@example.com',
            password: 'password123',
        });
        // Ensure the response includes a valid token
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        // Decode the token to verify its contents (if JWT is used)
        const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id');
        expect(decoded).toHaveProperty('email');
    });
});
