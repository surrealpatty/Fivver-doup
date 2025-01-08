// src/config/config.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the configuration based on the current environment
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
_dotenv.default.config(); // Ensure environment variables are loaded
// Define configuration for different environments
const config = {
    development: {
        JWT_SECRET: process.env.JWT_SECRET || 'defaultDevelopmentSecret',
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
        DB_USERNAME: process.env.DB_USERNAME || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || 'password',
        DB_NAME: process.env.DB_NAME || 'fivver_doup',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_USE_SSL: process.env.DB_USE_SSL === 'true'
    },
    test: {
        JWT_SECRET: process.env.JWT_SECRET || 'defaultTestSecret',
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
        DB_USERNAME: process.env.DB_USERNAME || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || 'password',
        DB_NAME: process.env.TEST_DB_NAME || 'fivver_doup_test',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_USE_SSL: process.env.DB_USE_SSL === 'true'
    },
    production: {
        JWT_SECRET: process.env.JWT_SECRET || 'defaultProductionSecret',
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
        DB_USERNAME: process.env.DB_USERNAME || 'root',
        DB_PASSWORD: process.env.DB_PASSWORD || 'password',
        DB_NAME: process.env.DB_NAME || 'fivver_doup',
        DB_HOST: process.env.DB_HOST || 'localhost',
        DB_PORT: process.env.DB_PORT || '3306',
        DB_USE_SSL: process.env.DB_USE_SSL === 'true'
    }
};
const _default = config;
