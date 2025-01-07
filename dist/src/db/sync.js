// src/db/sync.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
// Function to sync database and create tables
async function syncDatabase() {
    try {
        // Force sync will drop and recreate the tables
        await _database.sequelize.sync({
            force: true
        });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}
// Call the sync function
syncDatabase();
