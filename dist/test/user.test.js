"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index"); // Import your Express app
const database_1 = require("../config/database"); // Import the Sequelize instance for syncing
const user_1 = __importDefault(require("../models/user")); // Import the User model
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserRoles_1 = require("../types/UserRoles"); // Import the enums
describe('User Controller', () => {
    beforeAll(async () => {
        // Sync the Sequelize models with the database before tests run
        await database_1.sequelize.sync({ force: true }); // force: true will drop tables and recreate them
    });
    afterAll(async () => {
        // Close the Sequelize connection after tests are done
        await database_1.sequelize.close();
    });
    it('should create a new user', async () => {
        const userPayload = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: UserRoles_1.UserRole.User, // Use UserRole.User enum value
            isVerified: true, // Add the missing isVerified field
            tier: UserRoles_1.UserTier.Free, // Use UserTier.Free enum value
        };
        const response = await (0, supertest_1.default)(index_1.app).post('/api/users/signup').send(userPayload);
        // Ensure that the response status is 201 (Created)
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.user.username).toBe(userPayload.username);
        expect(response.body.token).toBeDefined(); // Check that the token is returned
        // Ensure password is not included in the response
        expect(response.body.user.password).toBeUndefined();
    });
    it('should not create a user if email already exists', async () => {
        // First, create a user
        await user_1.default.create({
            username: 'existinguser',
            email: 'existinguser@example.com',
            password: 'password123',
            role: UserRoles_1.UserRole.User, // Use UserRole.User enum value
            isVerified: true, // Add missing field
            tier: UserRoles_1.UserTier.Free, // Use UserTier.Free enum value
        });
        const userPayload = {
            username: 'testuser',
            email: 'existinguser@example.com', // Same email
            password: 'password123',
            role: UserRoles_1.UserRole.User, // Use UserRole.User enum value
            isVerified: true, // Add missing field
            tier: UserRoles_1.UserTier.Free, // Use UserTier.Free enum value
        };
        const response = await (0, supertest_1.default)(index_1.app).post('/api/users/signup').send(userPayload);
        // Expect a conflict (409) status due to duplicate email
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('User already exists with this email.');
    });
    it('should login a user with valid credentials', async () => {
        const password = 'password123';
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user with a hashed password
        const existingUser = await user_1.default.create({
            username: 'loginuser',
            email: 'loginuser@example.com',
            password: hashedPassword,
            role: UserRoles_1.UserRole.User, // Use UserRole.User enum value
            isVerified: true, // Add missing field
            tier: UserRoles_1.UserTier.Free, // Use UserTier.Free enum value
        });
        const loginPayload = {
            email: existingUser.email,
            password: 'password123', // Correct password
        };
        const response = await (0, supertest_1.default)(index_1.app).post('/api/users/login').send(loginPayload);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.token).toBeDefined(); // Check that the token is returned
    });
    it('should not login a user with invalid credentials', async () => {
        const loginPayload = {
            email: 'nonexistentuser@example.com',
            password: 'wrongpassword',
        };
        const response = await (0, supertest_1.default)(index_1.app).post('/api/users/login').send(loginPayload);
        expect(response.status).toBe(401); // Unauthorized status for invalid credentials
        expect(response.body.message).toBe('Invalid credentials');
    });
});
