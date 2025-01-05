"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = require("../index"); // Correct import path for the app entry point
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../config/database"); // Import sequelize instance to close connection
const services_1 = require("../models/services"); // Correct named import
describe('Server Tests', () => {
    let server;
    beforeAll(async () => {
        // Ensure that the Service model is added to sequelize
        database_1.sequelize.addModels([services_1.Service]);
        // Sync the models with the database (use force: true if you want to reset the DB)
        await database_1.sequelize.sync({ force: false });
        // Create and start the server before tests
        server = http_1.default.createServer(index_1.app);
        server.listen(3000); // Start the server
    });
    it('should respond to a GET request', async () => {
        const res = await (0, supertest_1.default)(index_1.app).get('/some-route'); // Replace with an actual route for the test
        expect(res.status).toBe(200);
    });
    afterAll(async () => {
        // Close the Sequelize connection and the server after all tests
        await database_1.sequelize.close(); // Close the Sequelize connection after tests
        await new Promise((resolve) => {
            server.close(() => {
                resolve();
            });
        });
    });
});
