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
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _bodyparser = /*#__PURE__*/ _interop_require_default(require("body-parser"));
const _user = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
const _service = /*#__PURE__*/ _interop_require_default(require("./routes/service"));
const _auth = /*#__PURE__*/ _interop_require_default(require("./routes/auth"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from .env file
_dotenv.default.config();
// Create an Express application
const app = (0, _express.default)(); // Create the app instance
// Middleware
app.use((0, _cors.default)()); // Enable CORS
app.use(_bodyparser.default.json()); // Parse JSON bodies
app.use(_bodyparser.default.urlencoded({
    extended: true
})); // Parse URL-encoded bodies
// Define your routes
app.use('/api/users', _user.default); // User-related routes
app.use('/api/services', _service.default); // Service-related routes
app.use('/auth', _auth.default); // Authentication routes
// Default route for health check
app.get('/', (req, res)=>{
    res.send('Welcome to the API');
});
// Start the server if not in a test environment
const PORT = process.env.PORT || 3000;
let server; // Declare the server variable
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} else {
    console.log('Running in test mode. Server initialization is deferred to tests.');
}
// Gracefully shut down the server after tests
if (process.env.NODE_ENV === 'test') {
    afterAll(()=>{
        if (server) {
            server.close(()=>{
                console.log('Test server closed');
            });
        }
    });
}
