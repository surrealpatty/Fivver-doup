import { User } from './models/user';  // Correct import path for User model
import { Service } from './models/services'; // Correct named import for Service model

// Insert a test user
User.create({
  id: 'b6e01bc7-0f64-421b-b4dd-a8aa2b339b57',
  email: 'test@example.com',
  password: 'hashedPasswordHere',  // Ensure you hash passwords before inserting
  username: 'testuser',
  tier: "free",  // Default tier should be "free"
  role: 'user',  // Correct role field
  isVerified: false,  // Correct property name (camelCase)
})
  .then((user) => {
    console.log('User created:', user);

    // Optionally, insert a test service for the created user
    return Service.create({
      title: 'Web Development',  // Service title
      description: 'Full-stack web development services.',  // Service description
      price: 500,  // Service price
      userId: user.id,  // Link the service to the created user
      role: 'user',  // Add the role field here for the service
    });
  })
  .then((service) => {
    console.log('Service created:', service);  // Log service creation
  })
  .catch((error) => {
    console.error('Error:', error);  // Catch and log any errors
  });
