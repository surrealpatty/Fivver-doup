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
    // Export the app as a default export (useful for testing or reusability)
    default: function() {
        return _default;
    },
    server: function() {
        return server;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _user = /*#__PURE__*/ _interop_require_default(require("./routes/user"));
const _service = /*#__PURE__*/ _interop_require_default(require("./routes/service"));
const _auth = /*#__PURE__*/ _interop_require_default(require("./routes/auth"));
const _passwordReset = /*#__PURE__*/ _interop_require_default(require("./routes/passwordReset"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config(); // Load environment variables from .env file
const app = (0, _express.default)();
// Middleware setup
app.use((0, _cors.default)()); // Enable Cross-Origin Resource Sharing
app.use(_express.default.json()); // Parse JSON request bodies (Built-in middleware in Express 4.16.0+)
app.use(_express.default.urlencoded({
    extended: true
})); // Parse URL-encoded request bodies
// Routes setup
app.use('/api/users', _user.default); // User routes
app.use('/api/services', _service.default); // Service routes
app.use('/auth', _auth.default); // Auth routes
app.use('/api/password-reset', _passwordReset.default); // Password reset routes
// Default route for testing the API
app.get('/', (req, res)=>{
    res.send('Welcome to the API');
});
// Set up server listening logic
const PORT = process.env.PORT || 3000;
let server;
// Create and start the server, but only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} else {
    console.log('Running in test mode.');
}
const _default = app;
