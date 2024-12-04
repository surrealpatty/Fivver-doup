"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database"); // Correct path to sequelize instance
const user_1 = require("./models/user"); // Correct path to the User model
const user_2 = __importDefault(require("./routes/user")); // Correct path to userRouter
const cors_1 = __importDefault(require("cors"));
// Create Express app instance
const app = (0, express_1.default)();
exports.app = app;
// Set up the server port
const port = process.env.PORT || 3000; // Port is now 3000
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Enable CORS (if you need it, for handling cross-origin requests)
app.use((0, cors_1.default)());
// Example route
app.get('/', (req, res) => {
    res.send('Welcome to Fiverr Clone!');
});
// Function to fetch users as a test (or could be moved to routes later)
async function fetchUsers() {
    try {
        const users = await user_1.User.findAll({ raw: true }); // Use 'raw: true' to get plain data
        console.log('Users:', users); // Log users to verify
        if (users.length === 0) {
            console.log('No users found.');
        }
    }
    catch (error) {
        console.error('Error fetching users:', error);
    }
}
// Synchronize models with the database
database_1.sequelize.sync({ alter: true }) // Using 'alter' instead of 'force' to avoid dropping tables
    .then(() => {
    console.log('Models are synchronized with the database.');
    // Call fetchUsers() after models are synced
    fetchUsers();
})
    .catch((error) => {
    console.error('Error syncing models:', error);
});
// Use the userRouter for routes starting with /api/users
app.use('/api/users', user_2.default); // Register the user routes under /api/users
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map