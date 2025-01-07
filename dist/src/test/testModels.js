"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Correct import for sequelize
const user_1 = require("../models/user"); // Import User model
const UserRoles_1 = require("../types/UserRoles"); // Import UserTier and UserRole enums
describe('User Model Tests', () => {
    beforeAll(async () => {
        // Sync the database before tests
        await database_1.sequelize.sync({ force: true });
    });
    afterAll(async () => {
        // Close the database connection after tests
        await database_1.sequelize.close();
    });
    it('should create a user with the default tier of "free" when tier is not provided', async () => {
        // Create a user without specifying the tier
        const user = await user_1.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            role: UserRoles_1.UserRole.User, // Use default 'user' role
            isVerified: false,
        });
        // Validate the default tier
        expect(user.tier).toBe(UserRoles_1.UserTier.Free); // Ensure the default tier is 'free'
    });
    it('should create a user with a specified tier', async () => {
        // Create a user with a specified tier
        const user = await user_1.User.create({
            email: 'test2@example.com',
            username: 'testuser2',
            password: 'password123',
            role: UserRoles_1.UserRole.User,
            tier: UserRoles_1.UserTier.Paid, // Set tier to 'paid'
            isVerified: false,
        });
        // Validate the specified tier
        expect(user.tier).toBe(UserRoles_1.UserTier.Paid); // Ensure the tier is 'paid'
    });
    it('should fail to create a user with an invalid tier', async () => {
        const invalidUserData = {
            email: 'invalid@example.com',
            username: 'invaliduser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User,
            tier: 'invalidTier', // Invalid tier value
            isVerified: true,
        };
        try {
            await user_1.User.create(invalidUserData);
        }
        catch (error) {
            // Ensure the error is related to Sequelize validation
            expect(error).toBeDefined();
            expect(error.name).toBe('SequelizeValidationError'); // Validate the error type
        }
    });
    it('should handle missing tier gracefully and use default tier of "free"', async () => {
        const userDataWithoutTier = {
            email: 'notier@example.com',
            username: 'notieruser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User, // Role is valid
            isVerified: true,
            // Tier is missing and should default to 'free'
        };
        const user = await user_1.User.create(userDataWithoutTier);
        // Default tier should be applied (if defined in the model)
        expect(user.tier).toBe(UserRoles_1.UserTier.Free); // Ensure the default tier is 'free'
    });
    it('should create a user with the correct tier when tier is explicitly set', async () => {
        const user = await user_1.User.create({
            email: 'paidtier@example.com',
            username: 'paidtieruser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User, // Role is valid
            tier: UserRoles_1.UserTier.Paid, // Explicitly passing tier as 'paid'
            isVerified: true,
        });
        expect(user.tier).toBe(UserRoles_1.UserTier.Paid); // The specified tier should be 'paid'
    });
});
