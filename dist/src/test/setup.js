"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
/**
 * Sync the database and reset the schema before running tests
 */ const syncDatabase = async ()=>{
    try {
        console.log('Connecting to the database...');
        await _database.sequelize.authenticate(); // Authenticate the connection
        console.log('Database connected successfully!');
        console.log('Syncing database schema...');
        // Use `force: true` to drop and recreate the schema before each test run
        await _database.sequelize.sync({
            force: true
        });
        console.log('Database schema synced successfully!');
    } catch (error) {
        console.error('Error connecting to the database or syncing schema:', error);
        process.exit(1); // Exit the process if the connection or sync fails
    }
};
/**
 * Setup and teardown hooks for Jest testing
 */ beforeAll(async ()=>{
    console.log('Syncing the database before tests...');
    await syncDatabase(); // Sync the database before running the tests
});
afterAll(async ()=>{
    console.log('Closing the database connection after tests...');
    await _database.sequelize.close(); // Close the database connection after tests complete
});

//# sourceMappingURL=setup.js.map