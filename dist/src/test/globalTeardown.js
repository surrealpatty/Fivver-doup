"use strict";
// src/test/globalTeardown.ts
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Adjust path based on your project structure
const index_1 = require("../index"); // Adjust path based on your project structure
// Global teardown to ensure cleanup of resources after all tests
afterAll(async () => {
    // Close the database connection if it exists
    if (database_1.sequelize) {
        await database_1.sequelize.close();
        console.log('Database connection closed.');
    }
    // Close the server if it has a close method (now using the HTTP server)
    if (index_1.server && typeof index_1.server.close === 'function') {
        await new Promise((resolve) => {
            index_1.server.close(() => {
                resolve();
                console.log('Server closed.');
            });
        });
    }
});
