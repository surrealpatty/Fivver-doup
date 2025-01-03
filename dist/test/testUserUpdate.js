"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Adjust the path to your User model
const testUpdateUser = async (userId) => {
    try {
        const updatedUser = await user_1.default.update({ username: 'updatedusername' }, // New value for the username
        { where: { id: userId } } // Adjust according to your primary key or identifier
        );
        console.log('User updated:', updatedUser);
    }
    catch (error) {
        console.error('Error updating user:', error);
    }
};
// Replace 1 with an actual user ID from your database
testUpdateUser(1);
