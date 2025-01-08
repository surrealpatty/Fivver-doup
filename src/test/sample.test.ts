// src/test/sample.test.ts

import { sequelize } from '../config/database'; // Correct import
import { v4 as uuidv4 } from 'uuid'; // UUID generator
import { Service } from '../models/services'; // Service model import
import  User  from '../models/user'; // User model import
import { UserRole, UserTier } from '../types/UserRoles'; // Import enums for role and tier

describe('Service Model Tests', () => {
  let user: User; // Declare a user variable to be used across tests

  beforeAll(async () => {
    // Ensure the test database (fivver_doup_test) is used and ready
    await sequelize.authenticate(); // Test connection

    // Sync the database and force recreation of tables in the test database
    await sequelize.sync({ force: true });

    // Create a test user before running the tests
    user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: UserRole.User, // Use the enum for role
      tier: UserTier.Free, // Use the enum for tier
      isVerified: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after running tests
    await sequelize.close();
  });

  it('should create a new service', async () => {
    // Define service data with the missing 'role' field
    const serviceData = {
      id: uuidv4(), // Generate a unique ID
      title: 'Test Service',
      description: 'A test service',
      price: 10,
      userId: user.id.toString(), // Ensure userId is a string (UUID format)
      role: UserRole.User, // Use the enum for role
    };

    // Create the service and save it in the database
    const service = await Service.create(serviceData);

    // Validate the created service's attributes
    expect(service.id).toBeDefined(); // Ensure the service has an ID
    expect(service.userId).toBe(user.id.toString()); // Ensure the userId matches (as string)
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(10);
    expect(service.role).toBe(UserRole.User); // Ensure the role is correctly set
  });
});
