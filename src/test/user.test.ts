import { User } from 'src/models/user';  // Import the User model
import request from 'supertest';  // Assuming you're using supertest for API testing
import app from 'src/index';  // Your app setup

// Mocking the User model's create method
jest.mock('src/models/user', () => ({
    create: jest.fn(),
}));

describe('POST /api/users/register', () => {
    it('should register a user successfully', async () => {
        // Mock resolved value for the User.create method
        (User.create as jest.Mock).mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
        });

        // Send a POST request to the register endpoint
        const response = await request(app).post('/api/users/register').send({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
        });

        // Check if the response status is 201 (Created)
        expect(response.status).toBe(201);
        // Check if the response body contains the user id
        expect(response.body).toHaveProperty('id');
    });
});
