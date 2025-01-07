import { User } from '../models/user';  // Correct import for User model
import { sequelize } from '../config/database';  // Correct import for sequelize
import { UserRole, UserTier } from '../types';  // Ensure correct imports for UserRole and UserTier

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
    // Create a user with a valid tier value
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'testpassword',  // In a real scenario, this should be hashed
      role: UserRole.User,  // Use enum value for role
      tier: UserTier.Paid,  // Use enum value for tier
      isVerified: true,
    };

    const user = await User.create(userData);

    // Assertions to validate that the user has been created successfully
    expect(user.id).toBeDefined();  // Ensure the ID is generated
    expect(user.tier).toBe(UserTier.Paid);  // Ensure the tier is set correctly
  });
});
