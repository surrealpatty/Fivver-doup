import  User  from './models/user'; // Correct import path for the User model
import { Service } from './models/services';

// Insert a test user
User.create({
  id: 'b6e01bc7-0f64-421b-b4dd-a8aa2b339b57',
  email: 'test@example.com',
  password: 'hashedPasswordHere', // Ensure you hash passwords before inserting
  username: 'testuser',
  tier: "free",  // Default tier should be "free"
  role: 'user',
  isVerified: false  // Correct property name (camelCase)
})
  .then((user) => {
    console.log('User created:', user);

    // Optionally, insert a test service for the created user
    return Service.create({
      title: 'Web Development',  // Correct property name
      description: 'Full-stack web development services.',
      price: 500,
      userId: user.id,  // Link the service to the created user
    });
  })
  .then((service) => {
    console.log('Service created:', service);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
