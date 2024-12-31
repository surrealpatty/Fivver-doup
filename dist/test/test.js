import request from 'supertest';
import { app } from '../index'; // Corrected import to use named import
import jwt from 'jsonwebtoken'; // For generating tokens
// Helper function to generate JWT token with a role
const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET_KEY || 'your-secret-key', { expiresIn: '1h' });
};
describe('Role-based Access', () => {
    const paidToken = generateToken('1', 'Paid'); // Generate token for paid user
    const freeToken = generateToken('2', 'Free'); // Generate token for free user
    // Test case for allowing paid users to access premium services
    it('should allow paid users to access premium services', async () => {
        const response = await request(app)
            .get('/services/premium') // Ensure the route path is correct
            .set('Authorization', `Bearer ${paidToken}`); // Send the paid user's token
        // Ensure the endpoint exists for paid users
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    // Test case for denying free users from accessing premium services
    it('should deny free users from accessing premium services', async () => {
        const response = await request(app)
            .get('/services/premium') // Ensure the route path is correct
            .set('Authorization', `Bearer ${freeToken}`); // Send the free user's token
        // Ensure the service denies access for free-tier users with proper authorization checks
        expect(response.status).toBe(403); // Forbidden
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
// Ensure the app uses a different port if needed for tests
describe('Basic Test Suite', () => {
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Simple test to verify the test file is running
    });
    // Test to check if the root endpoint is responding correctly
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/'); // Send a GET request to the root endpoint
        expect(response.statusCode).toBe(200); // Expect a status code of 200 (OK)
        expect(response.text).toBe('Fiverr backend is running'); // Expect the correct response message
    });
});
//# sourceMappingURL=test.js.map