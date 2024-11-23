// Import necessary modules
const { registerUser, loginUser } = require('../src/controllers/userController');
const sequelize = require('../src/config/database'); // Import sequelize (don't redeclare it)
const User = require('../src/models/user'); // Import User model
const Service = require('../src/models/services'); // Import Service model

console.log('User functions loaded successfully.');

// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Function to test user and service models
const testUserAndServiceModels = async () => {
  try {
    // Synchronize models with the database (use `force: true` cautiously for testing)
    await sequelize.sync({ force: true });

    // Test User Creation
    const newUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    console.log('User created:', newUser.toJSON());

    // Test Service Creation (associated with the newly created user)
    const newService = await Service.create({
      title: 'Test Service',
      description: 'This is a test service description.',
      price: 100.0,
      category: 'Testing',
      userId: newUser.id, // Associate the service with the newly created user
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
