"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/db/sync.ts
const database_1 = require("../config/database"); // Correct import
// Function to sync database and create tables
async function syncDatabase() {
    try {
        // Force sync will drop and recreate the tables
        await database_1.sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');
    }
    catch (error) {
        console.error('Error syncing database:', error);
    }
}
// Call the sync function
syncDatabase();
