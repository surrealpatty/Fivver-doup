"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./models/user"); // Correct import path for the User model
const services_1 = __importDefault(require("./models/services")); // Adjusted import for the Service model
// Insert a test user
user_1.User.create({
    id: 'b6e01bc7-0f64-421b-b4dd-a8aa2b339b57',
    email: 'test@example.com',
    password: 'hashedPasswordHere', // Ensure you hash passwords before inserting
    username: 'testuser',
    tier: 'free',
    role: 'user',
    isVerified: false // Correct property name (camelCase)
})
    .then((user) => {
    console.log('User created:', user);
    // Optionally, insert a test service for the created user
    return services_1.default.create({
        name: 'Web Development',
        description: 'Full-stack web development services.',
        price: 500,
        userId: user.id, // Link the service to the created user
    });
})
    .then((service) => {
    console.log('Service created:', service);
})
    .catch((error) => {
    console.error('Error:', error);
});
//# sourceMappingURL=testData.js.map