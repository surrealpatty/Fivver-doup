import { User } from './models/user';  // Correct import path for User model
import { Service } from './models/services'; // Correct named import for Service model
import { UserTier, UserRole } from './types'; // Import the correct enums

// Insert a test user without specifying the 'id' field
User.create({
  email: 'test@example.com',
  password: 'hashedPasswordHere',  // Ensure you hash passwords before inserting
  username: 'testuser',
  tier: UserTier.Free,  // Use the correct enum value for tier
  role: UserRole.User,  // Use the correct enum value for role
  isVerified: false,  // Correct property name (camelCase)
})
  .then((user) => {
    console.log('User created:', user);

    // Optionally, insert a test service for the created user
    return Service.create({
      title: 'Web Development',  // Service title
      description: 'Full-stack web development services.',  // Service description
      price: 500,  // Service price
      userId: user.id.toString(),  // Ensure userId is a string (convert if necessary)
      role: UserRole.User,  // Add the role field here for the service (should be the same role)
    });
  })
  .then((service) => {
    console.log('Service created:', service);  // Log service creation
  })
  .catch((error) => {
    console.error('Error:', error);  // Catch and log any errors
  });
