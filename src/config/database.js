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
exports.sequelize = exports.closeConnection = exports.testConnection = void 0;
var sequelize_1 = require("sequelize");
var dotenv_1 = require("dotenv");
// Load environment variables from the .env file
dotenv_1.default.config();
// Destructure environment variables from process.env
var _a = process.env, DB_HOST = _a.DB_HOST, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_NAME = _a.DB_NAME, DB_PORT = _a.DB_PORT, NODE_ENV = _a.NODE_ENV;
// TypeScript type declaration for process.env (ensure all required variables are present)
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT) {
    if (NODE_ENV !== 'test') {
        console.error('Missing required environment variables. Please check your .env file.');
        process.exit(1); // Exit the process if it's not in a test environment
    }
}
// Default values for database connection settings if not provided
var sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: DB_HOST || 'localhost', // Default to 'localhost' if not provided
    username: DB_USER || 'root', // Default to 'root' if not provided
    password: DB_PASSWORD || '', // Default to empty string if not provided
    database: DB_NAME || 'fivver_doup', // Default to 'fivver_doup' if not provided
    port: parseInt(DB_PORT || '3306', 10), // Default to 3306 if not provided
    logging: NODE_ENV === 'development', // Log SQL queries only in development
    dialectOptions: {
        timezone: 'Z', // Optional: Use UTC for MySQL queries (if applicable)
    },
    define: {
        timestamps: false, // Optional: Adjust if you don't want `createdAt` and `updatedAt` fields
    },
});
exports.sequelize = sequelize;
// Function to test the database connection
var testConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sequelize.authenticate()];
            case 1:
                _a.sent();
                console.log('Database connection has been established successfully.');
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    console.error('Unable to connect to the database:', error_1.message);
                }
                else {
                    console.error('An unknown error occurred during the database connection');
                }
                // Exit the process only if it's not in a test environment
                if (NODE_ENV !== 'test') {
                    process.exit(1); // Exit the process if connection fails
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.testConnection = testConnection;
// Ensure sequelize connection is properly closed after tests or app shutdown
var closeConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sequelize.close()];
            case 1:
                _a.sent();
                console.log('Database connection has been closed.');
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error closing the database connection:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.closeConnection = closeConnection;
// Only call testConnection if it's not in a test environment
if (NODE_ENV !== 'test') {
    (0, exports.testConnection)();
}
