"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret_key',
    DB_USER: process.env.DB_USER || 'default_user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'default_password',
    DB_NAME: process.env.DB_NAME || 'default_database',
};
