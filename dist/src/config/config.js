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
    // Export the configuration as the default export
    default: function() {
        return _default;
    },
    sequelizeConfig: function() {
        return sequelizeConfig;
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
// Configuration object
const config = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT: parsedDBPort,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION
};
const _default = config;
const sequelizeConfig = {
    dialect: 'mysql',
    host: config.DB_HOST,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    port: config.DB_PORT,
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    }
};

//# sourceMappingURL=config.js.map