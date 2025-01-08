// src/test/testUserDelete.ts

import { sequelize } from '../config/database'; // Import the sequelize instance
import  User  from '../models/user'; // Import the User model
import { UserRole, UserTier } from '../types'; // Import enums for role and tier

describe('User Deletion', () => {
  beforeAll(async () => {
    // Sync the database before running the tests to ensure tables are created
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the sequelize connection after all tests
    await sequelize.close();
  });

  it('should delete a user', async () => {
    // Create a new user for testing deletion using the enums for role and tier
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: UserRole.User,  // Use UserRole enum for type safety
      tier: UserTier.Free,  // Use UserTier enum for default tier
      isVerified: false, // Default verification status
    });

    const userId = user.id; // Get the ID of the created user

    // Call the function to delete the user
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    // Assert that the user was deleted (the number of affected rows should be 1)
    expect(deletedUser).toBe(1); // 1 indicates that one row was affected

    // Check if the user is indeed deleted by trying to find them
    const deletedUserCheck = await User.findByPk(userId);
    expect(deletedUserCheck).toBeNull(); // Ensure no user with that ID exists
  });
});
