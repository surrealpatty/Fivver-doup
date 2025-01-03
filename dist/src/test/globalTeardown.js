"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _index = require("../index");
// Global teardown to ensure cleanup of resources after all tests
afterAll(async ()=>{
    // Close the database connection if it exists
    if (_database.sequelize) {
        await _database.sequelize.close();
        console.log('Database connection closed.');
    }
    // Close the server if it has a close method (now using the HTTP server)
    if (_index.server && typeof _index.server.close === 'function') {
        await new Promise((resolve)=>{
            _index.server.close(()=>{
                resolve();
                console.log('Server closed.');
            });
        });
    }
});
