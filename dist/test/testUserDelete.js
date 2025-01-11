"use strict";
// src/test/testUserDelete.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Import the sequelize instance
const user_1 = __importDefault(require("../models/user")); // Import the User model
const types_1 = require("../types"); // Import enums for role and tier
describe('User Deletion', () => {
    beforeAll(async () => {
        // Sync the database before running the tests to ensure tables are created
        await database_1.sequelize.sync({ force: true });
    });
    afterAll(async () => {
        // Close the sequelize connection after all tests
        await database_1.sequelize.close();
    });
    it('should delete a user', async () => {
        // Create a new user for testing deletion using the enums for role and tier
        const user = await user_1.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: types_1.UserRole.User, // Use UserRole enum for type safety
            tier: types_1.UserTier.Free, // Use UserTier enum for default tier
            isVerified: false, // Default verification status
        });
        const userId = user.id; // Get the ID of the created user
        // Call the function to delete the user
        const deletedUser = await user_1.default.destroy({
            where: { id: userId },
        });
        // Assert that the user was deleted (the number of affected rows should be 1)
        expect(deletedUser).toBe(1); // 1 indicates that one row was affected
        // Check if the user is indeed deleted by trying to find them
        const deletedUserCheck = await user_1.default.findByPk(userId);
        expect(deletedUserCheck).toBeNull(); // Ensure no user with that ID exists
    });
});
