// src/test/orderController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _userController = require("../controllers/userController");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mock user payload for testing
const mockUser = {
    id: '123',
    email: 'test@example.com',
    username: 'testuser',
    role: 'user',
    tier: 'free',
    isVerified: false
};
describe('User Registration Controller', ()=>{
    it('should register a user successfully', async ()=>{
        // Mock the User.create method to return the mock user
        jest.spyOn(_user.default, 'create').mockResolvedValue({
            ...mockUser,
            createdAt: new Date().toISOString()
        });
        // Mock request and response objects
        const req = {
            body: {
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Call the controller
        await (0, _userController.registerUser)(req, res);
        // Assert the response
        expect(res.status).toHaveBeenCalledWith(201); // Expect 201 Created
        expect(res.json).toHaveBeenCalledWith({
            message: 'User registered successfully',
            user: {
                id: '123',
                email: 'test@example.com',
                username: 'testuser',
                role: 'user',
                tier: 'free',
                isVerified: false,
                createdAt: expect.any(String)
            },
            token: expect.any(String)
        });
    });
    it('should handle user registration failure due to existing email', async ()=>{
        // Mock User.findOne to simulate an existing user
        jest.spyOn(_user.default, 'findOne').mockResolvedValue(mockUser);
        // Mock request and response objects
        const req = {
            body: {
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Call the controller
        await (0, _userController.registerUser)(req, res);
        // Assert the response
        expect(res.status).toHaveBeenCalledWith(409); // Expect 409 Conflict
        expect(res.json).toHaveBeenCalledWith({
            message: 'User already exists with this email.'
        });
    });
    it('should handle missing required fields', async ()=>{
        // Mock request and response objects with missing fields
        const req = {
            body: {
                email: 'test@example.com',
                username: '',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Call the controller
        await (0, _userController.registerUser)(req, res);
        // Assert the response for missing fields
        expect(res.status).toHaveBeenCalledWith(400); // Expect 400 Bad Request
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email, username, and password are required.'
        });
    });
    it('should handle internal server errors gracefully', async ()=>{
        // Mock the User.create method to throw an error
        jest.spyOn(_user.default, 'create').mockRejectedValue(new Error('Database error'));
        // Mock request and response objects
        const req = {
            body: {
                email: 'test@example.com',
                username: 'testuser',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Call the controller
        await (0, _userController.registerUser)(req, res);
        // Assert the response for server error
        expect(res.status).toHaveBeenCalledWith(500); // Expect 500 Internal Server Error
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error during registration.'
        });
    });
});
