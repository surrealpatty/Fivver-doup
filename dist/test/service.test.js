import request from 'supertest';
import { app } from '../index'; // Import the app
// Example JWT tokens (use actual generated tokens for your tests)
const paidToken = 'your-valid-paid-user-token'; // Replace with actual paid user token
const freeToken = 'your-valid-free-user-token'; // Replace with actual free user token
describe('Role-based Access for Premium Service', () => {
    it('should allow paid users to access premium services', async () => {
        // Make a request to the /premium-service endpoint
        const response = await request(app)
            .get('/premium-service') // Ensure this is the correct route
            .set('Authorization', `Bearer ${paidToken}`); // Add the paid token in Authorization header
        // Assert that the response status is 200 and the message is correct
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny free users from accessing premium services', async () => {
        // Make a request to the /premium-service endpoint with a free token
        const response = await request(app)
            .get('/premium-service') // Ensure this is the correct route
            .set('Authorization', `Bearer ${freeToken}`); // Add the free token in Authorization header
        // Assert that the response status is 403 and the message is correct
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
//# sourceMappingURL=service.test.js.map