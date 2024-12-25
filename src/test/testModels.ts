import { sequelize } from '../config/database'; // Import sequelize instance
import User from '../models/user'; // Import User model
import { Service, ServiceCreationAttributes } from '../models/service'; // Correct path

// Function to test user and service models
const testModels = async () => {
  try {
    // Synchronize models with the database
    await sequelize.sync({ force: true });

    console.log('Database synced successfully.');

    // Create a test user
    const testUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'free',
    });

    console.log('Test User created:', testUser.toJSON());

    // Create a test service associated with the user
    const testServiceData: ServiceCreationAttributes = {
      title: 'Test Service',
      description: 'A description of the test service.',
      price: 99.99,
      userId: testUser.id.toString(), // Ensure userId is passed as a string
    };

    // Create the test service using the ServiceCreationAttributes type
    const testService = await Service.create(testServiceData);
    console.log('Test Service created:', testService.toJSON());
  } catch (error) {
    console.error('Error testing models:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Export the function using ES module syntax
export default testModels;

// Call the function to test models
testModels();
