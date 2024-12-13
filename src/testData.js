import { User } from './models/user'; // Adjust the import if the path is different
import { Service } from './models/service'; // Adjust the import if the path is different

// Insert a test user
User.create({
  id: 'b6e01bc7-0f64-421b-b4dd-a8aa2b339b57',
  email: 'test@example.com',
  password: 'hashedPasswordHere', // Ensure you hash passwords before inserting
  username: 'testuser',
  tier: 'free',
  role: 'user',
  is_verified: false
})
  .then((user) => {
    console.log('User created:', user);

    // Optionally, insert a test service for the created user
    return Service.create({
      name: 'Web Development',
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
