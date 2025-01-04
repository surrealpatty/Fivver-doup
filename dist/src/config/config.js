"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
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
        password: process.env.DB_PASSWORD || 'password', // Replace with your secure value
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
        JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // JWT_SECRET as string
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT_EXPIRATION, default to '1h'
    },
    test: {
        username: process.env.TEST_DB_USERNAME || 'root',
        password: process.env.TEST_DB_PASSWORD || 'test_password', // Replace with your secure test value
        database: process.env.TEST_DB_NAME || 'fivver_doup_test',
        host: process.env.TEST_DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
        JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // JWT_SECRET as string
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT_EXPIRATION, default to '1h'
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password', // Replace with your secure value
        database: process.env.DB_NAME || 'fivver_doup',
        host: process.env.DB_HOST || '127.0.0.1',
        port: parsedDBPort,
        dialect: 'mysql',
        JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // JWT_SECRET as string
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // JWT_EXPIRATION, default to '1h'
    },
};
exports.default = config;
