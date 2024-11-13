"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database"); // Database configuration
const user_1 = __importDefault(require("./routes/user")); // Import user routes
// Load environment variables
dotenv_1.default.config(); // Ensure environment variables are loaded at the start
// Initialize Express app
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json()); // Parse JSON requests
app.use((0, cors_1.default)()); // Enable CORS for cross-origin requests
// Root route - ensures the correct message is returned for testing
app.get('/', (req, res) => {
    res.send('Fiverr backend is running');
});
// Routes
app.use('/api/users', user_1.default); // Set up user-related routes
// Function to initialize the database and start the server
const startServer = async () => {
    try {
        // Test DB connection
        await (0, database_1.testConnection)();
        console.log('Database connection successful.');
        // Sync database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {}; // Use 'alter' in development for automatic model updates
        await database_1.sequelize.sync(syncOptions);
        console.log('Database synced successfully.');
        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error instanceof Error ? error.message : 'Unknown error');
        process.exit(1); // Exit the process with a failure code
    }
};
// Start the server if this file is executed directly (avoid starting it during tests)
if (require.main === module) {
    startServer();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQXFEO0FBQ3JELGdEQUF3QjtBQUN4QixvREFBNEI7QUFDNUIsZ0RBQThELENBQUUseUJBQXlCO0FBQ3pGLHlEQUF1QyxDQUFFLHFCQUFxQjtBQUU5RCw2QkFBNkI7QUFDN0IsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFFLHVEQUF1RDtBQUV6RSx5QkFBeUI7QUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUE0Q2Isa0JBQUc7QUExQ1osYUFBYTtBQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUUsc0JBQXNCO0FBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDLENBQUUsd0NBQXdDO0FBRTFELG1FQUFtRTtBQUNuRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsRUFBRTtJQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFTO0FBQ1QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsY0FBVSxDQUFDLENBQUMsQ0FBRSw2QkFBNkI7QUFFakUsMkRBQTJEO0FBQzNELE1BQU0sV0FBVyxHQUFHLEtBQUssSUFBbUIsRUFBRTtJQUMxQyxJQUFJLENBQUM7UUFDRCxxQkFBcUI7UUFDckIsTUFBTSxJQUFBLHlCQUFjLEdBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFL0MsZ0JBQWdCO1FBQ2hCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQztRQUM3RCxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRSx5REFBeUQ7UUFDcEgsTUFBTSxvQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFFN0MsZUFBZTtRQUNmLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUN0QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFBQyxPQUFPLEtBQWMsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLHVDQUF1QztJQUM3RCxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsc0ZBQXNGO0FBQ3RGLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztJQUMxQixXQUFXLEVBQUUsQ0FBQztBQUNsQixDQUFDIn0=