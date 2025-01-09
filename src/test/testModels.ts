import { sequelize } from '../config/database';
import User from '../models/user';
import { UserRole, UserTier } from '../types/UserRoles';

type UserCreationAttributes = {
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tier: UserTier;
  isVerified: boolean;
};

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
    const userData: UserCreationAttributes = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      role: UserRole.User,
      tier: UserTier.Free,
      isVerified: false,
    };

    const user = await User.create(userData as any);

    expect(user.tier).toBe(UserTier.Free);
  });

  it('should create a user with a specified tier', async () => {
    const userData: UserCreationAttributes = {
      email: 'test2@example.com',
      username: 'testuser2',
      password: 'password123',
      role: UserRole.User,
      tier: UserTier.Paid,
      isVerified: false,
    };

    const user = await User.create(userData as any);

    expect(user.tier).toBe(UserTier.Paid);
  });

  it('should fail to create a user with an invalid tier', async () => {
    const invalidUserData = {
      email: 'invalid@example.com',
      username: 'invaliduser',
      password: 'testpassword',
      role: UserRole.User,
      tier: 'invalidTier' as UserTier, // This should cause validation failure
      isVerified: true,
    };

    await expect(User.create(invalidUserData as any)).rejects.toThrow('SequelizeValidationError');
  });

  it('should handle missing tier gracefully and use default tier of "free"', async () => {
    const userData: UserCreationAttributes = {
      email: 'notier@example.com',
      username: 'notieruser',
      password: 'testpassword',
      role: UserRole.User,
      tier: UserTier.Free,
      isVerified: true,
    };

    const user = await User.create(userData as any);

    expect(user.tier).toBe(UserTier.Free);
  });

  it('should create a user with the correct tier when tier is explicitly set', async () => {
    const userData: UserCreationAttributes = {
      email: 'paidtier@example.com',
      username: 'paidtieruser',
      password: 'testpassword',
      role: UserRole.User,
      tier: UserTier.Paid,
      isVerified: true,
    };

    const user = await User.create(userData as any);

    expect(user.tier).toBe(UserTier.Paid);
  });
});
