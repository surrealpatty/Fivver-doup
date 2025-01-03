// config/config.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the appropriate configuration based on NODE_ENV
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
// Load environment variables from a .env file
_dotenv.default.config();
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = 'X^SE4Jzp$qfd1Fs2qfT*', DB_NAME = 'fivver_doup', DB_PORT = '3306', NODE_ENV = 'development', JWT_SECRET = 'your-secret-key', JWT_EXPIRATION = '1h' } = process.env;
// Ensure DB_PORT is a valid number
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Configuration object for different environments
const config = {
    development: {
        DB_HOST,
        DB_USER,
        DB_PASSWORD,
        DB_NAME,
        DB_PORT: parsedDBPort,
        NODE_ENV,
        JWT_SECRET,
        JWT_EXPIRATION
    },
    test: {
        DB_HOST: process.env.TEST_DB_HOST || 'localhost',
        DB_USER: process.env.TEST_DB_USER || 'test_user',
        DB_PASSWORD: process.env.TEST_DB_PASSWORD || 'test_password',
        DB_NAME: process.env.TEST_DB_NAME || 'fivver_doup_test',
        DB_PORT: parsedDBPort,
        NODE_ENV,
        JWT_SECRET,
        JWT_EXPIRATION
    },
    production: {
        DB_HOST,
        DB_USER,
        DB_PASSWORD,
        DB_NAME,
        DB_PORT: parsedDBPort,
        NODE_ENV,
        JWT_SECRET,
        JWT_EXPIRATION
    }
};
const _default = config[NODE_ENV];
