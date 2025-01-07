"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("./config/database");
async function syncDatabase() {
    try {
        // Force sync will drop and recreate the table if it exists
        await _database.sequelize.sync({
            force: true
        });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}
syncDatabase();
