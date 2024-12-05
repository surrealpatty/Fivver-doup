"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "app", {
    enumerable: true,
    get: function() {
        return app;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _database = require("./config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
const _profile = require("./routes/profile");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Create Express app instance
const app = (0, _express.default)();
// Set up the server port
const port = process.env.PORT || 3000; // Default port is 3000
// Middleware to parse JSON bodies
app.use(_express.default.json());
// Enable CORS (if needed for handling cross-origin requests)
app.use((0, _cors.default)());
// Example route to test the server
app.get('/', (req, res)=>{
    res.send('Welcome to Fiverr Clone!');
});
// Synchronize models with the database
_database.sequelize.sync({
    alter: true
}) // Using 'alter' to ensure no data loss
.then(()=>{
    console.log('Models are synchronized with the database.');
}).catch((error)=>{
    console.error('Error syncing models:', error);
});
// Use the userRouter for routes starting with /api/users
app.use('/api/users', _user.default); // Register the user routes under /api/users
// Register the profile route under /api/profile
app.use('/api/profile', _profile.router); // Register profile route
// Test database connection
_database.sequelize.authenticate().then(()=>{
    console.log('Database connection established.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
});
// Start the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
 // Optional: Exporting app in case it's needed for tests or elsewhere

//# sourceMappingURL=index.js.map