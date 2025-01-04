"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = require("../../index"); // Adjust the path to your app entry point
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../../config/database"); // Adjust the path to your Sequelize configuration

describe('Server Tests', () => {
    let server; // Declare server variable to manage lifecycle
    let port = 3000; // Define the port number

    beforeAll(() => {
        // Create server with the app instance and start listening
        server = http_1.default.createServer(index_1.app);
        server.listen(port);
    });

    it('should respond to a GET request', async () => {
        // Replace '/some-route' with the actual route to test
        const res = await (0, supertest_1.default)(index_1.app).get('/');
        expect(res.status).toBe(200); // Expect a 200 status code
        expect(res.text).toBe('Fiverr backend is running'); // Adjust expected response as needed
    });

    afterAll(async () => {
        // Close Sequelize connection and server after tests
        try {
            await database_1.sequelize.close(); // Ensure the Sequelize connection closes
            await new Promise((resolve, reject) => {
                server.close((err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        } catch (err) {
            console.error('Error during cleanup:', err);
        }
    });
});
