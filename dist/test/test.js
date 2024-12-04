"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest")); // Import 'supertest' for testing HTTP requests
const index_1 = __importDefault(require("../index")); // Adjust as necessary
// Describe a basic test suite
describe('Basic Test Suite', () => {
    // Test for ensuring the test file runs correctly
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Simple test to verify the test file is running
    });
    // Test to check if the root endpoint is responding correctly
    it('should respond with a message from the root endpoint', async () => {
        const response = await (0, supertest_1.default)(index_1.default).get('/'); // Send a GET request to the root endpoint
        expect(response.statusCode).toBe(200); // Expect a status code of 200 (OK)
        expect(response.text).toBe('Fiverr backend is running'); // Expect the correct response message
    });
});
//# sourceMappingURL=test.js.map