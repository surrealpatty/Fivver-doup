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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController"); // Ensure correct import
const database_1 = require("../config/database"); // Correct import path for sequelize
const user_1 = __importDefault(require("../models/user")); // Correct import path for user model
const services_1 = __importDefault(require("../models/services")); // Correct import path for services model
console.log('User functions loaded successfully.');
// Setting up model associations
user_1.default.hasMany(services_1.default, { foreignKey: 'userId', as: 'services' });
services_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'user' });
// Function to test user and service models
const testUserAndServiceModels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchronize models with the database (use `force: true` cautiously for testing)
        yield database_1.sequelize.sync({ force: true });
        // Test User Creation
        const newUser = yield user_1.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            // No need to pass the 'id' field as it's auto-generated
        });
        console.log('User created:', newUser.toJSON());
        // Test Service Creation (associated with the newly created user)
        const newService = yield services_1.default.create({
            title: 'Test Service',
            description: 'This is a test service description.',
            price: 100.0,
            category: 'Testing',
            userId: newUser.id, // Ensure the type of newUser.id matches the expected type of userId
        });
        console.log('Service created:', newService.toJSON());
        // Test User Registration via registerUser function
        const registrationResponse = yield (0, userController_1.registerUser)({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
        });
        console.log('User registered via registerUser:', registrationResponse);
        // Test User Login via loginUser function
        const loginResponse = yield (0, userController_1.loginUser)(newUser.email, newUser.password);
        console.log('User logged in via loginUser:', loginResponse);
    }
    catch (error) {
        console.error('Error testing models:', error);
    }
    finally {
        // Close the database connection
        yield database_1.sequelize.close();
    }
});
// Call the test function
testUserAndServiceModels();
