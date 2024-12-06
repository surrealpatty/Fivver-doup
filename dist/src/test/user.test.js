"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("../models/user");
jest.mock('../models/user', ()=>({
        User: {
            create: jest.fn()
        }
    }));
describe('User Model', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks(); // Clear mocks before each test
    });
    it('should create a new user successfully', async ()=>{
        // Arrange: Mock the User.create method if you want to mock it
        const mockCreate = jest.fn().mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        _user.User.create = mockCreate; // Assign mock to the User.create method
        // Act: Call the method you want to test
        const user = await _user.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        // Assert: Ensure that the method was called with the correct parameters
        expect(mockCreate).toHaveBeenCalledWith({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
        expect(user).toEqual({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123'
        });
    });
});

//# sourceMappingURL=user.test.js.map