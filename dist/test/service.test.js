import 'reflect-metadata';
import request from 'supertest';
import { app } from '../index.js'; // Include .js extension for import

// Example JWT tokens (replace with actual valid tokens for testing)
const paidToken = 'your-valid-paid-user-token';
const freeToken = 'your-valid-free-user-token';

describe('Role-based Access for Premium Service', () => {
    it('should allow paid users to access premium services', async () => {
        const response = await request(app)
            .get('/premium-service')
            .set('Authorization', `Bearer ${paidToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });

    it('should deny free users from accessing premium services', async () => {
        const response = await request(app)
            .get('/premium-service')
            .set('Authorization', `Bearer ${freeToken}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
