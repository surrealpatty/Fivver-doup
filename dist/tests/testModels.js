"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import necessary modules
const { registerUser, loginUser } = require('../src/controllers/userController');
const sequelize = require('../src/config/database'); // Ensure the path to the Sequelize instance is correct
const User = require('../src/models/user'); // Import User model
const Service = require('../src/models/services'); // Import Service model
console.log('User functions loaded successfully.');
// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });
// Function to test user and service models
const testUserAndServiceModels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchronize models with the database (use `force: true` cautiously for testing)
        yield sequelize.sync({ force: true });
        // Test User Creation
        const newUser = yield User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });
        console.log('User created:', newUser.toJSON());
        // Test Service Creation (associated with the newly created user)
        const newService = yield Service.create({
            title: 'Test Service',
            description: 'This is a test service description.',
            price: 100.0,
            category: 'Testing',
            userId: newUser.id, // Associate the service with the newly created user
        });
        console.log('Service created:', newService.toJSON());
        // Test User Registration via registerUser function
        const registrationResponse = yield registerUser({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
        });
        console.log('User registered via registerUser:', registrationResponse);
        // Test User Login via loginUser function
        const loginResponse = yield loginUser(newUser.email, newUser.password);
        console.log('User logged in via loginUser:', loginResponse);
    }
    catch (error) {
        console.error('Error testing models:', error);
    }
    finally {
        // Close the database connection
        yield sequelize.close();
    }
});
// Call the test function
testUserAndServiceModels();
//# sourceMappingURL=testModels.js.map