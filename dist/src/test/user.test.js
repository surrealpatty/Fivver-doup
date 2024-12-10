// src/test/user.test.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
const _user = require("../models/user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
jest.mock('../models/user', ()=>({
        User: {
            create: jest.fn()
        }
    }));
describe('POST /register', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks(); // Clear mocks before each test to avoid conflicts
    });
    it('should register a new user successfully', async ()=>{
        // Mock the User.create method
        _user.User.create.mockResolvedValueOnce({
            id: '1',
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'password123'
        });
        // Send request to the /register route
        const res = await (0, _supertest.default)(_index.app).post('/register').send({
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'password123'
        });
        // Assertions
        expect(res.status).toBe(201); // Expect HTTP 201 (Created)
        expect(res.body.message).toBe('User registered successfully'); // Response message
        expect(res.body.user).toEqual({
            id: '1',
            email: 'newuser@example.com',
            username: 'newuser',
            password: 'password123'
        });
    });
    it('should return an error if email or username is already in use', async ()=>{
        // Mock the User.create method to simulate an existing user
        _user.User.create.mockRejectedValueOnce(new Error('User already exists'));
        const res = await (0, _supertest.default)(_index.app).post('/register').send({
            email: 'existinguser@example.com',
            username: 'existinguser',
            password: 'password123'
        });
        // Assertions
        expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
        expect(res.body.message).toBe('Email or Username already in use');
    });
    it('should return a validation error for invalid email', async ()=>{
        const res = await (0, _supertest.default)(_index.app).post('/register').send({
            email: 'invalid-email',
            username: 'newuser',
            password: 'password123'
        });
        // Assertions
        expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
        expect(res.body.errors[0].msg).toBe('Invalid email address'); // Validation error message
    });
    it('should return a validation error for missing username', async ()=>{
        const res = await (0, _supertest.default)(_index.app).post('/register').send({
            email: 'newuser@example.com',
            password: 'password123'
        });
        // Assertions
        expect(res.status).toBe(400); // Expect HTTP 400 (Bad Request)
        expect(res.body.errors[0].msg).toBe('Username must be between 3 and 20 characters'); // Username error
    });
});

//# sourceMappingURL=user.test.js.map