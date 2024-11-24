import { registerUser, loginUser } from '../controllers/userController'; // Ensure correct import
import { sequelize } from '../config/database'; // Correct import path for sequelize
import User from '../models/user'; // Correct import path for user model
import Service from '../models/services'; // Correct import path for services model
import { mockRequest, mockResponse } from 'jest-mock-express'; // Add this utility to mock Request/Response

console.log('User functions loaded successfully.');

// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Function to test user and service models
const testUserAndServiceModels = async () => {
  try {
    // Synchronize models with the database
    await sequelize.sync({ force: true });

    // Test User Creation
    const newUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    console.log('User created:', newUser.toJSON());

    // Test Service Creation
    const newService = await Service.create({
      title: 'Test Service',
      description: 'This is a test service description.',
      price: 100.0,
      category: 'Testing',
      userId: newUser.id.toString(), // Ensure userId matches Service model's type (string)
    });
    console.log('Service created:', newService.toJSON());

    // Mock the Request and Response for registerUser
    const req = mockRequest({
      body: {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      },
    });
    const res = mockResponse();

    // Test User Registration
    await registerUser(req, res);
    console.log('User registered via registerUser:', res.json.mock.calls[0][0]);

    // Mock the Request and Response for loginUser
    const loginReq = mockRequest({
      body: {
        email: newUser.email,
        password: newUser.password,
      },
    });
    const loginRes = mockResponse();

    // Test User Login
    await loginUser(loginReq, loginRes);
    console.log('User logged in via loginUser:', loginRes.json.mock.calls[0][0]);
  } catch (error) {
    console.error('Error testing models:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Call the test function
testUserAndServiceModels();
