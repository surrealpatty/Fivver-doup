import User from './models/user'; // Correct default import for the User model
import { Service } from './models/services'; // Correct named import for the Service model
import { UserTier, UserRole } from './types'; // Import the correct enums
import { InferCreationAttributes } from 'sequelize'; // Use InferCreationAttributes for type-safe creation

async function createTestUserAndService() {
  try {
    // Insert a test user with only the necessary attributes
    const userAttributes: Partial<InferCreationAttributes<User>> = {
      email: 'test@example.com',
      password: 'hashedPasswordHere', // Ensure you hash passwords before inserting
      username: 'testuser',
      tier: UserTier.Free, // Use the correct enum value for tier
      role: UserRole.User, // Use the correct enum value for role
      isVerified: false, // Correct property name (camelCase)
    };

    // Create the user using the attributes
    const createdUser = await User.create(userAttributes);

    console.log('User created:', createdUser);

    // Optionally, insert a test service for the created user
    const service = await Service.create({
      title: 'Web Development', // Service title
      description: 'Full-stack web development services.', // Service description
      price: 500, // Service price
      userId: createdUser.id.toString(), // Ensure userId is a string (convert if necessary)
      role: UserRole.User, // Add the role field here for the service (should be the same role)
    });

    console.log('Service created:', service); // Log service creation
  } catch (error) {
    console.error('Error:', error); // Catch and log any errors
  }
}

createTestUserAndService();
