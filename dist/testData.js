"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./models/user")); // Correct default import for the User model
const services_1 = require("./models/services"); // Correct named import for the Service model
const types_1 = require("./types"); // Import the correct enums
async function createTestUserAndService() {
    try {
        // Insert a test user with the necessary attributes
        const userAttributes = {
            email: 'test@example.com',
            password: 'hashedPasswordHere', // Ensure you hash passwords before inserting
            username: 'testuser',
            tier: types_1.UserTier.Free, // Use the correct enum value for tier
            role: types_1.UserRole.User, // Use the correct enum value for role
            isVerified: false, // Correct property name (camelCase)
        };
        // Create the user using the attributes
        const createdUser = await user_1.default.create(userAttributes);
        console.log('User created:', createdUser);
        // Optionally, insert a test service for the created user
        const service = await services_1.Service.create({
            title: 'Web Development', // Service title
            description: 'Full-stack web development services.', // Service description
            price: 500, // Service price
            userId: createdUser.id.toString(), // Ensure userId is a string (convert if necessary)
            role: types_1.UserRole.User, // Add the role field here for the service (should be the same role)
        });
        console.log('Service created:', service); // Log service creation
    }
    catch (error) {
        console.error('Error:', error); // Catch and log any errors
    }
}
createTestUserAndService();
