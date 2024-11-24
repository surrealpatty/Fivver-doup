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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Correct named import
// Mock User model methods
jest.mock('../models/user', () => ({
    findOne: jest.fn(), // Mock findOne method
    create: jest.fn(), // Mock create method
    findByPk: jest.fn(), // Mock findByPk method
    update: jest.fn(), // Mock update method
    destroy: jest.fn(), // Mock destroy method
}));
// Mock Order model methods
jest.mock('../models/order', () => ({
    findByPk: jest.fn(), // Mock findByPk method
    create: jest.fn(), // Mock create method
    findAll: jest.fn(), // Mock findAll method
    destroy: jest.fn(), // Mock destroy method
}));
// Mock JWT methods
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(), // Mock verify method
    sign: jest.fn(() => 'mockedToken'), // Mock sign method (returns a constant mock token)
}));
// Mock Sequelize connection
jest.mock('../config/database', () => ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(undefined), // Mock a successful DB connection
        close: jest.fn().mockResolvedValue(undefined), // Mock closing the DB connection
    },
}));
/**
 * Global setup for environment variables or mock configurations.
 */
beforeAll(() => {
    // Set up mock environment variables
    process.env.JWT_SECRET = 'mock-secret-key'; // Mock JWT secret key
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
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close(); // Close the mocked DB connection
}));
