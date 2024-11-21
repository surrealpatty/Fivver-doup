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
var sequelize_1 = require("sequelize");
var dotenv_1 = require("dotenv");
// Load environment variables from the .env file
dotenv_1.default.config();
// Destructure environment variables
var _a = process.env, DB_NAME = _a.DB_NAME, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_HOST = _a.DB_HOST, DB_DIALECT = _a.DB_DIALECT, DB_SSL = _a.DB_SSL, NODE_ENV = _a.NODE_ENV, JWT_SECRET = _a.JWT_SECRET;
// Ensure required environment variables are present
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT || !JWT_SECRET) {
    throw new Error('Missing required environment variables');
}
// Convert DB_SSL to a boolean value if it's set to 'true' or 'false'
var useSSL = DB_SSL === 'true';
// Cast DB_DIALECT to a valid Sequelize dialect
var dialect = DB_DIALECT; // Replace with all valid dialects you support
// Create a new Sequelize instance
var sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: dialect, // Use the type-cast dialect here
    logging: NODE_ENV === 'development' ? console.log : false, // Enable logging only in development
    dialectOptions: {
        ssl: useSSL, // Use SSL if DB_SSL is 'true'
        rejectUnauthorized: false, // Disable verification if using self-signed certificates
    },
});
// Test the database connection
var testConnection = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, sequelize.authenticate()];
            case 1:
                _a.sent();
                console.log('Database connection established successfully');
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                if (err_1 instanceof Error) {
                    console.error('Unable to connect to the database:', err_1.message || err_1);
                }
                else {
                    console.error('An unknown error occurred during database connection');
                }
                // Do not call process.exit(1) in a test environment
                if (NODE_ENV !== 'test') {
                    process.exit(1); // Exit the process only if it's not a test environment
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Only call testConnection if it's not in a test environment
if (NODE_ENV !== 'test') {
    testConnection();
}
// Export the config object and sequelize instance
exports.default = {
    DB_NAME: DB_NAME,
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD,
    DB_HOST: DB_HOST,
    DB_DIALECT: DB_DIALECT,
    DB_SSL: DB_SSL,
    NODE_ENV: NODE_ENV,
    JWT_SECRET: JWT_SECRET,
    sequelize: sequelize,
    testConnection: testConnection,
};
