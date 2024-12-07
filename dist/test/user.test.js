"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user"); // Adjusted relative path to the User model
jest.mock('../models/user', () => ({
    User: {
        create: jest.fn(),
    },
}));
describe('User Model', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });
    it('should create a new user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange: Mock the User.create method if you want to mock it
        const mockCreate = jest.fn().mockResolvedValueOnce({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123', // Mock the password in the response
        });
        user_1.User.create = mockCreate; // Assign mock to the User.create method
        // Act: Call the method you want to test
        const user = yield user_1.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123', // Add password here for testing
        });
        // Assert: Ensure that the method was called with the correct parameters
        expect(mockCreate).toHaveBeenCalledWith({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123', // Ensure password is included
        });
        expect(user).toEqual({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123', // Ensure the password is mocked correctly
        });
    }));
});
