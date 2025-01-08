import { User } from '../models/user'; // Ensure the path is correct
import { UserRole, UserTier } from '../types'; // Import enums for role and tier

// Example test for user creation
describe('User creation test', () => {
  it('should create a new user', async () => {
    const newUser = await User.create({
      username: 'testuser', // Test username
      email: 'testuser@example.com',  // Valid test email
      password: 'testpassword',  // Ensure this matches your model's requirements
      role: UserRole.User,             // Use UserRole enum for type safety
      tier: UserTier.Free,  // Use UserTier enum for default tier
      isVerified: false,        // Default verification status
    });

    // Check if the user was created successfully
    expect(newUser).toBeDefined();
    expect(newUser.username).toBe('testuser');
    expect(newUser.email).toBe('testuser@example.com');
  });
});
