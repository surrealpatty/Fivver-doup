import { registerUser, loginUser } from '../controllers/userController'; // Ensure correct import
import { sequelize } from '../config/database'; // Correct import path for sequelize
import { User, UserCreationAttributes } from '../models/user'; // Correctly import UserCreationAttributes
import { Service } from '../models/services'; // Correct import path for services model
import { ServiceCreationAttributes } from '../models/services'; // Import the correct type for service creation
import { Optional } from 'sequelize';

console.log('User functions loaded successfully.');

// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Function to test user and service models
const testUserAndServiceModels = async () => {
  try {
    // Synchronize models with the database (use force: true cautiously for testing)
    await sequelize.sync({ force: true });

    // Test User Creation using UserAttributes type (plain object)
    const newUserData: UserCreationAttributes = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',  // Ensure password is part of UserAttributes
      role: 'free', // Set role to 'free' or 'paid'
    };

    // Use the User type here, passing it directly to the create method
    const newUser = await User.create(newUserData as Optional<User, 'id'>); // Casting to User (not UserAttributes)
    console.log('User created:', newUser.toJSON());

    // Test Service Creation (associated with the newly created user)
    const newServiceData: ServiceCreationAttributes = {
      title: 'Test Service',
      description: 'This is a test service description.',
      price: 100.0,
      userId: newUser.id, // Ensure the type of newUser.id matches the expected type of userId
    };

    // Create a new service with associated user
    const newService = await Service.create(newServiceData);
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
