"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var dotenv = require("dotenv");
dotenv.config();
// Destructure environment variables
var _a = process.env, DB_NAME = _a.DB_NAME, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_HOST = _a.DB_HOST, DB_DIALECT = _a.DB_DIALECT, DB_SSL = _a.DB_SSL, NODE_ENV = _a.NODE_ENV;
// Ensure required environment variables are set
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
    throw new Error('Missing required database environment variables.');
}
// Validate the provided dialect
var validDialects = ['mysql', 'postgres', 'sqlite', 'mssql'];
if (!validDialects.includes(DB_DIALECT)) {
    throw new Error("Invalid DB_DIALECT specified: ".concat(DB_DIALECT, ". Must be one of ").concat(validDialects.join(', ')));
}
// Determine SSL usage based on environment
var useSSL = DB_SSL === 'true';
// Set up Sequelize instance with dialect-specific options
var sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT, // Ensure the dialect is strictly typed
    logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development mode
    dialectOptions: DB_DIALECT === 'mysql' || DB_DIALECT === 'postgres'
        ? useSSL
            ? {
                ssl: {
                    rejectUnauthorized: false, // Allow self-signed certificates
                },
                charset: 'utf8mb4',
            }
            : { charset: 'utf8mb4' }
        : {}, // No dialectOptions needed for sqlite
    define: {
        freezeTableName: true, // Prevent automatic pluralization of table names
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    pool: {
        max: 5, // Maximum number of connections in pool
        min: 0, // Minimum number of connections in pool
        acquire: 30000, // Maximum time (ms) to acquire a connection
        idle: 10000, // Maximum time (ms) a connection can be idle before being released
    },
});
exports.sequelize = sequelize;
// Function to test database connection and sync tables
var testConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, sequelize.authenticate()];
            case 1:
                _a.sent();
                console.log('Database connection has been established successfully.');
                if (!(NODE_ENV !== 'test')) return [3 /*break*/, 3];
                return [4 /*yield*/, sequelize.sync({ alter: true })];
            case 2:
                _a.sent(); // Sync models with the database (but only for non-test environments)
                console.log('Database tables synced successfully.');
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Unable to connect to the database:', error_1);
                if (NODE_ENV !== 'test') {
                    process.exit(1); // Exit the process if not in test mode
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.testConnection = testConnection;
