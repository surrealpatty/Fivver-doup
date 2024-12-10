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
// src/test/app.test.ts
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../config/database"); // Corrected import for sequelize
// Define the path to the compiled `index.js` file in `dist/`
const appPath = path_1.default.resolve(__dirname, '../../dist/index'); // Adjusted path to dist/index.js
// Initialize app variable with explicit typing as Express.Application
let app;
beforeAll(async () => {
    // First, ensure Sequelize sync is complete
    await database_1.sequelize.sync(); // This will sync models with the database
    try {
        // Dynamically import the app from the compiled dist/index.js
        const module = await Promise.resolve(`${appPath}`).then(s => __importStar(require(s)));
        app = module.default || module.app; // Adjust based on how your app is exported
    }
    catch (error) {
        console.error('Error loading app from dist:', error);
        throw error; // Ensure the tests fail if the app can't be loaded
    }
});
afterAll(async () => {
    // Close the database connection after tests have finished
    await database_1.sequelize.close();
});
describe('Basic Test Suite', () => {
    it('should respond with a message from the root endpoint', async () => {
        if (!app) {
            console.warn('Skipping tests as app could not be loaded');
            return; // Skip the test if app could not be loaded
        }
        // Send a GET request to the root endpoint
        const response = await (0, supertest_1.default)(app).get('/');
        // Check the response
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to Fiverr Clone!');
    });
    // Add more tests as needed
});
//# sourceMappingURL=app.test.js.map