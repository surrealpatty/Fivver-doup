"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalTeardown;
const index_1 = require("./index"); // Correct path and export
const database_1 = require("./config/database"); // Correct import
async function globalTeardown() {
    // Close the server if it has a close method
    if (index_1.server && typeof index_1.server.close === 'function') {
        await index_1.server.close(); // Close the server properly after tests
        console.log('Server closed.');
    }
    // Disconnect Sequelize connection
    if (database_1.sequelize && database_1.sequelize.close) {
        await database_1.sequelize.close(); // Close the database connection
        console.log('Sequelize connection closed.');
    }
}
