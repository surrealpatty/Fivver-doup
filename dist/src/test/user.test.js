"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Set Jest timeout to 30 seconds for this test file
jest.setTimeout(30000);
// Mock the User model to simulate database interactions for testing
jest.mock('../models/user', ()=>({
        User: {
            create: jest.fn()
        }
    }));
describe('POST /api/users/register', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks(); // Clear all mocks before each test
    });
    it('should register a user successfully', async ()=>{
        // Mock successful user creation
        _user.default.create.mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        const response = await (0, _supertest.default)(_index.default).post('/api/users/register') // Correct route path
        .send({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        // Assertions
        expect(response.status).toBe(201); // Expect status 201 Created
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.user).toEqual({
            id: '1',
            email: 'test@example.com',
            username: 'testuser'
        });
    });
    it('should return an error if email is missing', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
            username: 'testuser',
            password: 'password123'
        });
        // Assertions
        expect(response.status).toBe(400); // Bad request due to missing email
        expect(response.body.errors[0].msg).toBe('Email is required');
    });
    it('should return an error if username is missing', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
            email: 'test@example.com',
            password: 'password123'
        });
        // Assertions
        expect(response.status).toBe(400); // Bad request due to missing username
        expect(response.body.errors[0].msg).toBe('Username is required');
    });
    it('should return an error if password is too short', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
            email: 'test@example.com',
            username: 'testuser',
            password: '123'
        });
        // Assertions
        expect(response.status).toBe(400); // Bad request due to short password
        expect(response.body.errors[0].msg).toBe('Password must be at least 6 characters');
    });
    it('should return an error if email is already in use', async ()=>{
        // Mock rejection for existing email/username
        _user.default.create.mockRejectedValueOnce(new Error('Email or Username already in use'));
        const response = await (0, _supertest.default)(_index.default).post('/api/users/register').send({
            email: 'existinguser@example.com',
            username: 'existinguser',
            password: 'password123'
        });
        // Assertions
        expect(response.status).toBe(400); // Bad request due to existing email/username
        expect(response.body.message).toBe('Email or Username already in use');
    });
});

//# sourceMappingURL=user.test.js.map