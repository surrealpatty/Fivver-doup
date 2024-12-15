"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST = 'localhost', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'fivver_doup', DB_PORT = '3306', NODE_ENV = 'development', JWT_SECRET = 'your-secret-key', // Replace with your actual secret key
JWT_EXPIRATION = '1h', // Replace with your desired expiration time
 } = process.env;
const parsedDBPort = parseInt(DB_PORT, 10);
if (isNaN(parsedDBPort)) {
    console.error('DB_PORT must be a valid number.');
    process.exit(1);
}
const config = {
    JWT_SECRET,
    JWT_EXPIRATION,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    port: parsedDBPort,
};
exports.default = config;
//# sourceMappingURL=config.js.map