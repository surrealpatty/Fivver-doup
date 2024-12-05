"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the configuration
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Load environment variables from the .env file
_dotenv.default.config();
// Destructure and validate environment variables with defaults
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'fivver_doup', DB_PORT = '3306', NODE_ENV = 'development', JWT_SECRET = 'your-secret-key', JWT_EXPIRATION = '1h' } = process.env;
// Validate critical environment variables
if (NODE_ENV !== 'test' && (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)) {
    console.error('Missing required environment variables. Check your .env file.');
    process.exit(1); // Exit the process if critical variables are missing
}
// Ensure that DB_PORT is an integer
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Config object for the application
const config = {
    db: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: parsedDBPort
    },
    nodeEnv: NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION
};
const _default = config;

//# sourceMappingURL=config.js.map