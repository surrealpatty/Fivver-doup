"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _user = require("src/models/user");
const _index = require("src/index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mocking the User model and JWT methods for testing
jest.mock('../dist/models/user', ()=>({
        User: {
            create: jest.fn(),
            findOne: jest.fn()
        }
    }));
// Mocking JWT methods for testing
jest.mock('jsonwebtoken', ()=>({
        verify: jest.fn()
    }));
describe('User Tests', ()=>{
    // Test: Successful user registration
    it('should register a user successfully', async ()=>{
        // Mock resolved value for User.create
        _user.User.create.mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            isVerified: false,
            role: 'user',
            tier: 'free'
        });
        const response = await (0, _supertest.default)(_index.app).post('/api/users/register').send({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        // Verify the response
        expect(response.status).toBe(201); // Expecting a 201 Created status
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe('test@example.com');
        // Verify that User.create was called with the correct parameters
        expect(_user.User.create).toHaveBeenCalledWith({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            isVerified: false,
            role: 'user',
            tier: 'free'
        });
    });
    // Test: Registration failure due to missing required data
    it('should fail with missing data', async ()=>{
        const response = await (0, _supertest.default)(_index.app).post('/api/users/register').send({
            email: 'test@example.com'
        });
        expect(response.status).toBe(400); // Expecting a 400 Bad Request status
        expect(response.body).toHaveProperty('error', 'Password is required');
    });
    // Test: Error when email already exists
    it('should return an error if email is already taken', async ()=>{
        _user.User.create.mockRejectedValueOnce(new Error('Email already exists'));
        const response = await (0, _supertest.default)(_index.app).post('/api/users/register').send({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        expect(response.status).toBe(400); // Expecting a 400 Bad Request status
        expect(response.body).toHaveProperty('error', 'Email already exists');
    });
    // Test: Access control based on JWT roles (Example for premium content access)
    describe('Role-based Access Control', ()=>{
        beforeEach(()=>{
            _jsonwebtoken.default.verify.mockImplementation((token)=>{
                if (token === 'valid_paid_user_token') {
                    return {
                        role: 'paid'
                    };
                } else if (token === 'valid_free_user_token') {
                    return {
                        role: 'free'
                    };
                } else {
                    throw new Error('Invalid token');
                }
            });
        });
        // Test: Paid users can access premium content
        it('should allow access to premium content for paid users', async ()=>{
            const response = await (0, _supertest.default)(_index.app).get('/premium-content').set('Authorization', 'Bearer valid_paid_user_token');
            expect(response.status).toBe(200); // Expecting a 200 OK status
            expect(response.body.message).toBe('Welcome to the premium content!');
        });
        // Test: Free users cannot access premium content
        it('should deny access to free users for premium content', async ()=>{
            const response = await (0, _supertest.default)(_index.app).get('/premium-content').set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(403); // Expecting a 403 Forbidden status
            expect(response.body.message).toBe('Access forbidden: Insufficient role');
        });
        // Test: Free users can access free content
        it('should allow access to free content for all users', async ()=>{
            const response = await (0, _supertest.default)(_index.app).get('/free-content').set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(200); // Expecting a 200 OK status
            expect(response.body.message).toBe('Welcome to the free content!');
        });
        // Test: Invalid token access should result in an error
        it('should return an error for invalid tokens', async ()=>{
            const response = await (0, _supertest.default)(_index.app).get('/premium-content').set('Authorization', 'Bearer invalid_token');
            expect(response.status).toBe(401); // Expecting a 401 Unauthorized status
            expect(response.body.message).toBe('Unauthorized');
        });
    });
});
