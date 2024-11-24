import { registerUser, loginUser } from '../controllers/userController'; // Ensure correct import
import { sequelize } from '../config/database'; // Correct import path for sequelize
import  User from '../models/user'; // Named import and UserAttributes interface
import { UserAttributes } from '../models/user';
import Service from '../models/services'; // Correct import path for services model

console.log('User functions loaded successfully.');

// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Function to test user and service models
const testUserAndServiceModels = async () => {
  try {
    // Synchronize models with the database (use `force: true` cautiously for testing)
    await sequelize.sync({ force: true });

    // Test User Creation using UserAttributes type (plain object)
    const newUserData: UserAttributes = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user', // Include role field if it's required
    };

    // Use the UserAttributes type here, pass it to the create method
    const newUser = await User.create(newUserData);  // Correct usage of User.create with the UserAttributes type
    console.log('User created:', newUser.toJSON());

    // Test Service Creation (associated with the newly created user)
    const newService = await Service.create({
      title: 'Test Service',
      description: 'This is a test service description.',
      price: 100.0,
      category: 'Testing',
      userId: newUser.id, // Ensure the type of newUser.id matches the expected type of userId
    });
    console.log('Service created:', newService.toJSON());

    // Test User Registration via registerUser function
    const registrationResponse = await registerUser({
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
    console.log('User registered via registerUser:', registrationResponse);

    // Test User Login via loginUser function
    const loginResponse = await loginUser(newUser.email, newUser.password);
    console.log('User logged in via loginUser:', loginResponse);

  } catch (error) {
    console.error('Error testing models:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Call the test function
testUserAndServiceModels();
