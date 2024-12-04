"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Add bcrypt for password comparison
const user_1 = require("../models/user"); // Corrected import statement
// Register user function
const registerUser = async ({ username, email, password, }) => {
    try {
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const userData = {
            username: 'newuser',
            email: 'user@example.com',
            role: 'free', // Add role as an optional field
            password: hashedPassword, // Use hashed password
        };
        // Create the user with hashed password
        const user = await user_1.User.create(userData);
        return user; // Return the created user object
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error registering user: ' + error.message); // Return specific error message
        }
        throw new Error('Unknown error occurred during user registration'); // Fallback error message
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=profileController.js.map