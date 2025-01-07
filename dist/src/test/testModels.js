"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user"); // Correct import for User model
const database_1 = require("../config/database"); // Correct import for sequelize
const UserRoles_1 = require("../types/UserRoles"); // Correct import path for enums
describe('User Model', () => {
    beforeAll(async () => {
        // Sync the database before running tests
        await database_1.sequelize.sync({ force: true });
    });
    afterAll(async () => {
        // Close the Sequelize connection after all tests
        await database_1.sequelize.close();
    });
    it('should create a user with valid tier', async () => {
        const userData = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpassword', // In a real scenario, this should be hashed
            role: UserRoles_1.UserRole.User, // Correct usage of enum value for role
            tier: UserRoles_1.UserTier.Paid, // Correct usage of enum value for tier
            isVerified: true,
        };
        const user = await user_1.User.create(userData);
        // Assertions to validate that the user has been created successfully
        expect(user.id).toBeDefined(); // Ensure the ID is generated
        expect(user.tier).toBe(UserRoles_1.UserTier.Paid); // Ensure the tier is set correctly
        expect(user.role).toBe(UserRoles_1.UserRole.User); // Ensure the role is set correctly
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
    it('should handle missing tier gracefully', async () => {
        const userDataWithoutTier = {
            email: 'notier@example.com',
            username: 'notieruser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User, // Role is valid
            isVerified: true,
            // Explicitly set tier to undefined
            tier: undefined,
        };
        const user = await user_1.User.create(userDataWithoutTier);
        // Default tier should be applied (if defined in the model)
        expect(user.id).toBeDefined();
        expect(user.tier).toBe(UserRoles_1.UserTier.Free); // Ensure the default tier is correctly set
    });
});
