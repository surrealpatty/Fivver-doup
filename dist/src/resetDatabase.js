"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database"); // Correct import
// Function to reset the database
const resetDatabase = async () => {
    try {
        console.log('Starting database reset process...');
        // Step 1: Drop all tables in the database
        console.log('Dropping all tables...');
        await database_1.sequelize.drop(); // Drops all tables
        console.log('Tables dropped successfully.');
        // Step 2: Re-sync models to the database (recreates tables)
        console.log('Re-syncing database...');
        await database_1.sequelize.sync({ force: true }); // 'force: true' drops and recreates tables
        console.log('Database re-synced successfully!');
    }
    catch (error) {
        // Handle errors and log them
        console.error('Error resetting the database:', error);
    }
    finally {
        // Graceful shutdown after completing the task
        console.log('Database reset process complete.');
        process.exit(0); // Exit the process after completion
    }
};
// Call the function to reset the database
resetDatabase();
