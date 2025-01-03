import request from 'supertest';
import { app } from '../index'; // Ensure the path is correct for your app entry file
import jwt from 'jsonwebtoken';
// Helper function to generate a JWT token with a user role
const generateToken = (id, tier) => {
    return jwt.sign({ id, tier }, process.env.JWT_SECRET_KEY || 'your-secret-key', // Use the environment variable or a fallback
    { expiresIn: '1h' });
};
describe('Premium Service Access', () => {
    const paidToken = generateToken('1', 'paid'); // Token for a paid user
    const freeToken = generateToken('2', 'free'); // Token for a free user
    it('should allow paid users to access premium services', async () => {
        const response = await request(app)
            .get('/users/premium-service') // Ensure this route matches your actual implementation
            .set('Authorization', `Bearer ${paidToken}`); // Attach the paid user's token
        // Assertions for successful access
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny free users access to premium services', async () => {
        const response = await request(app)
            .get('/users/premium-service') // Ensure this route matches your actual implementation
            .set('Authorization', `Bearer ${freeToken}`); // Attach the free user's token
        // Assertions for access denial
        expect(response.status).toBe(403); // Forbidden status
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
describe('Basic Test Suite', () => {
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Simple test to verify the test file runs
    });
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/'); // Root endpoint
        expect(response.status).toBe(200); // Expect a status code of 200
        expect(response.text).toBe('Fiverr backend is running'); // Match the root endpoint response
    });
});
