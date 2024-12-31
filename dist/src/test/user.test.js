"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("src/index"));
const _user = require("src/models/user");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mocking the User model and JWT methods
jest.mock('src/models/user', ()=>({
        User: {
            create: jest.fn(),
            findOne: jest.fn()
        }
    }));
jest.mock('jsonwebtoken', ()=>({
        verify: jest.fn()
    }));
describe('User Tests', ()=>{
    describe('POST /api/users/register', ()=>{
        it('should register a user successfully', async ()=>{
            // Mock resolved value for User.create
            _user.User.create.mockResolvedValueOnce({
                id: '1',
                email: 'test@example.com',
                username: 'testuser'
            });
            // Send a POST request to register endpoint
            const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            });
            // Verify the response
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('test@example.com');
            expect(_user.User.create).toHaveBeenCalledWith({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            });
        });
        it('should return an error if email is already taken', async ()=>{
            // Mock rejected value for User.create
            _user.User.create.mockRejectedValueOnce(new Error('Email already exists'));
            const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Email already exists');
        });
    });
    describe('Role-based Access Control', ()=>{
        beforeEach(()=>{
            // Mock JWT.verify to simulate token validation
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
        it('should allow access to paid users', async ()=>{
            const response = await (0, _supertest.default)(_index.default).get('/premium-content').set('Authorization', 'Bearer valid_paid_user_token');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Welcome to the premium content!');
        });
        it('should deny access to free users for premium content', async ()=>{
            const response = await (0, _supertest.default)(_index.default).get('/premium-content').set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('Access forbidden: Insufficient role');
        });
        it('should allow access to free content for all users', async ()=>{
            const response = await (0, _supertest.default)(_index.default).get('/free-content').set('Authorization', 'Bearer valid_free_user_token');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Welcome to the free content!');
        });
        it('should return an error for invalid tokens', async ()=>{
            const response = await (0, _supertest.default)(_index.default).get('/premium-content').set('Authorization', 'Bearer invalid_token');
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });
    });
});

//# sourceMappingURL=user.test.js.map