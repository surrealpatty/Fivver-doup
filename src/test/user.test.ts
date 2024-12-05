import { sequelize } from '../config/database';  // Import your sequelize instance
import { User } from '../models/user'; // Adjust path as needed

describe('User Model Tests', () => {
  // Before all tests, ensure the database connection is established
  beforeAll(async () => {
    // Optional: Add logic to ensure the DB is synced or any required setup
    console.log('Setting up database connection...');
    await sequelize.authenticate();  // Ensure the Sequelize connection is authenticated
  });

  it('should create a new user', async () => {
    // Create a user instance
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123', // Adding required password field
    });

    // Ensure the user is defined and the necessary fields are present
    expect(user).toBeDefined();
    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
  });

  // Additional test cases can go here...

  // After all tests, close the Sequelize connection
  afterAll(async () => {
    console.log('Closing database connection...');
    await sequelize.close();  // Close the database connection after all tests
  });
});
