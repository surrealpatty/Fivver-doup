"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'fivver_doup', DB_PORT = '3306', NODE_ENV = 'development', JWT_SECRET = 'your-secret-key', JWT_EXPIRATION = '1h', } = process.env;
if (NODE_ENV !== 'test' &&
    (!DB_HOST || !DB_USER || !DB_NAME || !DB_PORT || !JWT_SECRET)) {
    console.error('Missing required environment variables. Check your .env file.');
    process.exit(1);
}
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
const config = {
    db: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: parsedDBPort,
    },
    nodeEnv: NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRATION,
};
exports.default = config;
