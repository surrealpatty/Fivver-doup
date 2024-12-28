import sequelize from '../config/database'; // Correct, default import
import { User } from '../models/user'; // Correct named import
import { Service, ServiceCreationAttributes } from '../models/service'; // Correct path

// Function to test user and service models
const testModels = async () => {
  try {
    // Synchronize models with the database
    await sequelize.sync({ force: true });

    console.log('Database synced successfully.');

    // Create a test user with the missing 'isPaid' property
    const testUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'free',
      isPaid: false, // Added the 'isPaid' property here
    });

    console.log('Test User created:', testUser.toJSON());

    // Create a test service associated with the user
    const testServiceData: ServiceCreationAttributes = {
      title: 'Test Service',
      description: 'A description of the test service.',
      price: 99.99,
      userId: testUser.id, // Pass userId as a number (no .toString() here)
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
