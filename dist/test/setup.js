"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config(); // Ensure the environment variables are loaded before any tests run
// Mocking modules and models for testing
// Mock User model methods
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));
// Mock Order model methods
jest.mock('../models/order', () => ({
    findByPk: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
}));
// Mock JWT methods
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn(() => 'mockedToken'), // Return a constant mocked token
}));
// Mock Sequelize connection
jest.mock('../config/database', () => ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(undefined), // Mock DB authentication
        close: jest.fn().mockResolvedValue(undefined), // Mock DB connection close
    },
}));
/**
 * Global setup for environment variables or mock configurations.
 */
beforeAll(() => {
    // Set up mock environment variables
    process.env.JWT_SECRET = 'mock-secret-key'; // Mock JWT secret key for testing
    // Other environment variables can be set here if needed
    console.log('Setting up before all tests...');
});
/**
 * Reset mocks to ensure no state leaks between tests.
 */
afterEach(() => {
    jest.clearAllMocks(); // Clears all mock calls and resets mock states after each test
});
/**
 * Clean-up tasks after all tests have run.
 */
afterAll(async () => {
    console.log('Cleaning up after all tests...');
    await Promise.resolve().then(() => __importStar(require('../config/database'))).then(async (module) => {
        await module.sequelize.close(); // Close the mocked DB connection
    });
});
// Ensure Jest global functions are available for all tests
require("@jest/globals"); // Import Jest globals to ensure they are available globally in tests
//# sourceMappingURL=setup.js.map