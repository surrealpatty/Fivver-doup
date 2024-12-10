"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    app: function() {
        return app;
    },
    server: function() {
        return server;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _database = require("./config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
const _profile = /*#__PURE__*/ _interop_require_default(require("./routes/profile"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
require("./types/express");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Create Express app instance
const app = (0, _express.default)();
// Set up the server port, defaulting to process.env.PORT or 3000
const port = process.env.PORT || 3000; // Default port is 3000, can be overridden for testing
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
app.use('/api/profile', _profile.default); // Register profile route
// Test database connection
_database.sequelize.authenticate().then(()=>{
    console.log('Database connection established.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
});
// Global error handler middleware
app.use((err, req, res, next)=>{
    console.error(err); // Log the error
    res.status(500).json({
        message: 'Something went wrong!'
    }); // Send generic error response
});
// Start the server on dynamic port (use process.env.PORT or 3000)
const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
 // Export both app and server instance for testing or server shutdown

//# sourceMappingURL=index.js.map