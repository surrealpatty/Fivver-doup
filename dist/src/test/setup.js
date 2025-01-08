"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _database = require("../config/database");
require("../models/user");
require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
/**
 * Sync the database and reset the schema before running tests.
 */ const syncDatabase = async ()=>{
    try {
        console.log('Connecting to the database...');
        await _database.sequelize.authenticate(); // Authenticate the connection
        console.log('Database connected successfully!');
        console.log('Syncing database schema...');
        await _database.sequelize.sync({
            force: true
        }); // Drop and recreate schema before each test run
        console.log('Database schema synced successfully!');
    } catch (error) {
        console.error('Error connecting to the database or syncing schema:', error);
        process.exit(1); // Exit if the connection or sync fails
    }
};
/**
 * Setup and teardown hooks for Jest testing.
 */ beforeAll(async ()=>{
    console.log('Setting up the test environment...');
    await syncDatabase(); // Sync the database before tests
});
afterAll(async ()=>{
    console.log('Tearing down the test environment...');
    await _database.sequelize.close(); // Close the database connection after tests complete
});
