"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _authController = require("../controllers/authController");
const _jwt = require("../utils/jwt");
const _user = require("../models/user");
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mocking dependencies
jest.mock('../utils/jwt', ()=>({
        generateToken: jest.fn()
    }));
jest.mock('../models/user', ()=>({
        User: {
            findOne: jest.fn()
        }
    }));
describe('Auth Controller Tests', ()=>{
    const mockRequest = (body)=>({
            body
        }); // This creates a mock request object
    const mockResponse = ()=>{
        const res = {}; // Mocking the response object
        res.json = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        return res;
    };
    describe('POST /auth/login', ()=>{
        it('should authenticate a user and return a token for valid credentials', async ()=>{
            const req = mockRequest({
                email: 'test@example.com',
                password: 'testpassword'
            });
            const res = mockResponse();
            // Mocking the user response from the database
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                password: await _bcryptjs.default.hash('testpassword', 10),
                tier: 'free',
                role: 'user'
            };
            // Mocking User.findOne to return the mock user
            _user.User.findOne.mockResolvedValue(mockUser);
            const mockToken = 'mock-token';
            _jwt.generateToken.mockReturnValue(mockToken);
            await (0, _authController.authenticateUser)(req, res);
            expect(_jwt.generateToken).toHaveBeenCalledWith({
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                tier: 'free',
                role: 'user'
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Authentication successful',
                token: mockToken
            });
        });
        it('should return 401 for invalid email', async ()=>{
            const req = mockRequest({
                email: 'wrong@example.com',
                password: 'wrongpassword'
            });
            const res = mockResponse();
            // Simulating user not found
            _user.User.findOne.mockResolvedValue(null);
            await (0, _authController.authenticateUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid credentials'
            });
        });
        it('should return 401 for incorrect password', async ()=>{
            const req = mockRequest({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
            const res = mockResponse();
            // Simulating user found, but password doesn't match
            const mockUser = {
                id: '1',
                email: 'test@example.com',
                username: 'testuser',
                password: await _bcryptjs.default.hash('testpassword', 10),
                tier: 'free',
                role: 'user'
            };
            _user.User.findOne.mockResolvedValue(mockUser);
            await (0, _authController.authenticateUser)(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invalid credentials'
            });
        });
    });
});
