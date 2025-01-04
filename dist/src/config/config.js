"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _dotenv = /*#__PURE__*/ _interop_require_wildcard(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
_dotenv.config();
// Parse and validate DB_PORT environment variable
const parsedDBPort = parseInt(process.env.DB_PORT || '3306', 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
// Merge both the Sequelize and JWT configurations into one final config
const config = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
        JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h'
    },
    test: {
        username: process.env.TEST_DB_USERNAME || 'root',
        password: process.env.TEST_DB_PASSWORD || 'test_password',
        database: process.env.TEST_DB_NAME || 'fivver_doup_test',
        host: process.env.TEST_DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
        JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h'
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
        JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h'
    }
};
const _default = config;
