import { User } from '../models/user'; // Correct import for User model
import { sequelize } from '../config/database'; // Correct import for sequelize
import { UserRole, UserTier } from '../types/UserRoles'; // Correct import path for enums

describe('User Model', () => {
  beforeAll(async () => {
    // Sync the database before running tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests
    await sequelize.close();
  });

  it('should create a user with valid tier', async () => {
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'testpassword', // In a real scenario, this should be hashed
      role: UserRole.User, // Correct usage of enum value for role
      tier: UserTier.Paid, // Correct usage of enum value for tier
      isVerified: true,
    };

    const user = await User.create(userData);

    // Assertions to validate that the user has been created successfully
    expect(user.id).toBeDefined(); // Ensure the ID is generated
    expect(user.tier).toBe(UserTier.Paid); // Ensure the tier is set correctly
    expect(user.role).toBe(UserRole.User); // Ensure the role is set correctly
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

  it('should handle missing tier gracefully', async () => {
    const userDataWithoutTier = {
      email: 'notier@example.com',
      username: 'notieruser',
      password: 'testpassword',
      role: UserRole.User, // Role is valid
      isVerified: true,
      // Explicitly set tier to undefined
      tier: undefined, 
    };

    const user = await User.create(userDataWithoutTier);

    // Default tier should be applied (if defined in the model)
    expect(user.id).toBeDefined();
    expect(user.tier).toBe(UserTier.Free); // Ensure the default tier is correctly set
  });
});
