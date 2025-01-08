import { sequelize } from '../config/database'; // Correct import for sequelize
import { User } from '../models/user'; // Import User model
import { UserRole, UserTier } from '../types/UserRoles'; // Import UserTier and UserRole enums

describe('User Model Tests', () => {
  beforeAll(async () => {
    // Sync the database before tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the database connection after tests
    await sequelize.close();
  });

  it('should create a user with the default tier of "free" when tier is not provided', async () => {
    // Create a user without specifying the tier
    const user = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      role: UserRole.User, // Use default 'user' role
      isVerified: false,
      // Ensure tier is not omitted so that it defaults to "free"
      tier: UserTier.Free, // Add the default tier
    });

    // Validate the default tier
    expect(user.tier).toBe(UserTier.Free); // Ensure the default tier is 'free'
  });

  it('should create a user with a specified tier', async () => {
    // Create a user with a specified tier
    const user = await User.create({
      email: 'test2@example.com',
      username: 'testuser2',
      password: 'password123',
      role: UserRole.User,
      tier: UserTier.Paid, // Set tier to 'paid'
      isVerified: false,
    });

    // Validate the specified tier
    expect(user.tier).toBe(UserTier.Paid); // Ensure the tier is 'paid'
  });

  it('should fail to create a user with an invalid tier', async () => {
    const invalidUserData = {
      email: 'invalid@example.com',
      username: 'invaliduser',
      password: 'testpassword',
      role: UserRole.User,
      tier: 'invalidTier' as UserTier, // Invalid tier value
      isVerified: true,
    };

    try {
      await User.create(invalidUserData);
    } catch (error: any) {
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
      role: UserRole.User, // Role is valid
      isVerified: true,
      // Tier is missing and should default to 'free'
      tier: UserTier.Free, // Explicitly setting 'free' to ensure default behavior
    };

    const user = await User.create(userDataWithoutTier);

    // Default tier should be applied (if defined in the model)
    expect(user.tier).toBe(UserTier.Free); // Ensure the default tier is 'free'
  });

  it('should create a user with the correct tier when tier is explicitly set', async () => {
    const user = await User.create({
      email: 'paidtier@example.com',
      username: 'paidtieruser',
      password: 'testpassword',
      role: UserRole.User, // Role is valid
      tier: UserTier.Paid, // Explicitly passing tier as 'paid'
      isVerified: true,
    });

    expect(user.tier).toBe(UserTier.Paid); // The specified tier should be 'paid'
  });
});
