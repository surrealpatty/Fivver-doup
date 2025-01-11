"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database"); // Correct import
async function syncDatabase() {
    try {
        // Force sync will drop and recreate the table if it exists
        await database_1.sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');
    }
    catch (error) {
        console.error('Error syncing database:', error);
    }
}
syncDatabase();
