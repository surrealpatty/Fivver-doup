"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Adjust the path if necessary
const testDeleteUser = async (userId) => {
    try {
        const deletedUser = await user_1.default.destroy({
            where: { id: userId }, // Replace with your identifier (primary key)
        });
        if (deletedUser) {
            console.log(`User with ID ${userId} deleted successfully.`);
        }
        else {
            console.log(`No user found with ID ${userId}.`);
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
    }
};
// Replace with a valid user ID
testDeleteUser(1);
