import jwt from 'jsonwebtoken'; // Correct import of jsonwebtoken
import supertest from 'supertest';
import app from '../index'; // Adjust path if necessary

// Mock JWT token generation for paid and free users
const generateToken = (user, secretKey) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
};

// Mock user data
const mockPaidUser = {
    id: '1',
    email: 'paiduser@example.com',
    username: 'paiduser',
    tier: 'paid',
};
const mockFreeUser = {
    id: '2',
    email: 'freeuser@example.com',
    username: 'freeuser',
    tier: 'free',
};

// Mock the `jsonwebtoken` module at the top of the file
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockImplementation((token, secret) => {
        // Mock behavior based on the token (this is a simplified version for your case)
        if (token === 'validPaidUserToken') {
            return { id: '1', username: 'paiduser', tier: 'paid' };
        }
        if (token === 'validFreeUserToken') {
            return { id: '2', username: 'freeuser', tier: 'free' };
        }
        throw new Error('Invalid token');
    }),
}));

// Mock the `authenticateToken` middleware to inject user data
jest.mock('../middlewares/authenticateToken', () => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const user = jwt.verify(token, 'your-secret-key');
                req.user = user; // Attach the user to the request
            }
            catch (error) {
                req.user = undefined;
            }
        }
        next();
    };
});

// Mock process.exit to prevent tests from terminating
beforeAll(() => {
    jest.spyOn(process, 'exit').mockImplementation((code) => {
        throw new Error(`process.exit called with code: ${code}`);
    });
});

describe('GET /premium-service', () => {
    it('should allow access to paid users', async () => {
        const token = generateToken(mockPaidUser, 'your-secret-key');
        const response = await supertest(app)
            .get('/premium-service')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });

    it('should deny access to non-paid users', async () => {
        const token = generateToken(mockFreeUser, 'your-secret-key');
        const response = await supertest(app)
            .get('/premium-service')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });

    it('should return 401 if no token is provided', async () => {
        const response = await supertest(app).get('/premium-service');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized. Please log in.');
    });
});
