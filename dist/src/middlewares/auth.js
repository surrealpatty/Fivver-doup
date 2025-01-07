"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Use only the default import
const config_1 = __importDefault(require("../config/config")); // Import configuration
// Utility function to get the configuration for the current environment
const getConfig = () => {
    const env = process.env.NODE_ENV || 'development';
    if (env in config_1.default) {
        return config_1.default[env];
    }
    throw new Error(`Invalid NODE_ENV: ${env}`);
};
// Extract configuration variables
const { JWT_SECRET, JWT_EXPIRATION } = getConfig();
// Function to generate a token
const generateToken = (payload) => {
    try {
        return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION || '1h' }); // Default to 1-hour expiration
    }
    catch (error) {
        if (error instanceof Error) { // Type guard to handle unknown error type
            console.error('Error generating token:', error.message);
        }
        else {
            console.error('Unknown error generating token');
        }
        throw new Error('Token generation failed');
    }
};
exports.generateToken = generateToken;
//
