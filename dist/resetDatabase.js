"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
// Function to reset the database
const resetDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting database reset process...');
        // Step 1: Drop all tables in the database
        console.log('Dropping all tables...');
        yield database_1.sequelize.drop(); // Drops all tables
        console.log('Tables dropped successfully.');
        // Step 2: Re-sync models to the database (recreates tables)
        console.log('Re-syncing database...');
        yield database_1.sequelize.sync({ force: true }); // 'force: true' drops and recreates tables
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
});
// Call the function to reset the database
resetDatabase();
