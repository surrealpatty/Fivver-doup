"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return globalTeardown;
    }
});
const _index = require("./index");
const _database = require("./config/database");
async function globalTeardown() {
    // Close the server if it has a close method
    if (_index.server && typeof _index.server.close === 'function') {
        await _index.server.close(); // Close the server properly after tests
        console.log('Server closed.');
    }
    // Disconnect Sequelize connection
    if (_database.sequelize && _database.sequelize.close) {
        await _database.sequelize.close(); // Close the database connection
        console.log('Sequelize connection closed.');
    }
}
