"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Adjust the path to your User model
const UserRoles_1 = require("../types/UserRoles"); // Import the enums
const testDuplicateUsername = async () => {
    try {
        // First user creation with all required properties
        const user1 = await user_1.default.create({
            username: 'duplicateuser', // Test username
            email: 'user1@example.com',
            password: 'password1',
            role: UserRoles_1.UserRole.User, // Use UserRole.User for the role
            tier: UserRoles_1.UserTier.Free, // Use UserTier.Free for the tier
            isVerified: false, // Assuming the default value for verification is false
        });
        console.log('First user created:', user1);
        // Attempt to create another user with the same username
        const user2 = await user_1.default.create({
            username: 'duplicateuser', // Same username as the first user
            email: 'user2@example.com',
            password: 'password2',
            role: UserRoles_1.UserRole.User, // Use UserRole.User for the role
            tier: UserRoles_1.UserTier.Free, // Use UserTier.Free for the tier
            isVerified: false, // Same verification status
        });
        console.log('Second user created:', user2);
    }
    catch (error) {
        console.error('Error creating user (duplicate username):', error);
    }
};
testDuplicateUsername();
