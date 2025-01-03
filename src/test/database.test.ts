import request from 'supertest';
import { app } from '../index';  // Correct import for the app

// Example JWT tokens (use actual generated tokens for your tests)
const paidToken = 'your-valid-paid-user-token'; // Replace with actual paid user token
const freeToken = 'your-valid-free-user-token'; // Replace with actual free user token

describe('Role-based Access for Premium Service', () => {

    // Test for allowing paid users to access the premium service
    it('should allow paid users to access premium services', async () => {
        const response = await request(app)
            .get('/premium-service')  // Check if this is the correct route
            .set('Authorization', `Bearer ${paidToken}`);  // Add the paid token to the Authorization header

        console.log('Response for paid user:', response.status, response.body); // Debugging line

        // Assert the response status and body message
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });

    // Test for denying free users from accessing premium services
    it('should deny free users from accessing premium services', async () => {
        const response = await request(app)
            .get('/premium-service')  // Check if this is the correct route
            .set('Authorization', `Bearer ${freeToken}`);  // Add the free token to the Authorization header

        console.log('Response for free user:', response.status, response.body); // Debugging line

        // Assert the response status and body message
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
