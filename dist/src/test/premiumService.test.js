"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _database = require("../config/database");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mock JWT token generation for paid and free users
const generateToken = (user, secretKey)=>{
    return _jsonwebtoken.default.sign(user, secretKey, {
        expiresIn: '1h'
    });
};
// Mock user data
const mockPaidUser = {
    id: '1',
    email: 'paiduser@example.com',
    username: 'paiduser',
    tier: 'paid'
};
const mockFreeUser = {
    id: '2',
    email: 'freeuser@example.com',
    username: 'freeuser',
    tier: 'free'
};
// Mock the `jsonwebtoken` module before any tests run
jest.mock('jsonwebtoken', ()=>({
        sign: jest.fn().mockImplementation((user, secret)=>{
            return `mocked-token-${user.id}`; // Mocked token generation
        }),
        verify: jest.fn().mockImplementation((token, secret)=>{
            // Mock behavior based on the token (this is a simplified version for your case)
            if (token === 'mocked-token-1') {
                return {
                    id: '1',
                    username: 'paiduser',
                    tier: 'paid'
                };
            }
            if (token === 'mocked-token-2') {
                return {
                    id: '2',
                    username: 'freeuser',
                    tier: 'free'
                };
            }
            throw new Error('Invalid token');
        })
    }));
// Mock the `authenticateToken` middleware to inject user data
jest.mock('../middlewares/authenticateToken', ()=>{
    return (req, res, next)=>{
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            try {
                const user = _jsonwebtoken.default.verify(token, 'your-secret-key');
                req.user = user; // Attach the user to the request
            } catch (error) {
                req.user = undefined;
            }
        }
        next();
    };
});
// Setup and teardown hooks for database connection
beforeAll(async ()=>{
    // Connect to the database before running the tests
    await _database.sequelize.authenticate();
    await _database.sequelize.sync({
        force: true
    }); // Ensure models are synced before tests
});
afterAll(async ()=>{
    // Close the database connection after tests
    await _database.sequelize.close();
});
describe('GET /premium-service', ()=>{
    it('should allow access to paid users', async ()=>{
        const token = generateToken(mockPaidUser, 'your-secret-key');
        const response = await (0, _supertest.default)(_index.default).get('/premium-service').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    it('should deny access to non-paid users', async ()=>{
        const token = generateToken(mockFreeUser, 'your-secret-key');
        const response = await (0, _supertest.default)(_index.default).get('/premium-service').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
    it('should return 401 if no token is provided', async ()=>{
        const response = await (0, _supertest.default)(_index.default).get('/premium-service');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized. Please log in.');
    });
});
