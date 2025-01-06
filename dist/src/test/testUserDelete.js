"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Import the sequelize instance
const user_1 = require("../models/user"); // Import the User model
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
        // Create a new user for testing deletion
        const user = await user_1.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'user', // Add the required 'role' field
            tier: 'free', // Add the required 'tier' field
            isVerified: false, // Add the required 'isVerified' field
        });
        const userId = user.id; // Get the ID of the created user
        // Call the function to delete the user
        const deletedUser = await user_1.User.destroy({
            where: { id: userId },
        });
        // Assert that the user was deleted (the number of affected rows should be 1)
        expect(deletedUser).toBe(1); // 1 indicates that one row was affected
        // Check if the user is indeed deleted by trying to find them
        const deletedUserCheck = await user_1.User.findByPk(userId);
        expect(deletedUserCheck).toBeNull(); // Ensure no user with that ID exists
    });
});
