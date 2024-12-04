"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export app for testing
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _database = require("@config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
const _testEmailRoute = /*#__PURE__*/ _interop_require_default(require("./routes/testEmailRoute"));
const _user1 = require("@models/user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Initialize Express app
const app = (0, _express.default)();
// Verify necessary environment variables are set
const port = process.env.PORT || 3000; // Default to 3000 if not provided
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
if (!dbName || !dbUser || !dbPassword || !dbHost) {
    console.error('Missing required environment variables for database connection.');
    process.exit(1); // Exit the app if critical variables are missing
}
// Middleware to parse JSON bodies
app.use(_express.default.json());
// Register routes
app.use('/api/users', _user.default); // All user-related routes
app.use('/test', _testEmailRoute.default); // Test email route
// Root route
app.get('/', (req, res)=>{
    res.send('Welcome to Fiverr Clone!');
});
// Verify database connection
_database.sequelize.authenticate().then(()=>{
    console.log('Database connection established.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit the process if database connection fails
});
// Sync models with the database
_database.sequelize.sync().then(()=>{
    console.log('Database synced successfully.');
}).catch((err)=>{
    console.error('Error syncing database:', err);
    process.exit(1); // Exit the process if syncing fails
});
// Fetch users as a test (ensure it runs after the database sync)
_database.sequelize.sync().then(async ()=>{
    try {
        const users = await _user1.User.findAll();
        console.log('Users:', users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
});
// Start the server
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
const _default = app;

//# sourceMappingURL=index.js.map